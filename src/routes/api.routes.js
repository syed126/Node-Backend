const express = require('express')
const router = express.Router()
const techstackController =   require('../controllers/techstack.controller');


// Retrieve all employees
router.get('/create', techstackController.create);


module.exports = router