import { atom } from "recoil";

const routineState = atom({
  key: "routine",
  default: [],
});

export default routineState;
