import { verify, sign } from "jsonwebtoken";
import { SECRET_WORD } from '../consts/consts';


export default async (req, res, next) => {
	const token = req.headers.authorization;
	if (token) {
		verify(token, SECRET_WORD, (error, decode) => {
			if (error) {
				return res.status(401).json({ message: "Unauthorized access!" });
			}
			req.user = decode;
			next();
		});
	} else {
		return res.status(401).json({ message: "No token provided!" });
	}
};

	// if (!error) {
	// 	req.user = { decode, token };
	// 	next();
	// }
	// else if (error.name === 'TokenExpiredError') {
	// 	console.log("decode", decode);
	// 	const newToken = await sign({
	// 		// userEmail: decode.userEmail,
	// 		// userId: decode.userId,
	// 	}, SECRET_WORD,
	// 		{
	// 			expiresIn: '1d',
	// 		})
	// 	console.log('newToken', newToken);
	// 	req.user = { decode, newToken };
	// 	next();
	// }
	// else {
	// 	return res.status(401).json({ message: "Unauthorized access!" });
	// }