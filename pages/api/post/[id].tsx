import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IPost } from '../../../interfaces';
import { Post } from '../../../models';

type Data = 
| { message: string }
| IPost;

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
	if( req.method !== 'GET'){
		return res.status(400).json({
			message: 'Bad request - METHOD'
		})
	}

	const { id } = req.query;

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

	if( !post ){
		return res.status(400).json({
			message: 'Bad request - POST'
		})
	}

	res.json( post ) 


}