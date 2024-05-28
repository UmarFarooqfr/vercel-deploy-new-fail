import { Model, Schema, model } from 'mongoose';

let circleMember: Schema = new Schema({
    circleId: { type:String, required:false, trim:false},
    memberName: { type:String, required:false, trim:false},
    memberLatLng:{
        lat:  { type:String, required:false, trim:false},
        lng:  { type:String, required:false, trim:false}
    },
})

const CircleMembers = model('circle',circleMember);
export default CircleMembers 