import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Users from '../modules/ShemaUser';
import { LOCAL_HOST, SALT_ROUNDS, SECRET_WORD } from '../consts/consts';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const authRoute = express.Router();


authRoute.use(cors({
	origin: LOCAL_HOST,
	optionSuccessStatus: 200,
}));

authRoute.use(bodyParser.json());

authRoute.route('/Signin')
	.post(async (req, res) => {
		const { email, pwdHash } = req.body;
		const user = await Users.findOne({ email });
		if (!user) {
			return res.status(404).json('This user was not found!');
		}
		const password = await bcrypt.compareSync(req.body.password, user.pwdHash);
		if (!password) {
			return res.status(401).json('This password is not correct!');
		}
		await jwt.verify(user.token, SECRET_WORD, (err, decoded) => {
			if (err) {
				jwt.sign({
					userEmail: email,
				}, SECRET_WORD,
					{
						expiresIn: '1d',
					})
				res.status(200).json({ token: user.token, messege: 'You sign in successfully!' })
			}
			res.status(200).json({ token: user.token, messege: 'You sign in successfully!' });
		})
	})

authRoute.route('/Login')
	.post(async (req, res) => {
		const { email, password } = req.body;
		const newUser = await Users.findOne({ email });
		if (newUser) {
			return res.status(403).json('This email address is already registered!');
		}
		const createUser = new Users({
			email,
			pwdHash: bcrypt.hashSync(password, SALT_ROUNDS),
			token: jwt.sign({
				userEmail: email,
			}, SECRET_WORD, {
				expiresIn: '1d',
			})
		})
		await createUser.save()
			.then(() => res.status(200).json('Your Log in successfully'))
			.catch(({ message }) => {
				res.status(403).json(message);
			});
	});

export default authRoute;