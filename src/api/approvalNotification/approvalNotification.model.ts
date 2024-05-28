import { Model, Schema, model } from 'mongoose';

let approvalNotification:Schema = new Schema({
    circleCreatedBy: { type:String, required:false, trim:true},
    userId: { type:String, required:false, trim:true}, 
    circleName: { type:String, required:false, trim:true},
    circleId: { type:String, required:false, trim:false},
    createdAt: { type:String, required:false, trim:false },
    status: { type:String, required:false, trim:false },
    memberId:{type:String, required:false, trim:true},
    memberName: { type:String, required:false, trim:false},
    memberCity: { type:String, required:false, trim:false},
    memberCountry:  { type:String, required:false, trim:false},
    memberPhoneNumber:  { type:String, required:false, trim:false},
    memberImage: { type:String, required:false, trim:false},
    latLng:{
        lat:  { type:Number, required:false, trim:false},
        lng:  { type:Number, required:false, trim:false}
    },
})

const ApprovalNotification = model('ApprovalNotification',approvalNotification);
export default ApprovalNotification