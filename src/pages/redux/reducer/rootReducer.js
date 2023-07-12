import menuReducer from "./meduReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    menu: menuReducer
})

export default rootReducer