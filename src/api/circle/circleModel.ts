import { Model, Schema, model } from 'mongoose';

let createCicle:Schema = new Schema({
    circleName: { type:String, required:false, trim:true},
    circleCreatedBy: { type:String, required:false, trim:true},
    circleId: { type:String, required:false, trim:false},
    userId: { type:String, required:false, trim:false},
    isAdmin: { type:Boolean, required:false, trim:false},
    memberId: { type:String, required:false, trim:false},
    memberName: { type:String, required:false, trim:false},
    memberCity: { type:String, required:false, trim:false},
    memberCountry:  { type:String, required:false, trim:false},
    memberPhoneNumber:  { type:String, required:false, trim:false},
    status: { type:String, required:false, trim:false},
    memberImage: { type:String, required:false, trim:false},
    latLng:{
        lat:  { type:Number, required:false, trim:false},
        lng:  { type:Number, required:false, trim:false}
    },
    isChecked: { type:Boolean, required:false, trim:false},
})

const Circle = model('circle', createCicle);
export default Circle

