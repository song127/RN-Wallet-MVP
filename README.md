# EVM Wallet React Native App (Expo)

이 프로젝트는 EVM 기반 체인(이더리움 등) 지갑으로 사용하기 위한 React Native(Expo) 앱의 초기 세팅입니다.

## 주요 스택
- **React Native (Expo)\***
- **ethers v5** (EVM 체인 연동)
- **NativeWind (Tailwind for RN)**
- **@react-navigation/native** (Stack navigation)
- **@react-native-async-storage/async-storage** (로컬 스토리지)
- **@expo/vector-icons** (아이콘)
- 기타 Expo/React Native 필수 라이브러리

## 설치 및 실행

```bash
npm install
npm start # 또는 npx expo start
```

## 구조
- `app/` : (비워둠, 추후 아키텍처 설계에 따라 구성)
- `components/` : (비워둠)

## 스타일 가이드
- Tailwind(NativeWind) 기반 유틸리티 클래스 사용
- 다크모드 지원

## 참고
- Ethers v5는 5.7.x로 고정
- Expo 기반 최신 안정화 라이브러리 사용

---
> ⚡️ 아키텍처/폴더 구조는 논의 후 확정 예정. 초기 세팅만 포함.
