import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import Comment from '../../../models/comment';
import Post from '../../../models/post';
import { IComment } from '../../../interfaces/comment';
import { db } from '../../../database';

type Data = 
| { message: string }
| IComment;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "POST":
			return createComment( req, res )
	
		// TODO Delete comment

		default:
			return res.status(400).json({
				message: "BAD REQUEST - METHOD"
			})
	}

}

const createComment = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query;
	const { text } = req.body;
	
	await db.connect();
	const session = await getSession({ req });
	const post = await Post.findById( id );
	
	if( !session ){
		return res.status(400).json({
			message: 'BAD REQUEST - VALIDATIONS - USER'
		})
	}
	if( !post ){
		return res.status(400).json({
			message: 'BAD REQUEST - VALIDATIONS - POST'
		})
	}
	if( !text ){
		return res.status(400).json({
			message: 'BAD REQUEST - VALIDATIONS - TEXT'
		})
	}

	const data = { 
		user_comment: session.user,
		text,
		post_comment: post,
		community_name: post?.community.name
	}

	const comment = new Comment(data);
	post.comments.push( comment );

	await Promise.all([
		comment.save(),
		post.save()
	])

	await db.disconnect()
	

	res.json( comment );

}