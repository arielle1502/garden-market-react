
import { SET_POSTS, LOADING_DATA, DELETE_POST, SET_ERRORS, POST_POST, LOADING_UI, CLEAR_ERRORS, SET_POST, STOP_LOADING_UI, UPDATE_POST } from '../types';
import axios from 'axios'

//get all posts
export const getPosts = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios.get('/posts')
  .then(res => {
    dispatch({
      type: SET_POSTS,
      payload: res.data
    })
    
  })
.catch(err => {
  dispatch({
    type: SET_POSTS,
    payload:[]
  })
})
}

//get one post
export const getPost = (postId) => dispatch => {
  dispatch({type: LOADING_UI});
  axios.get(`/post/${postId}`)
  .then( res=> {
    dispatch({
      type: SET_POST,
      payload:res.data
    });
    dispatch({ type: STOP_LOADING_UI})
  })
  .catch(err => console.log(err))
}

//post a post
export const postPost = (newPost, history) => (dispatch) => {
  dispatch({ type: LOADING_UI});
  axios.post('/post', newPost)
  .then(res => {
    dispatch({
      type: POST_POST,
      payload: res.data
    });
    dispatch({ type: CLEAR_ERRORS})
    history.push('/')
  })
  .catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  })
}

//delete a post
export const deletePost = (postId, history) => (dispatch) =>{
  axios.delete(`/post/${postId}`)
  .then(() => {
  dispatch({ type: DELETE_POST, payload: postId})
  
})
.catch(err => console.log(err));
}

//edit post
export const editPostDetails = (postId,postDetails) =>  (dispatch) =>{
   axios.put(`/post/${postId}`, postDetails)
   .then(console.log(postDetails))
   .then((res) =>{
    dispatch({
      type: UPDATE_POST, payload: res.data
    })
    console.log(res.data)
    
    // dispatch(getPost(postDetails.postId));
   })
   
 .catch(err => console.log(err))
}

// dispatch({ type: LOADING_DATA});
//   console.log(post.postId)
//   console.log(post)
//   axios.put(`/post/${post.postId}`, post)
//   .then((res) => {
    
//     dispatch(getPost())
//   }).catch(err => console.log(err))