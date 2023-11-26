import express from 'express'
import { check } from 'express-validator';
import userControl from '../controllers/auth.controller.js';
import authToken from '../middleware/auth.middleware.js';


const route = express.Router();


route.get('/', authToken, userControl.getUser);



route.post('/register', [
    check("username", "Username is Required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must be equal or greater than 8 character").isLength({ min: 8 }),
    check("password_confirmation", "Password must be equal or greater than 8 character").isLength({ min: 8 })
], userControl.userRegistration);


route.post('/login', [check("email", "Email is required").isEmail(), check("password", "Password must be greater than 8 character").isLength({ min: 8 })], userControl.userLogin);

export default route;