# 계산화학 도구 입문 가이드 제작 활동일지

## 1. 문제 발견과 출발점

계산화학·분자모델링 탐구에서 Avogadro, ORCA, AutoDock Vina, AutoDockTools, PyMOL을 사용하면서 각 프로그램의 역할과 연결 관계를 한눈에 파악하기 어려웠다. 특히 메뉴 위치와 파일 형식이 프로그램마다 달랐고, 오류가 생겼을 때 생성형 AI의 설명을 참고하더라도 그것이 현재 버전과 실제 환경에 맞는지 다시 판단해야 했다. 이 경험에서 “처음 사용하는 사람은 프로그램 자체보다도 전체 workflow와 성공 여부를 판단하는 기준에서 더 크게 막힌다”는 문제를 발견했다.

## 2. 초기 아이디어와 범위 수정

처음에는 계산화학 프로그램 사용법을 한곳에 모은 사이트를 생각했다. 그러나 단순한 메뉴얼 모음은 기존 문서와 차별성이 약하고, 실제 사용자가 ‘무엇을 해야 하는지’를 판단하는 데 충분하지 않다고 보았다. 그래서 사이트의 핵심을 ‘툴 백과사전’이 아니라 **목적에 맞는 도구 선택 → 기본 사용 → 결과 확인 → 문제 해결**로 바꾸었다.

처음에는 AutoDock4 등 더 많은 프로그램을 다루는 방안도 고려했으나, 직접 설치하고 화면과 동작을 확인할 수 없는 프로그램까지 포함하면 정확도가 떨어질 수 있다고 판단했다. 최종 범위는 직접 검증 가능한 Avogadro 1.2.0, ORCA 6.1.1, AutoDock Vina 1.2.7, MGLTools/AutoDockTools 1.5.7, PyMOL 3.1.8로 제한했다.

## 3. 정보 수집 방식을 Batch로 구조화

조사와 HTML 제작을 동시에 하면 기능 누락과 이미지 혼선이 생길 가능성이 높았다. 이를 해결하기 위해 프로그램과 기능을 `AVG-Bxx`, `ORC-Bxx`, `VNA-Bxx`, `PYM-Bxx` 형태의 Batch로 나누고, 각 Batch마다 다음을 기록했다.

- 다룰 기능과 범위
- 실제 메뉴 또는 명령어
- 직접 실행 결과
- 과학적 주의사항
- 필요한 스크린샷 ID와 파일명
- 사이트 본문에 사용할지, 내부 검증 자료로만 남길지

이 방식 덕분에 스크린샷을 나중에 GitHub에 올려도 파일명을 기준으로 정확한 위치에 연결할 수 있게 되었다.

## 4. Avogadro 검증

Avogadro에서는 Draw Tool, hydrogen 추가·제거, bond order 변경, force-field 기반 geometry optimization, 거리·각도·이면각 측정, 파일 저장, ORCA input generator를 실제로 확인했다. 특히 공식 문서의 ‘Measure Tool’ 표현과 실제 Avogadro 1.2.0 UI의 `Click to Measure`가 다르다는 점을 발견해, 문서 표현을 그대로 옮기기보다 현재 화면을 기준으로 가이드 문구를 수정했다.

또한 Avogadro의 optimization이 ORCA의 양자화학 geometry optimization과 동일하지 않다는 점을 명확히 구분해, 초보자가 두 계산을 혼동하지 않도록 했다.

## 5. ORCA 검증과 실제 오류 해결

물 분자를 이용해 SP, Opt, Freq를 직접 실행하고 `.out`, `.gbw`, `.xyz`, `_trj.xyz`, `.hess` 파일을 확인했다. `ORCA TERMINATED NORMALLY`와 `THE OPTIMIZATION HAS CONVERGED`가 서로 다른 성공 기준이라는 점도 실제 output에서 확인했다.

Frequency 계산에서는 외부 `xyzfile`이 실제로 존재함에도 `CANNOT OPEN FILE` 오류가 발생했다. 먼저 `dir` 명령으로 파일 존재 여부를 확인해 경로 문제를 배제했고, Windows에서 input 파일의 마지막 줄 처리 때문에 생긴 문제 가능성을 확인한 뒤 trailing blank line을 추가해 정상 실행시켰다. 이 경험을 통해 오류 메시지를 그대로 받아들이기보다 **파일 존재 → 파일명 → 입력 문법 → 환경 특성** 순서로 원인을 분리하는 Troubleshooting 구조를 만들었다.

## 6. AutoDockTools / Vina workflow 검증

