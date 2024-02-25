const express = require('express');
const router = express.Router();
const controllers = require('../controllers/postController');

// get all posts
router.get('/',controllers.getAllPosts);

// get posts by userId
router.get('/userPosts',controllers.getUserPosts);

// create post 
router.post('/',controllers.addPost);

// edit post
router.put('/:id', controllers.editPost);

// get post by id
router.get('/:id',controllers.getPostById);

// join 
router.post('/join/:id',controllers.joinPost);

// leave 
router.post('/leave/:id',controllers.leavePost);

// get joinees info
router.post('/getjoinees/:id',controllers.getJoinees); 

// delete post
router.delete('/:id', controllers.deletePost);


module.exports = router;