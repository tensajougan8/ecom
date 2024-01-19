import mongoose, { Schema, Document } from 'mongoose';

export enum UserType {
    BUYER = 'BUYER',
    SELLER = 'SELLER',
  }

  
export interface IUser extends Document {
	userName: string;
	userType: UserType;
	password: string;
}

const UserSchema: Schema = new mongoose.Schema({
	userName: { type: String, required: true, unique: true },
	userType: { type: String, required: true, enum: Object.values(UserType) },
	password: { type: String, required: true },
});

export const User = mongoose.model('User', UserSchema);
