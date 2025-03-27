import { applyMiddleware, createStore } from "redux";
import Authreducer from "./AuthReducer";
import thunk from "redux-thunk";

const Store_ = createStore(Authreducer);

export default Store_;