단백질 구조만으로는 ligand-specific 기능을 검증하기 어려워 Avogadro에서 간단한 small molecule을 직접 제작하고 MOL2로 저장한 뒤 ADT에서 불러왔다. Gasteiger charge, non-polar hydrogen 처리, ligand 지정, torsion tree, rotatable bond, PDBQT 저장까지 실제로 확인했다.

Receptor preparation에서는 원본 결정구조를 그대로 처리했을 때 다수의 non-integral residue charge 문제가 발생했다. 단순히 값을 강제로 보정하지 않고 입력 구조의 alternate conformer, water, ion 등을 검토해 구조를 정리한 뒤 다시 preparation했다. 문제 residue 수가 줄어드는 것을 확인하고 최종적으로 charge 검증을 통과했다. 이를 통해 **자동 preprocessing의 결과도 입력 구조의 품질에 따라 달라지므로 원본 구조를 먼저 비판적으로 확인해야 한다**는 원칙을 사이트에 반영했다.

Vina 실행 과정에서는 ligand PDBQT를 읽지 못하는 오류가 발생했다. 조사 결과 실제 PDBQT가 아니라 Windows Recent 폴더의 `.lnk` 바로가기를 보고 있던 것이 원인이었다. 실제 파일을 작업 폴더에 저장한 뒤 docking이 정상 완료되었고 mode, affinity, RMSD 표와 output PDBQT 생성까지 확인했다.

## 7. PyMOL 검증과 workflow 수정

Vina multi-model PDBQT를 PyMOL에서 불러왔을 때 여러 state로 자동 분리될 것으로 예상했지만 `count_states` 결과가 1로 나왔다. 이 가정을 고집하지 않고 `vina_split`으로 pose별 PDBQT를 만든 뒤 각각 독립 object로 불러오는 방식으로 workflow를 수정했다.

또한 graphical `distance` object를 만드는 과정에서 현재 환경에서는 프로그램이 반복 종료되는 문제가 있었지만, `get_distance`는 정상적으로 거리 숫자를 반환했다. 이에 따라 실제 가이드에서는 안정적으로 검증된 `get_distance`를 기본 방법으로 제시하고 graphical distance는 참고 명령으로만 남겼다.

## 8. 사이트 구조의 재설계

기능을 많이 넣는 것보다 초보자가 필요한 정보를 빨리 찾는 것이 중요하다고 판단해 Home은 ‘무엇을 하고 싶은가?’ 중심으로 구성했다. 상세 페이지는 **Overview → Before You Start → Basic Usage → Main Features → Quick Start → Common Problems → Quick Reference** 흐름으로 통일했다.

스크린샷도 모든 클릭을 보여주는 방식에서 벗어나 메뉴 위치, 중요한 설정창, 실제 입력값, 정상 결과처럼 사용자가 길을 잃을 수 있는 지점만 남겼다. 확보한 이미지는 본문 핵심, 보조, 내부 검증 자료로 분류해 공개 사이트에는 필요한 사진만 사용했다.

## 9. 웹 구현

화려한 포트폴리오형 디자인보다 연구실 documentation에 가까운 형태를 선택했다. 정적 HTML/CSS/JavaScript로 구현해 GitHub Pages에서 별도 빌드 과정 없이 배포할 수 있게 했고, sidebar 목차, scroll spy, 코드 복사 버튼, Quick Reference 검색, Troubleshooting 필터, 모바일 반응형 구조를 추가했다.

## 10. AI 활용과 직접 검증의 구분

생성형 AI는 공식 자료 탐색 보조, 오류 원인 후보 제시, 정보 구조 초안과 HTML/CSS/JavaScript 구현 보조에 활용했다. 그러나 실제 프로그램 실행, 버전 확인, 화면 캡처, 파일 생성 여부 확인, 오류 재현과 해결 여부 검증은 직접 수행했다. 또한 어떤 기능을 포함하고 제외할지, 특정 연구 예제를 사이트의 중심에 둘지 여부, 초보자 중심의 정보 구조와 스크린샷 기준 등 핵심 설계 판단은 실제 사용 경험을 바탕으로 반복적으로 수정했다.

## 11. 최종 결과와 의미

최종 사이트는 특정 과제연구를 설명하는 페이지가 아니라, 같은 도구를 처음 사용하는 사람이 역할을 이해하고 기본 기능을 성공시키며 문제 발생 시 스스로 점검할 수 있도록 만든 범용 입문 가이드로 완성했다. 이 과정에서 단순한 프로그램 사용법 습득을 넘어 **입력 구조 검증, 버전 차이 인식, 오류 원인 분리, 정보 우선순위 설정, 사용자 중심 문서 설계**의 중요성을 체감했다.
