import { Schema, model } from "mongoose";

const ShemaUser = new Schema({
	userName: {
		type: String,
		required: true,
		validate: {
			validator: str => (str.length >= 3 && typeof str === 'string'),
			message: 'Name must be more then 3 letters!',
		}
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: str => (str.length > 8 && str.includes('@')),
			message: ' Email  must be more then 8 symbols and contain @ ',
		}
	},
	city: {
		type: String,
		required: true,
		validate: {
			validator: str => (str.length >= 3 && typeof str === 'string'),
			message: 'City must be more then 3 letters!',
		}
	},
	pwdHash: {
		type: String,
		required: [true, 'Password is required.'],
		validate: {
			validator: (str) => (str.length > 8),
			message: "This password must be more 8 symbols!",
		},
	},
	token: {
		type: String,
	},
	verified: {
		type: Boolean,
		default: false,
	},
});
export default model("Users", ShemaUser);