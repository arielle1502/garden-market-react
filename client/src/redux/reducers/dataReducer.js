import { SET_POSTS, LOADING_DATA, DELETE_POST, POST_POST, SET_POST, UPDATE_POST } from '../types';

const initialState ={
  posts: [],
  post: {},
  isLoading: false
}

export default function dataReducer(state = initialState, action){
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
      case SET_POST:
        return{
          ...state,
          post:action.payload
        }
      case DELETE_POST:
        let index = state.posts.findIndex(post => post.postId === action.payload)
        state.posts.splice(index, 1);
        return{
          ...state
        }
        case UPDATE_POST:
          return{
          ...state,
          posts: state.posts.map(post =>
            post.postId === action.payload.postId
            ? ( post = action.payload)
            : post
            // were mapping through all of our contacts adn looking for an id that matches our payload id (the one we changed). if it matches then we save the updated contact as that contact, if doesnt match, then just leave the contact the way it is.
            
            )
            
        }
       
      case POST_POST:
        return{
          ...state,
          posts: [
            action.payload,
            ...state.posts
          ]
        }

      default:
         return state;
  }
}