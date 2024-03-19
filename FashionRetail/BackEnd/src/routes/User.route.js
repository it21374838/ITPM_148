const express = require('express');
const router = express.Router();
const userController =require('../controllers/User.controller');

// Mapping routes to controller functions below
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.profile);
router.get('/', userController.getAllUsers);
router.delete('/delete/:id', userController.deleteUser); // Use HTTP DELETE method for resource deletion
router.put('/update/:id', userController.updateUser);
router.get('/get/count', userController.getUsersCount);

module.exports = router;