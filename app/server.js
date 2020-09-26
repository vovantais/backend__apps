import express from 'express';
import mongoose from 'mongoose';
import { PORT, CONNECT_MONGODB } from './consts/consts';


export const app = express();

const start = async () => {
	try {
		await mongoose.connect(CONNECT_MONGODB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		app.listen(PORT, () => console.log('Server Listen on Port 7000!'));
	} catch (e) {
		console.log("Server error", e.message);
	}
};
start();
