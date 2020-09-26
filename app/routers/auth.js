import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { LOCAL_HOST } from '../consts/consts';

const authRoute = express.Router();


authRoute.use(cors({
	origin: LOCAL_HOST,
	optionSuccessStatus: 200,
}));

authRoute.use(bodyParser.json());