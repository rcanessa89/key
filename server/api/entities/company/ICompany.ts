import * as mongoose from 'mongoose';
import IDepartment from '../department/IDepartment';
import IRegistry from '../registry/IRegistry';
import IAsset from '../asset/IAsset';

interface ICompany extends mongoose.Document {
	name: string;
	email: string;
	departments: IDepartment[];
	registries: IRegistry[];
	assets: IAsset[];
	created_at: Date;
	updated_at: Date;
}

export default ICompany;
