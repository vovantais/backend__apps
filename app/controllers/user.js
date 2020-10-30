import Users from '../modules/ShemaUser';

export const getUsers = async (req, res, next) => {
	let Message;
	await Users.find({})
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
