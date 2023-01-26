import mongoose, { Schema, model, Model, Types } from 'mongoose';
import { IPost } from '../interfaces/post';

const postSchema = new Schema<IPost>({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true		
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	community: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'community'
	},
	comments:[{
		type: Schema.Types.ObjectId,
		ref: 'community'
	}],
	status: {
		type: Boolean,
		required: true,
		default: true
	},
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	dislikes: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],

}, {
	timestamps: true
});

const Post: Model<IPost> = mongoose.models.Post || model('Post', postSchema);

export default Post;