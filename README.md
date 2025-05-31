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
 ┃ ┣ common/     # 범용 UI(스피너, 버튼 등)
 ┃ ┗ wallet/     # 지갑 관련 UI(토큰, NFT 등)
 ┣ config/       # 네트워크, 토큰, 키체인 플래그 등 앱 설정
 ┃ ┗ featureFlags/ # 기능 플래그(실험적 기능 on/off)
 ┣ domain/       # 비즈니스 도메인(순수 로직)
 ┃ ┣ models/     # 도메인 모델(NFT, 토큰 등)
 ┃ ┣ ports/      # 추상 인터페이스(포트)
 ┣ hooks/        # 커스텀 React 훅(잔고, 가격, NFT 등)
 ┣ infra/        # 외부 시스템 연동(어댑터)
 ┃ ┗ adapters/   # 도메인 포트 구현체
 ┣ navigation/   # 네비게이션(라우팅) 관련 코드
 ┣ screens/      # 주요 기능별 화면(페이지)
 ┣ stores/       # 상태 관리(zustand)
 ┗ utils/        # 유틸리티 함수
```

---

## 🚀 설치 및 실행

```bash
npm install
npm start   # 또는 npx expo start
```

---

## 🎨 스타일 가이드

- **Tailwind(NativeWind)** 기반 유틸리티 클래스 사용
- 스타일/테마 확장 가능

---

## 🗃️ 상태 관리

- **zustand** 기반 단일 소스, 예측 가능한 뮤테이션
- 비동기 상태는 `idle | loading | success | error` 등 명시적 관리