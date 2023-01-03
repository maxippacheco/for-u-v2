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
		ref: 'user'
	},



}, {
	timestamps: true
});

const Post: Model<IPost> = mongoose.models.Post || model('Post', postSchema);

export default Post;