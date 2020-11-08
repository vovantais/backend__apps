import Income from '../modules/ShemaIncome';

// import { SALT_ROUNDS } from '../consts/consts';
// import jwt from 'jsonwebtoken';
// jwt.sign({
// 	userEmail: email,
// 	userId: user.id,
// }, SECRET_WORD,
// 	{
// 		expiresIn: '1d',
// 	})

export const getIncome = async (req, res) => {
	let message;
	await Income.find({ owner: req.user.userId })
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

export const postIncome = async (req, res) => {
	let message;
	await Income.create({
		sumIncome: req.body.sumIncome,
		dateTimeIncome: req.body.dateTimeIncome,
		descriptionIncome: req.body.descriptionIncome,
	})
		.then(result => {
			message = {
				message: 'Income added successfully!',
				type: true,
			}
			res.status(200).json(message);
		})
		.catch(err => {
			message = {
				message: 'Error happend during creating income! ' + err.message,
				type: false,
			}
			res.status(500).json(message);
		});
}

export const patchIncome = async (req, res) => {
	let message;
	await Income.findByIdAndUpdate(req.body.id, { descriptionIncome: req.body.description })
		.then(toUpdate => {
			message = {
				message: 'This income description updated successfully!',
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

export const deleteIncome = async (req, res) => {
	let message;
	await Income.findOneAndDelete(req.body.id)
		.then(toDelete => {
			message = {
				message: 'Deleted successfully!',
				type: true,
				deletedId: toDelete._id,
			};
			res.status(200).json(message);
		})
		.catch(err => {
			message = {
				message: 'Error happend during deleting! ' + err.message,
				type: false,
			};
			res.status(500).json(message);
		});
};
