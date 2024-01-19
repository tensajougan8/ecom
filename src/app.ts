import 'reflect-metadata';
import * as express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { myContainer } from './inversify.config';
import * as bodyParser from 'body-parser';
import connectDb from './utils/database';
import cors from 'cors';

let server = new InversifyExpressServer(myContainer);

connectDb();
server.setConfig((app) => {
	app.use(
		bodyParser.urlencoded({
			extended: true,
		})
	);
	app.use(bodyParser.json());
	app.use(cors());
});

let app = server.build();
app.listen(3000);
