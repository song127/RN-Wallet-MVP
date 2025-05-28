import { create } from "zustand";
import * as Keychain from "react-native-keychain";
import { KEYCHAIN_KEYS } from "@/app/config/keychain";

type WalletState = {
  address: string | null;
  mnemonic: string | null;
  setWallet: (address: string, mnemonic: string) => Promise<void>;
  clearWallet: () => void;
  loadWallet: () => Promise<void>;
};

export const useWalletStore = create<WalletState>((set) => ({
  address: null,
  mnemonic: null,
  setWallet: async (address, mnemonic) => {
    set({ address, mnemonic });
    try {
      const save = await Keychain.setGenericPassword(address, mnemonic, {
        service: KEYCHAIN_KEYS.WalletInfo,
      });
    } catch (e) {
      // console.error(e);
    }
  },
  clearWallet: () => {
    set({ address: null, mnemonic: null });
    Keychain.resetGenericPassword({ service: KEYCHAIN_KEYS.WalletInfo });
  },
  loadWallet: async () => {
    try {
      const creds = await Keychain.getGenericPassword({
        service: KEYCHAIN_KEYS.WalletInfo,
      });

      if (creds) {
        set({ address: creds.username, mnemonic: creds.password });
      }
    } catch (error) {
      // console.error("Failed to load wallet:", error);
    }
  },
}));
