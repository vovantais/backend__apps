import { Router } from 'express';
import * as incomeController from '../controllers/income';
import bodyParser from 'body-parser';
import cors from 'cors';
import { LOCAL_HOST } from '../consts/consts';

const incomeRouter = new Router();

incomeRouter.use(cors({
	origin: LOCAL_HOST,
	optionSuccessStatus: 200,
	exposedHeaders: ['Authorization'],
}));

incomeRouter.use(bodyParser.json());

incomeRouter.route('/income')
	.get(incomeController.getIncome)
	.post(incomeController.postIncome)
	.delete(incomeController.deleteIncome)

export default incomeRouter;