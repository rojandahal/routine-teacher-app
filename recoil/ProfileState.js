import { atom } from "recoil";

const profileState = atom({
  key: "profileState",
  default: {
    userLoggedIn: true,
		profile: {
			name: "",
			email: "",
			abbreviation: "",
		}
  },
});

export default profileState;