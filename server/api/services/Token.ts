import * as jwt from 'jwt-simple';
import envVariables from '../../env-variables';

interface ITokenOptions {
	payload?: any;
	token?: string;
};

export default class Token {
	constructor(options: ITokenOptions) {
		this.payload = options.payload || jwt.decode(options.token, envVariables.token_secret);
		this.token = options.token || jwt.encode(options.payload, envVariables.token_secret);
	}

	public payload: any;
	public token: any;

	public encode(): string {
		return this.token;
	}

	public decode(): any {
		return this.payload;
	}
}