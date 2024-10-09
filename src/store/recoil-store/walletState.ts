// recoil-store/walletState.ts
import { atom } from "recoil";

export const activeAccountState = atom<string | null>({
  key: "activeAccountState",
  default: null,
});

export const walletConnectedState = atom<boolean>({
  key: "walletConnectedState",
  default: false,
});

export const activeWalletState = atom<any>({
  key: "activeWalletState",
  default: null,
});

export const sessionDataState = atom<any>({
  key: "sessionDataState",
  default: null,
});
