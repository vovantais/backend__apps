import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routers/auth';
import expensesRouter from './routers/expenses';
import incomeRouter from './routers/income';
import settingRoute from './routers/settings'
import { PORT, CONNECT_MONGODB } from './consts/consts';

const app = express();

app.use(authRoute);
app.use(incomeRouter);
app.use(expensesRouter);
app.use(settingRoute);


const start = async () => {
	try {
		await mongoose.connect(CONNECT_MONGODB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		app.listen(PORT, () => console.log('Server Listen on Port 7000!'));
	} catch (e) {
		console.log("Server error", e.message);
	}
};
start();
