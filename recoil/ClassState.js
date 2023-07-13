import { atom } from "recoil";

const classState = atom({
  key: "classes",
  default: [],
});

export default classState;
