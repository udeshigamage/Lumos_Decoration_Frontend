import { error } from "console";

const initialstate = {
  isauthenticated: false,
  user: null,
  error: "",
};
const Authreducer = (state = initialstate, Action: any) => {
  switch (Action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: Action.payload,
        isauthenticated: true,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        user: null,
        isauthenticated: false,
      };
    default:
      return state;
  }
};

export default Authreducer;
