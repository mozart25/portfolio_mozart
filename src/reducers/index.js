import { combineReducers } from "redux";
import tutorials from "./tutorials";
import auth from "./auth";
import message from "./message";

export default combineReducers({
    tutorials,
    auth,
    message
});
