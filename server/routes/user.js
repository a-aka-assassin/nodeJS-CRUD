const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

//view
router.get('/', controller.view);
//find
router.post('/', controller.find);
//get user form
router.get('/adduser', controller.form);
//Submit user form
router.post('/adduser', controller.create);
//edit user
router.get('/edituser/:id', controller.edit);
//update user
router.post('/edituser/:id', controller.update);
//Delete user
router.get('/deleteuser/:id', controller.delete);
//View user
router.get('/viewuser/:id', controller.viewuser);



module.exports = router;

