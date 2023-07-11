import { atom } from "recoil";

const profileState = atom({
  key: "profileState",
  default: {
    userLoggedIn: false,
		profile: {
			name: "",
			email: "",
			abbreviation: "",
		}
  },
});

export default profileState;