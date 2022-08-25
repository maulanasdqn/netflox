import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isUserAuthenticated = atom({
  key: "AuthUser",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
