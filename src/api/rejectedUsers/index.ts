import express from 'express';
const router = express.Router();
import * as controller from './rejectedUsers.controller'

router.post('/rejectedUsers', controller.rejectedUser)
router.get('/:id/getRejectedUser' , controller.getRejectedUser)
router.delete('/:id/deleteRejectedNotification',  controller.deleteRejectedNotification)
router.get('/:id/getAllUser' , controller.getAllUser)

export = router
