import Expenses from '../modules/ShemaExpensess';

export const getExpenses = async (req, res, next) => {
	let message;
	await Expenses.find({})
		.then(async result => {
			message = result;
			await res.status(200).json(message);
		})
		.catch(async err => {
			message = {
				message: err.message,
				type: false,
			}
			await res.status(500).json(message);
		});
}
export const postExpenses = async (req, res, next) => {
	let message;
	await Expenses.create({
		sumSpent: req.body.sumSpent,
		category: req.body.category,
		dateTimeExpenses: req.body.dateTimeExpenses,
		descriptionExpenses: req.body.descriptionExpenses,
	})
		.then(async result => {
			message = {
				message: 'Expenses added successfully!',
				type: true,
			}
			await res.status(200).json(message);
		})
		.catch(async err => {
			message = {
				message: 'Error happend during creating expenses!',
				type: false,
			}
			await res.status(500).json(message);
		});
}

export const deleteExpenses = async (req, res, next) => {
	let message;
	console.log(req.body);
	await Expenses.findByIdAndDelete(req.body.id)
		.then(async del => {
			message = {
				message: 'Expenses deleted successfully!',
				type: false,
				deleteId: del._id,
			}
			await res.status(200).json(message);
		})
		.catch(async err => {
			message = {
				message: 'Error happend during deleting!',
				type: false,
			}
			await res.status(500).json(message);
		});
}