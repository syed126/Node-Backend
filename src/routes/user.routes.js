const express = require('express')
const router = express.Router()
const userController =   require('../controllers/user.controller');
// Retrieve all employees
router.post('/register', userController.userRegister);
// Create a new employee
router.post('/login', userController.userLogin);
module.exports = router