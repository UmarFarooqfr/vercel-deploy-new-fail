import express from 'express';
const router = express.Router();
import * as controller from './approvalNotification.controller';

router.post('/approvalNotification', controller.approvalNotification)
router.get('/:id/getNotification' , controller.getNotification)
router.delete('/:id/:payload/deleteNotification',  controller.deleteNotification)

export = router
