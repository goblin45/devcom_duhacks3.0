const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userController');

// get all users
router.get('/',controllers.getUsers);
// get user by id
router.post('/getuser/:id',controllers.getUserById);
// update user
router.put('/update/:id',controllers.updateUser);
// delete user
router.delete('/delete/:id',controllers.deleteUser);

module.exports = router;