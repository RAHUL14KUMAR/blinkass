const express=require('express');
const { register, login } = require('../controller/userController');
const protect=require('../middleware/authMiddleware');

const router=express.Router();

router.route('/register')
.post(register)

router.route('/login')
.post(login)


module.exports=router