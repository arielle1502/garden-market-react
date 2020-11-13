import { SET_POSTS, LOADING_DATA, DELETE_POST } from '../types';

const initialState ={
  posts: [],
  post: {},
  isLoading: false
}

export default function(state = initialState, action){
  switch(action.type){
    case LOADING_DATA:
      return {
        ...state,
        isLoading: true
      }
    case SET_POSTS:
      return{
        ...state,
        posts: action.payload,
        isLoading:false
        
      }
      case DELETE_POST:
        const index = state.posts.findIndex(post => post.postId === action.payload)
        state.posts.splice(index, 1);
        return{
          ...state
        }
      default:
         return state;
  }
}