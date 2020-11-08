import express from 'express';
import * as incomeController from '../controllers/income';
import bodyParser from 'body-parser';
import cors from 'cors';
import { LOCAL_HOST } from '../consts/consts';
import auth from '../middleWare/authMiddlWare';

const incomeRouter = express.Router();

incomeRouter.use(cors({
	origin: LOCAL_HOST,
	optionSuccessStatus: 200,
	exposedHeaders: ['Authorization'],
}));

incomeRouter.use(bodyParser.json(), auth);

incomeRouter.route('/income')
	.get(incomeController.getIncome)
	.post(incomeController.postIncome)
	.patch(incomeController.patchIncome)
	.delete(incomeController.deleteIncome);

export default incomeRouter;
