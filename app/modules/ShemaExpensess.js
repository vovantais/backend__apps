import { Schema, model } from "mongoose";

const expensesSchema = new Schema({
	sumSpent: {
		type: String,
		required: true,
		min: 1,
		max: 10,
		validate: {
			validator: num => (num > 0),
			message: 'Sum must be more then zero!',
		}
	},
	category: {
		type: String,
	},
	dateTimeExpenses: {
		type: String,
	},
	descriptionExpenses: {
		type: String,
		required: true,
		validate: {
			validator: str => (str.length > 5),
			message: "This description must be more 5 symbols!",
		}
	}
})
export default model('Expenses', expensesSchema);