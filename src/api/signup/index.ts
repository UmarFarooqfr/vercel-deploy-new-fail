import express from 'express';
import * as controller from './signUp.controller';
import { checkToken } from '../../auth/authService';

const router = express.Router();

router.post('/signup', controller.create);
router.post('/login', controller.loginValidation);
router.get('/:id/userProfile', checkToken, controller.getUserProfile);
router.put('/:id/updateUserProfile', checkToken, controller.updateUserProfile);

export default router;
