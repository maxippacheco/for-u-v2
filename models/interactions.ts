import mongoose, { Schema, model, Model } from "mongoose";
import { IInteractions } from '../interfaces/post';


const interactionSchema = new Schema<IInteractions>({
	dislikes: [{
		type: Schema.Types.ObjectId,
		ref: 'Post',
		required: true
	}],
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'Post',
		required: true
	}]
}, {
	timestamps: true
});

const Interaction: Model<IInteractions> = mongoose.models.Interaction || model('Interaction', interactionSchema);