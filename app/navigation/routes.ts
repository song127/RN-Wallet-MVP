// 네비게이션 목적지(스크린 이름) 상수화 및 타입 정의
export const ROOT_STACK = {
  Splash: "Splash",
  Onboarding: "Onboarding",
  Home: "Home",
} as const;

export const HOME_STACK = {
  HomeTab: "HomeTab",
  Settings: "Settings",
  About: "About",
  Uniswap: "Uniswap",
  // Send
  SendAssetSelect: "SendAssetSelect",
  SendTokenList: "SendTokenList",
  SendTokenAddress: "SendTokenAddress",
  SendTokenAmount: "SendTokenAmount",
  SendTokenConfirm: "SendTokenConfirm",
  SendNFTList: "SendNFTList",
  SendNFTAddress: "SendNFTAddress",
  SendNFTAmount: "SendNFTAmount",
  SendNFTConfirm: "SendNFTConfirm",
} as const;

export const MAIN_TAB = {
  Wallet: "Wallet",
  History: "History",
  Menu: "Menu",
} as const;

export const ONBOARDING_STACK = {
  Splash: "Splash",
  Welcome: "Welcome",
  MnemonicCreate: "MnemonicCreate",
  MnemonicImport: "MnemonicImport",
  MnemonicBackup: "MnemonicBackup",
  MnemonicVerify: "MnemonicVerify",
  PinSetup: "PinSetup",
  Backup: "Backup",
} as const;

export type RootStackRoute = (typeof ROOT_STACK)[keyof typeof ROOT_STACK];
export type HomeStackRoute = (typeof HOME_STACK)[keyof typeof HOME_STACK];
export type MainTabRoute = (typeof MAIN_TAB)[keyof typeof MAIN_TAB];
export type OnboardingStackRoute =
  (typeof ONBOARDING_STACK)[keyof typeof ONBOARDING_STACK];
