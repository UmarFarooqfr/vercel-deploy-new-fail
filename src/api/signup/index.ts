import express from 'express';
const router = express.Router();
import * as controller from './signUp.controller';
import { checkToken } from '../../auth/authService';
const auth = require("../../auth/authService");



router.post('/signup', controller.create);
router.post('/login',controller.loginValidation)
router.get('/:id/userProfile', checkToken , controller.getUserProfile);
router.put('/:id/updateUserProfile', checkToken , controller.updateUserProfile);


export = router

