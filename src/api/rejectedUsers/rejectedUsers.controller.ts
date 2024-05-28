import RejectedUser from './rejectedUsers.model';
const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;

export const rejectedUser = async function (req, res){
       const request = req.body;
    try{
        const data = await RejectedUser.create(request);
        console.log(data)
        if (data) {
            res.status(200).json({
                status: 'success',
                message: 'Data saved successfully',
                data: data
            })
        } else {
            res.status(204).json({
                status: 'Error',
                message: 'Error in saving data'
            })
        }
    }
    catch (error) {
        throw new Error('Error saving new data')
    }
}

export const getRejectedUser = async function(req, res){
    try {
        const { id } = req.params;
        const notifications = await RejectedUser.find({ memberId: id });
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

export const getAllUser = async function(req, res){
    try {
        const { id } = req.params;
        const notifications = await RejectedUser.find({ userId: id });
        if (notifications) {
            return res.status(200).json({
                status: "success",
                message: "found all users successfully",
                data: notifications
            })
        } else {
            return res.status().json({
                status: "Error",
                message: "Error getting users"
            })
        }
    } catch (err) {
       console.log(err)
    }
}

export const deleteRejectedNotification = async function (req, res) {
    try {
        const { id } = req.params;
        const removeNotification = await RejectedUser.findByIdAndDelete({ _id: id });
        if (removeNotification) {
            return res.status(200).json({
                status: "success",
                message: "Notification deleted successfully"
            })
        } else {
            return res.status().json({
                status: "Error",
                message: "Error in deleting notification"
            })
        }
    } catch (err) {
        console.log("err:", err);
    }
}