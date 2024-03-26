var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
// router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
// });

// Create a new user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user
router.put('/:id', userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;
