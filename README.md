# EVM Wallet React Native App (Expo)

> **EVM(이더리움 등) 기반 체인 지갑**을 위한 React Native(Expo) 앱 템플릿입니다.\
> 확장성과 유지보수성을 고려한 구조와 플러그인/포트-어댑터 패턴을 적용했습니다.

---

## 🛠️ 주요 스택

- **React Native (Expo)** + **TypeScript**
- **ethers v5.7.x** (EVM 체인 연동)
- **NativeWind** (Tailwind 스타일링)
- **@react-navigation/native** (Stack Navigation)
- **@react-native-async-storage/async-storage** (로컬 스토리지)
- **@expo/vector-icons** (아이콘)
- **zustand** (상태 관리)
- 기타 Expo/React Native 필수 라이브러리

---

## ✨ 주요 기능

- **Mnemonic 생성 및 PIN 설정을 통한 계정 생성**
- **로그인 유지 및 보안 관리**
- **다중 네트워크 선택 기능** (Ethereum, Bifrost 등)
- **실시간 토큰 잔액 조회**
- **토큰 전송(Send) 기능**
- **Uniswap과 Webview 통신을 활용한 토큰 스왑 기능** (오토 사인 연동)
- **안전한 로그아웃 처리**

> **NFT 관련:**
> - NFT 기능은 초기 구현을 시도했으나, 현재는 Token만 지원합니다.
> - Token만 있을 경우 UI가 너무 빈 느낌이라, NFT 관련 UI만 포함되어 있으며 실제 NFT 기능(조회/전송 등)은 미구현 상태입니다.

---

## 📁 폴더 구조 및 아키텍처

```
app/
 ┣ components/   # 공통 및 도메인별 UI 컴포넌트
 ┃ ┣ common/     # 범용 UI(로딩, 스피너 등)
 ┃ ┗ wallet/     # 지갑 관련 UI(토큰, NFT 등)
 ┣ config/       # 네트워크, 토큰, 기능 플래그 등 앱 설정
 ┃ ┗ featureFlags/ # 기능 플래그(실험적 기능 on/off)
 ┣ domain/       # 비즈니스 도메인(순수 로직)
 ┃ ┣ events/     # 도메인 이벤트
 ┃ ┣ models/     # 도메인 모델(NFT, 토큰 등)
 ┃ ┣ ports/      # 추상 인터페이스(포트)
 ┃ ┗ services/   # 도메인 서비스(비즈니스 로직)
 ┣ hooks/        # 커스텀 React 훅(잔고, 가격, NFT 등)
 ┣ infra/        # 외부 시스템 연동(어댑터)
 ┃ ┗ adapters/   # 도메인 포트 구현체
 ┣ navigation/   # 네비게이션(라우팅) 관련 코드
 ┣ plugins/      # 플러그인 시스템 및 예시 플러그인
 ┣ screens/      # 주요 기능별 화면(페이지)
 ┣ stores/       # 상태 관리(zustand)
 ┗ utils/        # 유틸리티 함수
```

- **Hexagonal(포트-어댑터) + 플러그인 확장** 패턴 기반
- 도메인, 인프라, UI, 확장 기능이 명확히 분리되어 유지보수/확장 용이

---

## 🚀 설치 및 실행

```bash
npm install
npm start   # 또는 npx expo start
```

---

## 🎨 스타일 가이드

- **Tailwind(NativeWind)** 기반 유틸리티 클래스 사용
- **다크모드 지원**
- 스타일/테마 확장 가능

---

## 🧩 확장성 & 플러그인/포트-어댑터 구조

- **도메인 ↔ 인프라/플러그인** 완전 분리 (비즈니스 로직은 외부 의존성 직접 참조 X)
- **플러그인 레지스트리**로 기능 동적 확장/교체 가능
- **포트(인터페이스)** 기반으로 어댑터/플러그인 핫스왑 지원
- **기능 플래그**(`config/featureFlags/`)로 실험적 기능 안전하게 관리 (owner, expiryDate, fallback 필수)

---

## 🗃️ 상태 관리

- **zustand** 기반 단일 소스, 예측 가능한 뮤테이션
- 비동기 상태는 `idle | loading | success | error` 등 명시적 관리

---

## 🧪 테스트/기여 가이드

- 도메인/플러그인/핵심 로직은 **90%+ 커버리지** 권장
- 기능 플래그는 owner/만료일/폴백 필수, 2 릴리즈 내 제거
- 폴더/파일 구조는 도메인/기능별로 확장, 중복 최소화
- 기여 전 아키텍처/폴더 구조 논의 권장

---

## 📌 참고

- Ethers v5는 5.7.x로 고정
- Expo 기반 최신 안정화 라이브러리 사용
- 실제 비즈니스 로직/화면은 예시 및 스켈레톤 위주, 확장 필요
