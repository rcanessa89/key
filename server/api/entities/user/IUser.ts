import * as mongoose from 'mongoose';
import ICompany from '../company/ICompany';

enum Rol {
	super_admin,
	admin,
	viewer
}

interface IUser extends mongoose.Document {
	company: ICompany;
	name: string;
	last_name: string;
	password: string;
	rol: Rol;
	photo: string;
	email: string;
	verified: boolean;
	created_at: Date;
	updated_at: Date;
	comparePassword?: any;
}

export default IUser;
