import { verify } from "jsonwebtoken";
import { SECRET_WORD } from '../consts/consts';


export default (req, res, next) => {
	console.log(req.headers);
	const token = req.headers.authorization;
	console.log(token);
	if (token) {
		verify(token, SECRET_WORD, (error, decode) => {
			if (error) {
				console.log(error);
				return res.status(401).json({ message: "Unauthorized access!" });
			}
			req.user = decode;
			next();
		});
	} else {
		return res.status(401).json({ message: "No token provided!" });
	}
};