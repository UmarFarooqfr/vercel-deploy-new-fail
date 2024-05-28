import ApprovalNotification from './approvalNotification.model';
const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;
import {rejectRequestNotification, requestNotification} from '../../app'

export const approvalNotification = async function (req, res){
       const request = req.body;
    try{
        const createdRequest = await ApprovalNotification.create(request);
        console.log(createdRequest)
        if (createdRequest) {
            res.status(200).json({
                status: 'success',
                message: 'Request created successfully',
                data: createdRequest
            })
            requestNotification(request.circleCreatedBy, request.memberName, request.memberId);           
        } else {
            res.status(204).json({
                status: 'Error',
                message: 'Error in creating Request'
            })
        }
    }
    catch (error) {
        throw new Error('Error adding new request')
    }
}

export const getNotification = async function(req, res){
    try {
        const { id } = req.params;
        const notifications = await ApprovalNotification.find({ memberId: id });
        if (notifications) {
            return res.status(200).json({
                status: "success",
                message: "found notifications successfully",
                data: notifications
            })
        } else {
            return res.status().json({
                status: "Error",
                message: "Error getting notifications"
            })
        }
    } catch (err) {
       console.log(err)
    }
}
export const deleteNotification = async function (req, res) {
   console.log("dgyuacvh", req.body)
    try {
        const { id } = req.params;
        const status = req.params.payload;
        console.log("iddd", id)
        const notificationDetail = await ApprovalNotification.findOne({ _id: id });
        const removeRequest = await ApprovalNotification.findByIdAndDelete({ _id: id });
       console.log("notifiy",notificationDetail)
       if(status === 'reject'){
        rejectRequestNotification(notificationDetail.circleCreatedBy, notificationDetail.memberName,notificationDetail.userId)
       }
        if (removeRequest) {
            return res.status(200).json({
                status: "success",
                message: "Request deleted successfully"
            })
        } else {
            return res.status().json({
                status: "Error",
                message: "Error in deleting request"
            })
        }
    } catch (err) {
        console.log("err:", err);
    }
}