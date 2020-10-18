import express from 'express';
import * as incomeController from '../controllers/income';

const incomeRouter = express.Router();

incomeRouter.route('/income')
	.get(incomeController.getIncome)
	.post(incomeController.postIncome)

export default incomeRouter;