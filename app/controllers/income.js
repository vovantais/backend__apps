import Income from '../modules/ShemaIncome';

export const getIncome = async (req, res, next) => {
	let Message;
	await Income.find({})
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
export const postIncome = async (req, res, next) => {
	let Message;
	console.log(req.body);
	await Income.create({
		sumIncome: req.body.sumIncome,
		dateTimeIncome: req.body.dateTimeIncome,
		descriptionIncome: req.body.descriptionIncome,
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