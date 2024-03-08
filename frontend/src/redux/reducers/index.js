import { combineReducers } from "redux";
import { postReducer} from "./ToolReducer";

 export const reducers = combineReducers({
    getPost:postReducer,
 })

