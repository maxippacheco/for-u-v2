import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { ICommunity } from '../../../interfaces/community';
import { Community } from '../../../models';

type Data = 
| { message: string }
| ICommunity

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "PUT":
			return addUserToCommunity( req, res );
	
		default:
			return res.status(400).json({
				message: "Bad request"
			});
	}
}

const addUserToCommunity = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

	// ID = COMMUNITY ID
	const { id } = req.query;

	const community = await Community.findById( id );

	
	if( !community ) {
		return res.status(400).json({
			message: "Community does not exist"
		})
	}
	
	const session: any = await getSession({ req })

	if(!session) {
		return res.status(400).json({
			message: 'You need to login to access this endpoint'
		})
	}

	community.users.push( session.user );

	await community.save();

	return res.json( community)

}