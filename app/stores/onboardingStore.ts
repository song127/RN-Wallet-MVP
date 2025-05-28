import { create } from "zustand";

export type OnboardingType = "create" | "import";

interface OnboardingState {
  onboardingType: OnboardingType | null;
  mnemonic: string | null;
  setOnboardingType: (type: OnboardingType) => void;
  setMnemonic: (mnemonic: string) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  onboardingType: null,
  mnemonic: null,
  setOnboardingType: (type) => set({ onboardingType: type }),
  setMnemonic: (mnemonic) => set({ mnemonic }),
  reset: () => set({ onboardingType: null, mnemonic: null }),
}));
