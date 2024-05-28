import { Schema, model } from 'mongoose';
import { ISignUp } from './signUp.interface';


let signUpSchema: Schema<ISignUp> = new Schema({
        userName: { type: String, required: true },
        userPhoneNumber: { type: String, required: true},
        userCity:{ type: String, required: true},
        userCountry:{ type: String, required: true},
        userEmail:{ type: String, required: true},
        userPassword:{ type: String, required: true},
        userId:{ type: String, required: false},
        image:{ type: String, required: false},
        banMemberList: {type: new Array, required:false, trim:false }
});

//@ts-ignore
export = model<ISignUp, ISignUpModel>('users', signUpSchema);
