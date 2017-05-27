import * as mongoose from 'mongoose';
import IUser from '../user/IUser';

interface ICompany extends mongoose.Document {
	name: string;
	departments: any[];
	users: IUser[];
	created_at: Date;
	updated_at: Date;
}

export default ICompany;
