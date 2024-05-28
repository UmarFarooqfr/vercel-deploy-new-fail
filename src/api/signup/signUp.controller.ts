
import users from './signUp.model';
import jwt from 'jsonwebtoken';
import * as jwtTokenKey from '../../app'
import bcrypt from 'bcryptjs'
import Circle from '../circle/circleModel';
const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;

export const create = function (req, res) {
  try {
    return users
      .findOne({
        $and: [
          { userEmail: req.body.userEmail },
        ],
      })
      .then(
        (user) => {
          if (!user) {
            return users.create(req.body).then(
              (response) => {
                const result = {
                  username: req.body.userName,
                  password: req.body.userPassword,
                };
                return res.status(200).json(result).end();
              },
              (error) => {
                console.log("Error 2", error);
              }
            );
          } else {
            return res
              .status(400)
              .json({ message: "User Already Registered" })
              .end();
          }
        },
        (error) => {
          console.log("Error 1", error);
        }
      );
  } catch (err) {
    console.log(err);

  }
};



export const loginValidation = async function (req, res) {
  try {

    return await users
      .findOne({
        $and: [
          { userEmail: req.body.userEmail },
          { userPassword: req.body.userPassword },
        ],
      })
      .then(
        async (response) => {
          if (!response) {
            if(res.status(400)){
              res.status(400).json({ message: "Invalid Email OR Password" }).end();
            } else {
              res.status().json({message: "Error on login"})
            }
          } else {
            const token = jwt.sign(
              { userName: req.body.userEmail, userPassword: req.body.userPassword },
              process.env.TOKEN_KEY || jwtTokenKey.TOKEN_KEY,
              {
                expiresIn: "24h",
              }
            );
            console.log('response: ', new ObjectId(response._id));
            const data = await Circle.findOne({userId:new ObjectId(response._id)})
            console.log('data: ', data);
            const reponse = {
              userName: response.userName,
              userEmail: response.userEmail,
              userId: response._id,
              token: token,
              circleId: data?.circleId ? data?.circleId : null,
              userCity: response.userCity,
              userCountry: response.userCountry,
              userPhoneNumber:response.userPhoneNumber,
              image:response.image,
              banMemberList:response.banMemberList
            };
            console.log("response" ,response)
            res.status(200).json(reponse).end();
          }
        },
        (error) => {
          console.log("Error", error);
        }
      );
  } catch (err) {
    console.log(err);
  }
};

export const getUserProfile = async function (req, res) {
  try {

    const user: any = await users.findById(new ObjectId(`${req.params.id}`));
    if (user) {
      return res.status(200).json({
        status: 'success',
        message: 'Fetched user successfully',
        data: user
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export const updateUserProfile = async function (req, res) {
  try {
    const user = await users.findByIdAndUpdate(new ObjectId(`${req.params.id}`), req.body);
    console.log('user: ', user);
    if (user) {
      return res.status(200).json({
        status: 'success',
        message: 'Profile updated successfully',
        data: user
      });
    } else {
      return res.status().json({
        status: 'Error',
        message: 'Failed to update profile'
      })
    }
  } catch (err) {
    console.log('err: ', err);
  }
}


