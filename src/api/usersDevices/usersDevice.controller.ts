
import jwt from 'jsonwebtoken';
// import * as jwtTokenKey from '../../..'
import bcrypt from 'bcryptjs'
import userFamilyDevice from './usersDevices.model';
const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;

export const addUserFamilyDevice = async function (req, res) {
    const member = req.body;
    try {
        const createdMember = await userFamilyDevice.create(member);
        if (createdMember) {
            res.status(200).json({
                status: 'success',
                message: 'Member profile is created successfully',
                data: createdMember
            })
        } else {
            res.status(204).json({
                status: 'Error',
                message: 'Error in creating member profile'
            })
        }
    }
    catch (error) {
        throw new Error('Error adding new product')
    }
}

export const getAllMemberDevices = async function (req, res) {
    try {
        const memberDevices = await userFamilyDevice.find({ userId: req.params.id });
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

export const deleteMemberDeviceById = async function (req, res) {
    try {
        const removeUser = await userFamilyDevice.findByIdAndDelete(new ObjectId(`${req.params.id}`));
        if (removeUser) {
            return res.status(200).json({
                status: "success",
                message: "user deleted successfully"
            })
        } else {
            return res.status().json({
                status: "Error",
                message: "Error in deleting user"
            })
        }
    } catch (err) {
        console.log("err:", err);
    }
}

export const getUserDevicebyId = async function (req, res) {
    try {
        const user = await userFamilyDevice.findById(new ObjectId(`${req.params.id}`));
        if (user) {
            return res.status(200).json({
                status: "success",
                message: "found user successfully",
                data: user
            })
        } else {
            return res.status().json({
                status: "Error",
                message: "Error getting user"
            })
        }
    } catch (err) {

    }

}

export const updateUserDevice = async function (req, res) {
    try{
        const userDevice = await userFamilyDevice.findByIdAndUpdate(new ObjectId(`${req.params.id}`), req.body);
        if (userDevice) {

            return res.status(200).json({
              status: 'success',
              message: 'User device updated successfully',
              data: userDevice
            });
          } else {
            return res.status().json({
              status: 'Error',
              message: 'Failed to update User device'
            })
          }
    } catch (err){
        console.log('err: ', err);

    }

}