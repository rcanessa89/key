import * as mongoose from 'mongoose';
import IDepartment from '../department/IDepartment';
import IRegistry from '../registry/IRegistry';
import IAsset from '../asset/IAsset';
import IUser from '../user/IUser';

interface ICompany extends mongoose.Document {
	name: string;
	departments: IDepartment[];
	users: IUser[];
	registries: IRegistry[];
	assets: IAsset[];
	created_at: Date;
	updated_at: Date;
}

export default ICompany;
