import { Model, Schema ,Document } from "mongoose";

export interface ISignUp extends Document {
        userName:string;
        userPhoneNumber:string;
        userCity:string;
        userCountry:string;
        userEmail:string;
        userPassword:string;
        userId: string;
        image:string;
        banMemberList:Array<any>;
}

export interface ISignUpModel extends Model<ISignUp>{}