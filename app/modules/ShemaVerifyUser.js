import { Schema, model } from "mongoose";

const ShemaVerifyUser = new Schema({
	// todo нужну наверное удалить поле email 
	// email: {
	// 	type: String,
	// 	required: true,
	// 	unique: true,
	// 	validate: {
	// 		validator: str => (str.length > 8 && str.includes('@')),
	// 		message: ' Email  must be more then 8 symbols and contain @ ',
	// 	}
	// },
	accessKey: {
		type: String,
		require: true,
	},
});
export default model("verifyUser", ShemaVerifyUser);