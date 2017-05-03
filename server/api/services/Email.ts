import * as nodemailer from 'nodemailer';
import constants from '../../constants';

interface ISendOptions {
	from?: string;
	to: string;
	subject?: string;
	text?: string;
	html?: string;
}

class Email {
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: constants.GMAIL_USER,
				clientId: constants.GMAIL_CLIENT_ID,
				clientSecret: constants.GMAIL_CLIENT_SECRET,
				accessToken: constants.GMAIL_ACCESS_TOKEN,
				refreshToken: constants.GMAIL_REFRESH_TOKEN
			}
		});
	}

	public transporter: any;

	public send(options: ISendOptions): Promise<any>  {
		const mailOptions = {
			from: '"Key" <rcanessa@konradgroup.com>',
			to: options.to,
			subject: 'Key App message',
			text: 'Key App Info',
			html: '<h1>Key App</h1>'
		};

		return new Promise((resolve, reject): void => {
			this.transporter.sendMail(Object.assign({}, mailOptions, options), (error, info) => {
				if (error) {
					console.log(error);
					reject(error);
				} else {
					resolve(info);
				}
			});
		});
	}
}

export default new Email();