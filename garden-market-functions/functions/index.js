const functions = require('firebase-functions');

const express = require('express');
const app = express();
const FBAuth = require('./util/FBAuth');
const cors = require('cors');
app.use(cors({origin:true}));


const{db} = require('./util/admin')

const { 
  getAllPosts,
  postOnePost,
  getPost,
  commentOnPost,
  deletePost, 
  updatePost
} = require('./handlers/posts');
const { 
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead
 } = require('./handlers/users');


//posts routes
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, postOnePost);
app.get('/post/:postId', getPost);
app.post('/post/:postId/comment', FBAuth, commentOnPost)
app.delete('/post/:postId', FBAuth, deletePost)
app.put('/post/:postId', FBAuth, updatePost)

//users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/users', FBAuth, getAuthenticatedUser);
app.get('/user/:username', getUserDetails);
app.post('/notifications', FBAuth, markNotificationsRead);

exports.api = functions.region('australia-southeast1').https.onRequest(app);

exports.createNotificationOnComment = functions
.region('australia-southeast1')
.firestore.document('comments/{id}')
.onCreate((snapshot)=> {

 return db.doc(`/posts/${snapshot.data().postId}`).get()
 .then((doc) => {
    if(doc.exists && doc.data().author !== snapshot.data().username) {
      return db.doc(`/notifications/${snapshot.id}`).set({
        createdAt: new Date().toISOString(),
        recipient: doc.data().author,
        sender: snapshot.data().username,
        type: 'comment',
        read: false,
        postId: doc.id
      });
    }
  })
  .catch((err) => {
    console.error(err)
  });
})

exports.onUserImageChange = functions.region('australia-southeast1')
.firestore.document('/users/{userId}').onUpdate((change) => {
  console.log(change.before.data());
  console.log(change.after.data());
 if(change.before.data().imageUrl !== change.after.data().imageUrl){
   console.log('image has changed');
  let batch = db.batch();
  return db.collection('posts').where('author', '==', change.before.data().username).get()
  .then((data) => {
    data.forEach(doc => {
      const post = db.doc(`/posts/${doc.id}`);
      batch.update(post, {userImage: change.after.data().imageUrl})
    })
    return batch.commit();
  })
 } else return true;
});

exports.onPostDelete = functions.region('australia-southeast1')
.firestore.document('/posts/{postId}')
.onDelete((snapshot, context) =>{
  const postId = context.params.postId;
  const batch = db.batch();
  return db.collection('comments').where('postId', '==', postId).get()
  .then(data => {
    data.forEach(doc =>{
      batch.delete(db.doc(`/comments/${doc.id}`));
    })
    return db.collection('notifications').where('postId', '==', postId).get()
  })
  .then(data => {
    data.forEach(doc =>{
      batch.delete(db.doc(`/notifications/${doc.id}`));
    })
    return batch.commit();
  })
  .catch(err => 
    console.error(err))
})