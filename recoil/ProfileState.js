import { atom } from "recoil";

const profileState = atom({
  key: "profileState",
  default: {
    userLoggedIn: true,
    profile: {
      name: "Anshu Ghimire",
      email: "",
      abbreviation: "AKJ",
    },
  },
});

export default profileState;
