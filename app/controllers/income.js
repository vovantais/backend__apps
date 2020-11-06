import Income from '../modules/ShemaIncome';

export const getIncome = async (req, res, next) => {
	let message;
	await Income.find({})
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
export const postIncome = async (req, res, next) => {
	let message;
	await Income.create({
		sumIncome: req.body.sumIncome,
		dateTimeIncome: req.body.dateTimeIncome,
		descriptionIncome: req.body.descriptionIncome,
	})
		.then(async result => {
			message = {
				message: 'Income added successfully!',
				type: true,
			}
			await res.status(200).json(message);
		})
		.catch(async err => {
			message = {
				message: 'Error happend during creating income!',
				type: false,
			}
			await res.status(500).json(message);
		});
}

export const deleteIncome = async (req, res, next) => {
	let message;
	await Income.findByIdAndDelete(req.body.id)
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
				message: 'Error happend during deleting!',
				type: false,
			};
			res.status(500).json(message);
		});
};