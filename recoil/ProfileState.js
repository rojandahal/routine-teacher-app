import { atom } from "recoil";

const profileState = atom({
  key: "profileState",
  default: [],
});

const loginAtom = atom({
  key: "loginAtom",
  default: {
    userLoggedIn: false,
  },
});

export { profileState, loginAtom };
