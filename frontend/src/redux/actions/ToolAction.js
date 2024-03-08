const {ActionType} = require("../Constants/ActionType")

export const getPosts = (posts)=>{
    return (
        {
            type:ActionType.Get_Posts,
            payload:posts
        }
    )
}
