import { approvalRequestNotification, bannedUserNotification, removeUserNotification } from '../../app';
import Circle from './circleModel';
const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;

export const createNewCircle = async function (req, res) {
    const circle = req.body;
    try {
        const createdCircle = await Circle.create(circle);
        if (createdCircle) {
            res.status(200).json({
                status: 'success',
                message: 'Circle created successfully',
                data: createdCircle
            })
        } else {
            res.status(204).json({
                status: 'Error',
                message: 'Error in creating Circle'
            })
        }
    }
    catch (error) {
        throw new Error('Error adding new circle')
    }
}


export const getAllCircleByUserId = async function (req, res) {
    try {
        const memberDevices = await Circle.find({ userId: req.params.id });
        const checked = memberDevices.every(res => res.isChecked === false);
        if (checked) {
            memberDevices[0].isChecked = true;
        }
        if (memberDevices) {

            return res.status(200).json({
                status: 'success',
                message: 'Fetched user successfully',
                data: memberDevices
            });
        } else {
            return res.status().json({
                status: 'success',
                message: 'getting error to fetch users',
            });
        }
    } catch (err) {
        console.log('err: ', err);
    }
}

export const deleteCircle = async function (req, res) {
    try {
        const removeUser = await Circle.deleteMany({ circleId: req.params.id });
        if (removeUser) {
            return res.status(200).json({
                status: "success",
                message: "Circle deleted successfully"
            })
        } else {
            return res.status().json({
                status: "Error",
                message: "Error in deleting Circle"
            })
        }
    } catch (err) {
        console.log("err:", err);
    }
}

export const getCircleDetailsbyId = async function (req, res) {
    try {
        const circle = await Circle.findById(new ObjectId(`${req.params.id}`));
        console.log(circle)
        if (circle) {
            return res.status(200).json({
                status: "success",
                message: "found circle successfully",
                data: circle
            })
        } else {
            return res.status().json({
                status: "Error",
                message: "Error getting circle"
            })
        }
    } catch (err) {

    }
}

export const addMemberbyCircleId = async function (req, res) {
    const circle = req.body;
    try {
        const createdCircle = await Circle.create(circle);
        console.log("addmem",createdCircle)
        const data = await Circle.findOne({ _id: createdCircle._id })
        if (createdCircle) {
            res.status(200).json({
                status: 'success',
                message: 'Circle created successfully',
                data: data
            })
            approvalRequestNotification(circle.circleCreatedBy, circle.memberName, circle.userId)
        } else {
            res.status(204).json({
                status: 'Error',
                message: 'Error in creating Circle'
            })
        }
    }
    catch (error) {
        throw new Error('Error adding new circle member')
    }
}

export const getCircleAdminDetailById = async function (req, res) {
    try {
        const circleDetail = await Circle.findOne({ circleId: req.params.id });
        if (circleDetail) {
            return res.status(200).json({
                status: 'success',
                message: 'Fetched user successfully',
                data: circleDetail
            });
        } else {
            if (circleDetail === null) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No record found',
                });
            } else {
                return res.status().json({
                    status: 'error',
                    message: 'getting error to fetch users',
                });
            }
        }
    } catch (err) {
        console.log('err: ', err);
    }
}

export const getAllCircleMembersByCircleId = async function (req, res) {
    try {
        if (req.params.userId) {
            await Circle.updateMany({ userId: req.params.userId },{
                $set: {
                    isChecked: false
                }
            })
            await Circle.updateOne({ circleId: req.params.id, userId: req.params.userId }, {
                $set: {
                    isChecked: true
                }
            })
        }
        const circles = await Circle.find({ circleId: req.params.id });
        if (circles) {
            return res.status(200).json({
                status: 'success',
                message: 'Fetched members successfully',
                data: circles
            });
        } else {
            if (circles === null) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No record found',
                });
            } else {
                return res.status().json({
                    status: 'error',
                    message: 'getting error to fetch members',
                });
            }
        }
    } catch (err) {
        console.log('err: ', err);
    }
}

export const getAllCircleMembersByUserId = async function (req, res) {
    try {
        const circles = await Circle.find({ memberId: req.params.id });
        if (circles) {
            return res.status(200).json({
                status: 'success',
                message: 'Fetched all members successfully',
                data: circles
            });
        } else {
            if (circles === null) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No record found',
                });
            } else {
                return res.status().json({
                    status: 'error',
                    message: 'getting error to fetch members',
                });
            }
        }
    } catch (err) {
        console.log('err: ', err);
    }
}

export const leaveCircleById = async function (req, res) {

    const { id } = req.params;
    const status = req.params.payload;
    try {
        console.log('req.params.id: ', req.params.id);
        const circleDetail = await Circle.findOne({ userId: id });
        const circle = await Circle.deleteOne({ userId: id });
        console.log('circle: ', circle);
        if(status === 'remove'){
            removeUserNotification(circleDetail.memberName, circleDetail.circleCreatedBy, circleDetail.userId)
        }else if (status === 'banned') {
            bannedUserNotification(circleDetail.memberName, circleDetail.circleCreatedBy, circleDetail.userId)
        }else{
            if (circle) {
                return res.status(200).json({
                    status: "success",
                    message: "found circle successfully",
                })
            } else {
                return res.status().json({
                    status: "Error",
                    message: "Error getting circle"
                })
            }
        }
        if (circle) {
            return res.status(200).json({
                status: "success",
                message: "found circle successfully",
            })
        } else {
            return res.status().json({
                status: "Error",
                message: "Error getting circle"
            })
        }
    } catch (err) {
        console.log('err: ', err);

    }
}

export const updateUserLocationbyIntervals = async function (req, res) {
    try {
        const coords = req.body;
        const locationUpdated = await Circle.updateMany({ userId: req.params.id }, {
            $set: {
                latLng: {
                    lat: coords.lat,
                    lng: coords.lng
                }
            }
        });
        if (locationUpdated) {
            return res.status(200).json({
                status: "success",
                message: "location updated successfully",
            })
        } else {
            return res.status().json({
                status: "Error",
                message: "Error updating location"
            })
        }
    } catch (err) {
        console.log('err: ', err);

    }
}