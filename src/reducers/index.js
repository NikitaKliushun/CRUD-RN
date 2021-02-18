import {combineReducers} from "redux";
import users from "./users";
import tutorials from "./tutorials";

const reducers = combineReducers({
    users, tutorials,
});

export default reducers;
