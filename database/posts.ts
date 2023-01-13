import { db } from ".";
import Post from "../models/post";

export const getAllPosts = async() => {
	await db.connect();
	const posts = await Post.find().populate([
		{
			path: 'user',
			model: 'User',
			select: '_id name email role status'
		},
		{
			path: 'community',
			model: 'Community'
		}
	]).lean()
	await db.disconnect();

	return posts;
}