import Expenses from '../modules/ShemaExpensess';

export const getExpenses = async (req, res, next) => {
	let Message;
	await Expenses.find({})
		.then(res => {
			Message = res;
		})
		.catch(err => {
			Message = {
				message: err.message,
				type: 'Erorr',
			}
		});
	await res.json(Message);
}
export const postExpenses = async (req, res, next) => {
	let Message;
	console.log(req.body);
	await Expenses.create({
		sumSpent: req.body.sumSpent,
		category: req.body.category,
		dateTimeExpenses: req.body.dateTimeExpenses,
		descriptionExpenses: req.body.descriptionExpenses,
	})
		.then(res => {
			Message = {
				message: 'Income added successfully!',
				type: 'Success',
			}
		})
		.catch(err => {
			res.status(500);
			Message = {
				message: 'Error happend during creating income! ' + err.message,
				type: 'Erorr',
			}
		});
	await res.json(Message);
}