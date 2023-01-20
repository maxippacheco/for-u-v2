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

export const getPostById = async( id: string ) => {

	await db.connect();
	const post = await Post.findById( id ).populate([
		{
			path: 'user',
			model: 'User',
			select: '_id name email role status'
		},
		{
			path: 'community',
			model: 'Community'
		},
		{
			path: 'comments',
			model: 'Comment',
			populate: [
				{
					path: 'user_comment',
					model: 'User',
					select: 'name email _id'
				}
			]
		},
	]).lean();
	await db.disconnect();

	return JSON.parse( JSON.stringify( post ) );

}