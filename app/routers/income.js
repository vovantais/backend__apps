import express from 'express';
import * as incomeController from '../controllers/income';
import bodyParser from 'body-parser';
import cors from 'cors';
import { LOCAL_HOST } from '../consts/consts';

const incomeRouter = express.Router();

incomeRouter.use(cors({
	origin: LOCAL_HOST,
	optionSuccessStatus: 200,
}));

incomeRouter.use(bodyParser.json());

incomeRouter.route('/income')
	.get(incomeController.getIncome)
	.post(incomeController.postIncome)

export default incomeRouter;