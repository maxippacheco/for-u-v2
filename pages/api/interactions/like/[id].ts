import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { Post } from '../../../../models';
import { IPost, IUser } from '../../../../interfaces';

type Data = 
| { message: string }
| IPost

export default async function(req: NextApiRequest, res: NextApiResponse<Data>) {
	if( req.method !== 'PUT'){
		return res.status(400).json({
			message: 'BAD REQUEST - METHOD'
		})
	}

	const { id } = req.query;
	const session = await getSession({ req });
	
	if( !session){
		return res.status(400).json({
			message: 'BAD REQUEST - USER'
		});
	}
	
	const post = await Post.findById( id );
	const { user } = session;

	if( !post ){
		return res.status(400).json({
			message: 'BAD REQUEST - POST'
		});
	}

	if( post.interactions.likes.find( userLikedPost => userLikedPost._id === user?._id )){
		return res.status(400).json({
			message: 'BAD REQUEST - USER ALREADY LIKED POST'
		});
	}

	post.interactions.likes.push( user as IUser );
	await post.save();

	res.json( post )


}