import express from 'express';
import * as expensesController from '../controllers/expenses';
import bodyParser from 'body-parser';
import cors from 'cors';
import { LOCAL_HOST } from '../consts/consts';

const expensesRouter = express.Router();

expensesRouter.use(cors({
	origin: LOCAL_HOST,
	optionSuccessStatus: 200,
	exposedHeaders: ['Authorization'],
}));

expensesRouter.use(bodyParser.json());

expensesRouter.route('/expenses')
	.get(expensesController.getExpenses)
	.post(expensesController.postExpenses)
	.delete(expensesController.deleteExpenses)

export default expensesRouter;