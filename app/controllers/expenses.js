import Expenses from '../modules/ShemaExpensess';

// todo Добавить создание токена если старый токен сдох

export const getExpenses = async (req, res) => {
	let message;
	await Expenses.find({ owner: req.user.userId })
		.then(result => {
			message = result;
			res.status(200).json(message);
		})
		.catch(err => {
			message = {
				message: err.message,
				type: false,
			}
			res.status(500).json(message);
		});
}
export const postExpenses = async (req, res) => {
	let message;
	await Expenses.create({
		sumSpent: req.body.sumSpent,
		category: req.body.category,
		dateTimeExpenses: req.body.dateTimeExpenses,
		descriptionExpenses: req.body.descriptionExpenses,
		owner: req.user.userId,
	})
		.then(result => {
			message = {
				message: 'Expenses added successfully!',
				type: true,
			}
			res.status(200).json(message);
		})
		.catch(err => {
			message = {
				message: 'Error happend during creating expenses! ' + err.message,
				type: false,
			}
			res.status(500).json(message);
		});
}
export const patchExpenses = async (req, res) => {
	let message;
	await Expenses.findByIdAndUpdate(req.body.id, { descriptionExpenses: req.body.description })
		.then(toUpdate => {
			message = {
				message: 'This expenses description updated successfully!',
				type: true,
			}
			res.status(200).json(message);
		})
		.catch(err => {
			message = {
				message: 'Error happend during updating! ' + err.message,
				type: false,
			}
			res.status(500).json(message);
		})
}

export const deleteExpenses = async (req, res) => {
	let message;
	await Expenses.findOneAndDelete(req.body.id)
		.then(del => {
			message = {
				message: 'Expenses deleted successfully!',
				type: true,
				deleteId: del._id,
			}
			res.status(200).json(message);
		})
		.catch(err => {
			message = {
				message: 'Error happend during deleting! ' + err.message,
				type: false,
			}
			res.status(500).json(message);
		});
}