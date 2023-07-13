import { atom } from "recoil";

const profileState = atom({
  key: "profileState",
  default: {
    userLoggedIn: false,
  },
});

export default profileState;
