const {admin, db} = require('../util/admin');

const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(config)

const { validateSignupData, validateLoginData, reduceUserDetails } = require('../util/validators');
const { DH_CHECK_P_NOT_PRIME } = require('constants');


exports.signup = (req,res) => {
  const newUser ={
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    city: req.body.city
  };

  const { valid, errors } = validateSignupData(newUser);
  if(!valid) return res.status(400).json(errors)

  const noImg = 'blank-profile-picture-973460_1280.png'

  let token, userId;
  db.doc(`/users/${newUser.username}`).get()
  .then(doc => {
    if(doc.exists){
      return res.status(400).json({ username: 'this username is already taken'});
    } else{
     return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    }
  })
  .then(data => {
    userId = data.user.uid;
    return data.user.getIdToken();

  })
  .then(idToken => {
    token = idToken;
    const userCredentials = {
      username: newUser.username,
      email: newUser.email,
      createdAt: new Date().toISOString(),
      imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
      userId: userId,
      city: newUser.city
    };
    db.doc(`/users/${newUser.username}`).set(userCredentials);
  })
  .then(() => {
    return res.status(201).json({ token });
  })
  .catch(err => {
    console.error(err);
    if(err.code === "auth/email-already-in-use"){
      return res.status(400).json({ email: 'Email is already in use'});
    }else{
    return res.status(500).json({ general: "something went wrong, please try again"});
    }
  })
}

//login users
exports.login =  (req, res) => {
  const user = {
    email : req.body.email,
    password : req.body.password
  };

  const { valid, errors } = validateLoginData(user);
  if(!valid) return res.status(400).json(errors)

  

  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then(data => {
    return data.user.getIdToken();
  })
  .then(token => {
    return res.json({token});
  })
  .catch(err => {
    console.error(err);
    
      return res.status(403).json({general: 'Wrong credentials, please try again'});
    
  })
}

//add user details
exports.addUserDetails = (req,res) => {
  let userDetails = reduceUserDetails(req.body);

  db.doc(`/users/${req.user.username}`).update(userDetails)
  .then(()=>{
    return res.json({ message: 'Details added successfully'})
  })
  .catch (err => {
    console.error(err);
    return res.status(500).json({error: err.code});
  })
}

//public: get user details
exports.getUserDetails = (req, res) => {
  let userData= {};
  db.doc(`users/${req.params.username}`).get()
  .then(doc => {
    if(doc.exists){
      userData.user = doc.data();
      return db.collection('posts').where('author', '==', req.params.username)
      .orderBy('createdAt', 'desc')
      .get();
    } else {
      return res.status(404).json({ error: 'user not found'})
    }
  })
  .then(data => {
    userData.posts = [];
    data.forEach(doc => {
      userData.posts.push({
        description: doc.data().description,
        image: doc.data().image,
        isOrganic:doc.data().isOrganic,
        author:doc.data().author,
        category:doc.data().category,
        commentCount:doc.data().commentCount,
        createdAt:doc.data().createdAt,
        price:doc.data().price,
        ready:doc.data().ready,
        title:doc.data().title,
        unit:doc.data().unit,
        userCity:doc.data().userCity,
        userEmail:doc.data().userEmail,
        userImage:doc.data().userImage,
        postId: doc.id
      })
    });
    return res.json(userData);
  })
  .catch(err => {
    console.error(err);
    return res.status(500).json({error: err.code})
  })
}

//get own user details
exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.user.username}`).get()
  .then(doc => {
    if(doc.exists){
      userData.credentials = doc.data();
      return db.collection('posts').where('author', '==', req.user.username).get();
    
    }
    return res.json(userData);
  })
  .then(data =>{
    userData.posts =[];
    data.forEach(doc => {
      userData.posts.push(doc.data());
    })
    return db.collection('notifications').where('recipient','==', req.user.username)
    .orderBy('createdAt', 'desc').limit(10).get();
    // return res.json(userData)}})
  })
  
  .then(data => {
    userData.notifications = [];
    data.forEach(doc => {
      userData.notifications.push({
        recipient: doc.data().recipient,
        sender: doc.data().sender,
        createdAt: doc.data().createdAt,
        postId: doc.data().postId,
        type: doc.data().type,
        read: doc.data().read,
        notificationId: doc.id
      })
    });
    // comment out eh tline below too
    return res.json(userData);
  })
  .catch(err => {
    console.error(err);
    return res.status(500).json({error: err.code});
  })
}

//upload profile image for user
exports.uploadImage = (req, res) => {
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  const busboy = new BusBoy({ headers: req.headers });

  let imageFileName;
  let imageToBeUploaded= {};

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if(mimetype !== 'image/jpeg' && mimetype !== 'image/png'){
      return res.status(400).json({ error: 'wrong file type submitted'})
    }
    //image.png
    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    //46346256434564.png
    imageFileName = `${Math.round(Math.random()*100000000)}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = {filepath, mimetype};
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on('finish', () => {
    admin.storage().bucket().upload(imageToBeUploaded.filepath, {
      resumable:false,
      metadata: {
        metadata:{
          contentType: imageToBeUploaded.mimetype
        }
      }
    })
    .then(()=>{
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`
      return db.doc(`/users/${req.user.username}`).update({imageUrl});
    })
    .then(()=>{
      return res.json({message: 'image uploaded usccessfully'})
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({error: err.code});
    })
  });
  busboy.end(req.rawBody);
}

//mark notificatiosn read 
exports.markNotificationsRead = (req, res) => {
  let batch = db.batch();
  req.body.forEach(notificationId => {
    const notification = db.doc(`/notifications/${notificationId}`);
    batch.update(notification, {read: true});
  });
  batch.commit()
  .then(() => {
    return res.json({ message: 'Notifications marked read'});
  })
  .catch(err => {
    console.error(err);
    return res.status(500). json({error: err.code})
  })
}