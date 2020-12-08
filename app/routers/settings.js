import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import auth from '../middleWare/authMiddlWare';
import Users from '../modules/ShemaUser';
import { LOCAL_HOST, SALT_ROUNDS, SECRET_WORD } from '../consts/consts';
import bcrypt from 'bcrypt';

const settingRoute = express.Router();

settingRoute.use(cors({
	origin: LOCAL_HOST,
	optionSuccessStatus: 200,
	exposedHeaders: ['Authorization'],
}));

settingRoute.use(bodyParser.json(), auth);

settingRoute.route('/city')
	.patch(async (req, res) => {
		const { city } = req.body;
		const user = await Users.findOne({ _id: req.user.userId });
		if (!user) {
			return res.status(404).json({ message: { mes: 'You don\'t have rights to change city', kind: false } });
		}
		user.city = city;
		await user.save();
		return res.status(200).json({ city, message: { mes: 'You change city successfully!', kind: true } });
	});

settingRoute.route('/name')
	.patch(async (req, res) => {
		const { name } = req.body;
		const user = await Users.findOne({ _id: req.user.userId });
		if (!user) {
			return res.status(404).json({ message: { mes: 'You don\'t have rights to change name', kind: false } });
		}
		user.userName = name;
		await user.save();
		return res.status(200).json({ name, message: { mes: 'You change name successfully!', kind: true } });
	})


settingRoute.route('/password')
	.patch(async (req, res) => {
		const { newPassword, password } = req.body;
		const user = await Users.findOne({ _id: req.user.userId });
		if (!user) {
			return res.status(404).json({ message: { mes: 'You don\'t have rights to change password', kind: false } });
		}
		if (newPassword.length < 8) {
			return res.status(401).json({ message: { mes: 'The password must be more than 8 symbols!', kind: false } });
		}
		if (!(bcrypt.compareSync(password, user.pwdHash))) {
			return res.status(401).json({ message: { mes: 'This password is not the same!', kind: false } });
		}
		user.pwdHash = await bcrypt.hashSync(newPassword, SALT_ROUNDS);
		await user.save();
		return res.status(200).json({ message: { mes: 'You password change successfully!', kind: true } });
	})

export default settingRoute;