
import posts from './posts'
import comments from './comments'


const initialState = {
  posts:[],
comments:[]
}




export default function combineReducers(state = initialState, action) {
  return {
    posts: posts(state.posts, action),
    comments:comments(state.comments, action),
  }
}
