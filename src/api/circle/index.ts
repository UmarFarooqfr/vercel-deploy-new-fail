import express from 'express';
const router = express.Router();
import * as controller from './circleController';
import { checkToken } from '../../auth/authService';

router.post('/createCircle', checkToken , controller.createNewCircle);
router.get('/:id/getAllCircles', checkToken , controller.getAllCircleByUserId);
router.get('/:id/getCircleDetailbyId', checkToken , controller.getCircleAdminDetailById);
router.delete('/:id/deleteCircle', checkToken, controller.deleteCircle)
router.get('/:id/circleDetails' , checkToken, controller.getCircleDetailsbyId)
router.post('/addMemberbyCircleId', checkToken, controller.addMemberbyCircleId)
router.get('/:id/userId/:userId/getAllCircleMembersById', checkToken, controller.getAllCircleMembersByCircleId)
router.get('/:id/getAllCircleMembersByUserId', checkToken, controller.getAllCircleMembersByUserId)
router.delete('/:id/:payload/leaveCircle', checkToken , controller.leaveCircleById);
router.put('/:id/updateLocationbyInterval', checkToken, controller.updateUserLocationbyIntervals);

export = router;
