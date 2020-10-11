import nodemailer from 'nodemailer';
import {
	HOST_MAIL_ADRESS,
	USER_EMAIL_ADRESS,
	USER_PASSWORD_EMAIL,
	USER_NIK_NAME_TO_SEND_MESSAGE,
}
	from '../consts/consts';
const transporter = nodemailer.createTransport({
	host: HOST_MAIL_ADRESS,
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: USER_EMAIL_ADRESS,
		pass: USER_PASSWORD_EMAIL,
	}
},
	{
		from: `${USER_NIK_NAME_TO_SEND_MESSAGE} <${USER_EMAIL_ADRESS}>`,
	}
);

export const mailer = message => {
	transporter.sendMail(message, (err, info) => {
		if (err) {
			return console.log(err);
		}
		console.log('Email sent: ', info);
	})
}

