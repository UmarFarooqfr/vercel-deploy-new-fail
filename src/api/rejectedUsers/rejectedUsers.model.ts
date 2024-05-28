import { Model, Schema, model } from 'mongoose';

let rejectedUser:Schema = new Schema({
    circleCreatedBy: { type:String, required:false, trim:true},
    userId: { type:String, required:false, trim:true}, 
    circleName: { type:String, required:false, trim:true},
    circleId: { type:String, required:false, trim:false},
    createdAt: { type:String, required:false, trim:false },
    status: { type:String, required:false, trim:false },
    memberId:{type:String, required:false, trim:true},
    memberName: { type:String, required:false, trim:false},
    reason: { type:String, required:false, trim:false},
})

const RejectedUser = model('RejectedUser',rejectedUser);
export default RejectedUser