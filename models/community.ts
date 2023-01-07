import mongoose, { Schema, model, Model, Types } from 'mongoose';
import { ICommunity } from '../interfaces/community';

const communitySchema = new Schema<ICommunity>({
	name: {
		type: String,
		required: true
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	users: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	posts: [{
		type: Schema.Types.ObjectId,
		ref: 'Post'
	}],
}, {
	timestamps: true
});

const Community: Model<ICommunity> = mongoose.models.Community || model('Community', communitySchema);

export default Community;