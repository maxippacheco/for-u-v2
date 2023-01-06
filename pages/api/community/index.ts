import { NextApiRequest, NextApiResponse } from "next";

interface Data {
	message: string;
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

	switch (req.method) {
		case "POST":
			return createCommunity(req, res);

		default:
			return res.status(400).json({
				message: "BAD REQUEST - POST"
			});
	}

}

const createCommunity = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
	return res.json({
		message: 'Hola mundo'
	})
}