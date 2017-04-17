import * as express from 'express';
import * as google from 'googleapis';
import { ParsedAsJson } from 'body-parser';
import axios from 'axios';
import constants from '../constants';

export default class Auth {
	oauth2Client: any;
	googleClient: any;
	redirectUrl: string;

	constructor() {
		const OAuth2 = google.auth.OAuth2;
		this.googleClient = constants.GOOGLE_AUTH;
		this.oauth2Client = new OAuth2(this.googleClient.id, this.googleClient.secret, this.googleClient.redirect_url);
		this.redirectUrl = this.oauth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
		});
	}

	public resHandler(req: express.Request & ParsedAsJson, res: express.Response, next: express.NextFunction): void {
		console.log(this.oauth2Client);

		this.oauth2Client.getToken(req.query.code, (error, tokens) => {
			if (!error) {
				this.oauth2Client.setCredentials(tokens);

				console.log(tokens);

				axios({
					method: 'GET',
					url: `https://www.googleapis.com/oauth2/v2/userinfo?key=${this.googleClient.key}`,
					headers: {
						Authorization: `Bearer ${tokens.access_token}`
					}
				})
				.then(response => {

					console.log(response.data);

					res.redirect('/');
				})
			}
		})
	}
};
