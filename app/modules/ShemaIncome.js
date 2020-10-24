import { Schema, model } from "mongoose";

const incomeSchema = new Schema({
	sumIncome: {
		type: String,
		required: true,
		min: 1,
		max: 10,
		validate: {
			validator: num => (num > 0),
			message: 'Sum must be more then zero!',
		}
	},
	dateTimeIncome: {
		type: String,
	},
	descriptionIncome: {
		type: String,
		required: true,
		validate: {
			validator: str => (str.length > 5),
			message: "This description must be more 5 symbols!",
		}
	}
})
export default model('Income', incomeSchema);