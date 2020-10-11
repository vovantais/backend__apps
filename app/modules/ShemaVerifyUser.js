import { Schema, model } from "mongoose";

const ShemaVerifyUser = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	accessKey: {
		type: String,
		require: true,
	},
});
export default model("VerifyUser", ShemaVerifyUser);