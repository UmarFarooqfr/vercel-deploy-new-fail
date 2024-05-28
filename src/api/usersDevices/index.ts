import express from 'express';
const router = express.Router();
import * as controller from './usersDevice.controller';
import { checkToken } from '../../auth/authService';
const auth = require("../../auth/authService");


router.post('/addUserFamilyDevice', checkToken , controller.addUserFamilyDevice);
router.get('/:id/getAllMemberDevices', checkToken , controller.getAllMemberDevices);
router.delete('/:id/deleteMemberDeviceById', checkToken , controller.deleteMemberDeviceById);
router.get('/:id/getUserDevicebyId', checkToken , controller.getUserDevicebyId);
router.put('/:id/updateUserDevicebyId', checkToken, controller.updateUserDevice);


export = router

