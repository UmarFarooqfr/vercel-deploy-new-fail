import { Model, Schema, model } from 'mongoose';

let userDevice:Schema = new Schema({
    memberName: { type:String, required:false, trim:true},
    memberEmail: { type:String, required:false, trim:true},
    memberPhoneNumber: { type:String, required:false, trim:true},
    image: { type:String, required:false, trim:false},
    userId: { type:String, required:false, trim:false},
    
})

const userFamilyDevice = model('userDevice',userDevice);
export default userFamilyDevice  