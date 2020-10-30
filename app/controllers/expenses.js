import Expenses from '../modules/ShemaExpensess';

export const getExpenses = async (req, res, next) => {
	let Message;
	await Expenses.find({})
		.then(async result => {
			Message = result;
			await res.status(200).json(Message);
		})
		.catch(async err => {
			Message = {
				message: err.message,
				type: 'Erorr',
			}
			await res.status(500).json(Message);
		});
}
export const postExpenses = async (req, res, next) => {
	let Message;
	await Expenses.create({
		sumSpent: req.body.sumSpent,
		category: req.body.category,
		dateTimeExpenses: req.body.dateTimeExpenses,
		descriptionExpenses: req.body.descriptionExpenses,
	})
		.then(async result => {
			Message = {
				message: 'Income added successfully!',
				type: 'Success',
			}
			await res.status(200).json(Message);
		})
		.catch(async err => {
			Message = {
				message: 'Error happend during creating income! ' + err.message,
				type: 'Erorr',
			}
			await res.status(500).json(Message);
		});
}