import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { Post } from '../../../../models';
import { IPost } from '../../../../interfaces';

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

	if( !post.likes.includes(user?._id as any) ){
		return res.status(400).json({
			message: 'BAD REQUEST - USER DIDNT LIKED THE POST'
		});
	}


  // search index of the like
  const index = post.likes.indexOf(session.user?._id as any);
  // remove from index
  post.likes.splice(index, 1);

	await post.save();

	res.json( post )


}