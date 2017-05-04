import * as jwt from 'jwt-simple';
import constants from '../../constants';

interface ITokenOptions {
	payload?: any;
	token?: string;
};

export default class Token {
	constructor(options: ITokenOptions) {
		this.payload = options.payload || jwt.decode(options.token, constants.SECRET);
		this.token = options.token || jwt.encode(options.payload, constants.SECRET);
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