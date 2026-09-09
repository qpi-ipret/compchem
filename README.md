# 계산화학 도구 입문 가이드

Avogadro, ORCA, AutoDock Vina/AutoDockTools, PyMOL을 처음 사용하는 사람을 위한 정적 documentation 사이트입니다.

## 페이지

- `index.html` — Home
- `start-here.html` — 처음 시작하기
- `tools/avogadro.html`
- `tools/orca.html`
- `tools/vina.html`
- `tools/pymol.html`
- `reference/quick-reference.html`
- `troubleshooting/index.html`
- `about/index.html`

## 로컬에서 보기

`index.html`을 브라우저로 열어도 대부분 동작합니다. 가장 안정적인 방법은 저장소 루트에서 간단한 로컬 서버를 여는 것입니다.

```bash
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`으로 접속합니다.

## GitHub Pages

1. 이 폴더 전체를 GitHub repository에 업로드합니다.
2. Repository Settings → Pages에서 `main` branch와 `/ (root)`를 선택합니다.
3. Pages URL이 생성되면 사이트를 확인합니다.

## Tested environment

- Avogadro 1.2.0
- ORCA 6.1.1
- AutoDock Vina 1.2.7
- MGLTools / AutoDockTools 1.5.7
- PyMOL 3.1.8 Incentive Product
