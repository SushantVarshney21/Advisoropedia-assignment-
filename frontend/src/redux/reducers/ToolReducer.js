import {ActionType} from "../Constants/ActionType"

const initialState = {
    posts : []
}

export const postReducer = (state = initialState ,{type,payload})=>{
 switch (type) {
    case ActionType.Get_Posts:
        return {...state, posts:payload}
 
    default:
        return state;
 }
}

