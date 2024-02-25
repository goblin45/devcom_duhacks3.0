const express = require('express');
const router = express.Router();
const controllers = require('../controllers/connectionController');

// get all connections -> admin access
// need to make it post with a userId in body
router.get('/getall', controllers.getAllConn);
// get sent connections
router.get('/sent/:userId', controllers.getSentConn);
// get received connections
router.get('/received/:userId', controllers.getReceivedConn);
// send connection req
router.post('/',controllers.sendConn);
// accept connection
router.post('/:id/accept',controllers.acceptConn); // connection _id
// reject connection
router.post('/:id/reject', controllers.rejectConn); // " " " " 
// remove connection
router.post('/:id/remove', controllers.removeConn);

module.exports = router;