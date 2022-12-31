import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema<IUser>({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: {
		type: String,
		enum: {
			values: ['admin', 'client'],
			message: '{VALUE} IT IS NOT VALID ROLE',
			default: 'client',
			required: true
		}
	},
	avatar: { type: String },
	status: { type: String, default: 'offline' }
	
}, {
	timestamps: true
});

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;