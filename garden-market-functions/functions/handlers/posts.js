const {db} = require('../util/admin')

exports.getAllPosts = (req, res) => {

  db.collection('posts').orderBy('createdAt','desc').get()
  .then(data => {
    let posts = [];
    data.forEach(doc => {
      posts.push({
        postId: doc.id,
        ...doc.data()
      })
    });
    return res.json(posts);
  })
  .catch(err => console.error(err))
}

exports.postOnePost = (req, res)=> {

  const newPost = {
  // body: req.body.body,
  author: req.user.username,
  category: req.body.category,
  description: req.body.description,
  image: req.body.image,
  isOrganic: req.body.isOrganic,
  price: req.body.price,
  ready: req.body.ready,
  title:req.body.title,
  userId:req.user.uid,
  userImage:req.user.imageUrl,
  userCity:req.user.city,
  userEmail:req.user.email,
  unit:req.body.unit,
  createdAt: new Date().toISOString(),
  commentCount: 0

  };
  db
  .collection('posts')
  .add(newPost)
  .then(doc => {
    const resPost = newPost;
    resPost.postId = doc.id;
    res.json(resPost)
  })
  .catch(err => {
    res.status(500).json({ error: 'something went wrong'});
    console.error(err);
  })
}

exports.getPost = (req, res) => {
  let postData = {};
  db.doc(`/posts/${req.params.postId}`).get()
  .then((doc) => {
    if(!doc.exists){
      return res.status(404).json({ error: 'post not found'})
    }
    postData = doc.data();
    postData.postId = doc.id;
    return db
    .collection('comments')
    .orderBy('createdAt', 'desc')
    .where('postId', '==', req.params.postId)
    .get();
  })
  .then((data) => {
    postData.comments =[];
    data.forEach((doc) => {
      postData.comments.push(doc.data())
    });
    return res.json(postData);
  })
  .catch(err => {
    res.status(500).json({ error: err.code});
    console.error(err);
  })
}

//comment on post
exports.commentOnPost = (req, res) => {
  if(req.body.body.trim() === '') return res.status(400).json({ comment: 'must not be empty'});
  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    postId: req.params.postId,
    username: req.user.username,
    userImage: req.user.imageUrl
  };
  db.doc(`/posts/${req.params.postId}`).get()
  .then(doc => {
    if(!doc.exists){
      return res.status(404).json({ error: 'post not found'});
    }
    return doc.ref.update({commentCount: doc.data().commentCount + 1});
  })
  .then(() => {
    return db.collection('comments').add(newComment)
  })
  .then(() => {
    res.json(newComment);
  })
  .catch( err=>{
    console.log(err);
    res.status(500).json({error: 'something went wrong'});
  })
}

//delete post
exports.deletePost = (req, res) => {
  const document = db.collection('posts').doc(req.params.postId);
  document.get()
  .then(doc => {
    if(!doc.exists){
      return res.status(404).json({error: 'post not found'});
    }
    if(doc.data().author !== req.user.username){
      return res.status(403).json({error: 'Unauthorized'})
    } else {
      return document.delete();
    }
  })
  .then(() => {
    res.json({ message: 'post deleted successfully'})
  })
  .catch(err => {
    console.error(err);
    return status(500).json({ error: err.code})
  })
}

//update post
exports.updatePost = (req, res) => {
  const document = db.collection('posts').doc(req.params.postId);
  document.get()
  .then(doc => {
    if(!doc.exists){
      return res.status(404).json({error: 'post not found'});
    }
    if(doc.data().author !== req.user.username){
      return res.status(403).json({error: 'Unauthorized'})
    } else {
      return document.update({
        category: req.body.category,
        description: req.body.description,
        image: req.body.image,
        isOrganic: req.body.isOrganic,
        price: req.body.price,
        ready: req.body.ready,
        title:req.body.title,
        unit: req.body.unit
      });
    }
  })
  .then(() => {
    res.json({ message: 'post updated successfully'})
  })
  .catch(err => {
    console.error(err);
    return status(500).json({ error: err.code})
  })
}