import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Users from '../modules/ShemaUser';
import VerifyUser from '../modules/ShemaVerifyUser';
import { LOCAL_HOST, SALT_ROUNDS, SECRET_WORD } from '../consts/consts';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { transporter } from '../modules/Mailer';

const authRoute = express.Router();

authRoute.use(cors({
	origin: LOCAL_HOST,
	optionSuccessStatus: 200,
}));

authRoute.use(bodyParser.json());

authRoute.route('/Login')
	.post(async (req, res) => {
		const { email, pwdHash } = req.body;
		const user = await Users.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: { text: 'This user was not found!', success: false } });
		}
		const password = await bcrypt.compareSync(req.body.password, user.pwdHash);
		if (!password) {
			return res.status(401).json({ message: { text: 'This password is not correct!', success: false } });
		}
		if (!user.verified) {
			return res.status(500).json({ message: { text: 'This user not verified!', success: false } });
		}
		await jwt.verify(user.token, SECRET_WORD, (err, decoded) => {
			if (err) {
				jwt.sign({
					userEmail: email,
				}, SECRET_WORD,
					{
						expiresIn: '1d',
					})
				res.status(200).json({ token: user.token, message: { text: 'You Log in successfully!', success: true } })
			}
			res.status(200).json({ token: user.token, message: { text: 'You Log in successfully!', success: true } });
		})
	})

authRoute.route('/registration')
	.post(async (req, res) => {
		const { email, password } = req.body;
		const key = Math.random().toString(36).substring(7);
		const messageToEmail = {
			to: req.body.email,
			subject: 'Сongratulations!',
			html: `
			<h2> Congratulations, you have successfully registered in the FBS application!</h2>

			<i>Your account details:</i>
			
			<ul>
				<li>Email: ${req.body.email}</li>
				<li>Password : ${req.body.password}</li>
				<li>Access key: ${key}</li>
			</ul>
			<p>This letter does not require a response.</p>`,
		}
		transporter.sendMail(messageToEmail)
			.then(async () => {
				const newUser = await Users.findOne({ email });
				if (newUser) {
					return res.status(403).json({ message: { text: 'This email address is already registered!', success: false } });
				}
				const createUser = new Users({
					email,
					pwdHash: bcrypt.hashSync(password, SALT_ROUNDS),
					token: jwt.sign({
						userEmail: email,
					}, SECRET_WORD, {
						expiresIn: '1d',
					}),
				})
				const verify = new VerifyUser({
					email,
					accessKey: key,
				})
				await createUser.save()
				await verify.save()
				res.status(200).json({
					message: { text: 'Your sign in successfully! We have sent you an access key to your email address!', success: true },
				})
			})
			.catch(({ message }) => {
				res.status(404).json({ message: { text: 'This email does not exist!', success: false } });
			})
			.catch(({ message }) => {
				res.status(403).json({ message: { text: message, success: false } });
			});
	});

authRoute.route('/registration/verify')
	.post(async (req, res) => {
		const { email, accessKey } = req.body;
		const user = await Users.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: { text: 'This user was not found!', success: false } });
		}
		const key = await VerifyUser.findOne({ email });
		if (key.accessKey !== accessKey) {
			return res.status(401).json({ message: { text: 'This key is not correct!', success: false } });
		}
		user.verified = true;
		await user.save();
		await VerifyUser.deleteOne({ email });
		return res.status(200).json({ message: { text: 'You verified successfully!', success: true } });
	});

export default authRoute;
