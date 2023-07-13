import { selector } from "recoil";
import profileState from "../recoil/ProfileState";

const profileSelector = selector({
  key: "profileSelector",
  get: ({ get }) => {
    const profile = get(profileState);
    return profile;
  },
  set: ({ set }, newProfile) => {
    set(profileState, newProfile);
  },
});

export default profileSelector;
