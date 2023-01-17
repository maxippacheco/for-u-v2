import mongoose, { Schema, model, Model, Types } from 'mongoose';
import { IComment } from '../interfaces/comment';

const commentSchema = new Schema<IComment>({
	text: {
		type: String,
		required: true
	},
	user_comment: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	post_comment: {
		type: Schema.Types.ObjectId,
		ref: 'Post'
	},
}, {
	timestamps: true
});

const Comment: Model<IComment> = mongoose.models.Comment || model('Comment', commentSchema);

export default Comment;