#!/usr/bin/env python3
# PlanDeck 로컬 편집 서버 — 정적 서빙 + AI 편집 브릿지(claude headless)
# 역할: 웹UI의 "AI에게 요청" → 로컬 claude가 CLAUDE.md 규칙대로 파일 수정 → git commit/push → Pages 반영
# 보안: 127.0.0.1 바인딩(로컬 전용). 외부 노출 금지.
import http.server, socketserver, json, os, subprocess, threading, uuid

REPO = os.path.dirname(os.path.abspath(__file__))
PORT = int(os.environ.get('PD_PORT', '8137'))
CLAUDE = os.environ.get('PD_CLAUDE', 'claude')

jobs = {}
jobs_lock = threading.Lock()


def _set(jid, **kw):
    with jobs_lock:
        jobs[jid].update(kw)


def _log(jid, msg):
    with jobs_lock:
        jobs[jid]['log'].append(msg)


def run_ai_job(jid, project, page, instruction, action):
    try:
        _set(jid, status='running')
        ctx = '현재 프로젝트: ' + (project or '(미지정)')
        if page:
            ctx += ' / 대상 화면 파일: ' + page
        prompt = (
            ctx + '\n요청 유형: ' + action + '\n사용자 요청: ' + instruction + '\n\n'
            'CLAUDE.md의 불변식을 지켜 작업하세요. 와이어프레임 컴포넌트(engine/plandeck-ui.css)만 사용하고, '
            '모든 인터랙션 href를 유지하고, config/screens.js와 화면 HTML 정합을 맞추세요. '
            '링크 무결성(깨진 링크 0, 막다른 화면 0)을 깨지 마세요. '
            'git 명령은 실행하지 마세요(저장·푸시는 시스템이 합니다). '
            '작업 후 무엇을 바꿨는지 2~3줄로 한국어로 요약하세요.'
        )
        _log(jid, 'AI 편집 시작 — claude headless 호출…')
        cmd = [CLAUDE, '-p', prompt, '--permission-mode', 'bypassPermissions',
               '--add-dir', REPO, '--output-format', 'json']
        p = subprocess.run(cmd, cwd=REPO, capture_output=True, text=True, timeout=900)
        if p.returncode != 0:
            raise RuntimeError('claude 실패: ' + ((p.stderr or p.stdout) or '')[-800:])
        summary = ''
        try:
            data = json.loads(p.stdout)
            summary = data.get('result') or data.get('text') or ''
        except Exception:
            summary = (p.stdout or '')[-800:]
        _log(jid, 'AI 요약: ' + (summary[:600] if summary else '(요약 없음)'))

        subprocess.run(['git', 'add', '-A'], cwd=REPO, check=True)
        changed = subprocess.run(['git', 'diff', '--cached', '--quiet'], cwd=REPO).returncode != 0
        if not changed:
            _log(jid, '변경 사항 없음 — 커밋 생략')
            _set(jid, status='done', commit=None)
            return
        msg = 'PlanDeck 웹UI 편집 — ' + (project or '') + '/' + (page or '') + ': ' + instruction[:60]
        subprocess.run(['git', 'commit', '-q', '-m', msg], cwd=REPO, check=True)
        try:
            subprocess.run(['git', 'push', '-q', 'origin', 'main'], cwd=REPO, check=True, timeout=120)
            pushed = True
        except Exception as pe:
            pushed = False
            _log(jid, '⚠ 푸시 실패(로컬 커밋은 됨): ' + str(pe))
        commit = subprocess.run(['git', 'log', '--oneline', '-1'], cwd=REPO,
                                capture_output=True, text=True).stdout.strip()
        _log(jid, ('저장·푸시 완료: ' if pushed else '로컬 저장 완료(푸시 미완): ') + commit)
        _set(jid, status='done', commit=commit, pushed=pushed)
    except Exception as e:
        _log(jid, '오류: ' + str(e))
        _set(jid, status='error', error=str(e))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=REPO, **k)

    def _json(self, obj, code=200):
        body = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == '/api/health':
            return self._json({'ok': True, 'service': 'plandeck-ai', 'repo': REPO})
        if self.path.startswith('/api/job/'):
            jid = self.path.split('/api/job/')[1].split('?')[0]
            with jobs_lock:
                j = dict(jobs.get(jid)) if jid in jobs else None
            return self._json(j) if j else self._json({'error': 'not found'}, 404)
        return super().do_GET()

    def do_POST(self):
        if self.path == '/api/ai-edit':
            ln = int(self.headers.get('Content-Length', '0'))
            try:
                req = json.loads(self.rfile.read(ln) or b'{}')
            except Exception:
                return self._json({'error': 'bad json'}, 400)
            instruction = (req.get('instruction') or '').strip()
            if not instruction:
                return self._json({'error': 'instruction 필요'}, 400)
            jid = uuid.uuid4().hex[:12]
            with jobs_lock:
                jobs[jid] = {'status': 'queued', 'log': [], 'commit': None, 'error': None}
            threading.Thread(target=run_ai_job,
                             args=(jid, req.get('project'), req.get('page'), instruction, req.get('action', 'edit')),
                             daemon=True).start()
            return self._json({'ok': True, 'jobId': jid})
        return self._json({'error': 'not found'}, 404)

    def log_message(self, *a):
        pass


class ThreadingServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == '__main__':
    os.chdir(REPO)
    httpd = ThreadingServer(('127.0.0.1', PORT), Handler)
    print('PlanDeck AI 서버 — http://localhost:%d/index.html  (repo: %s)' % (PORT, REPO))
    print('AI 편집: POST /api/ai-edit  ·  상태: GET /api/job/<id>  ·  종료: Ctrl+C')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\n서버 종료')
