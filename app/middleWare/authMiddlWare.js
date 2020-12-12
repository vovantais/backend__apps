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
