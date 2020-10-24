import Income from '../modules/ShemaIncome';

export const getIncome = async (req, res, next) => {
	let Message;
	await Income.find({})
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
export const postIncome = async (req, res, next) => {
	let Message;
	console.log(req.body);
	await Income.create({
		sumIncome: req.body.sumIncome,
		dateTimeIncome: req.body.dateTimeIncome,
		descriptionIncome: req.body.descriptionIncome,
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