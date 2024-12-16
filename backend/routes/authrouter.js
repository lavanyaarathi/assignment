const { signup , login} = require('../Controllers/authcontroller');
const {signupValidation, loginValidation}= require('../Middlewares/authvalidation');

const router=require('express').Router();


router.post('/login', loginValidation, login);
router.post('/signup', signupValidation,signup);

module.exports=router;