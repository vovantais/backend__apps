import express from 'express';
import * as expensesController from '../controllers/expenses';

const expensesRouter = express.Router();

expensesRouter.route('/expenses')
	.get(expensesController.getExpenses)
	.post(expensesController.postExpenses)

export default expensesRouter;