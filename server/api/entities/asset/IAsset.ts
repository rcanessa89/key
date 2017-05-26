import * as mongoose from 'mongoose';
import IRegistry from '../registry/IRegistry';
import ICompany from '../company/ICompany';

interface IAsset extends mongoose.Document {
	company: ICompany;
	asset_type: string;
	asset_model: string;
	brand: string;
	owner: IRegistry;
	check_in: Date;
	check_out: Date;
	created_at: Date;
	updated_at: Date;
}

export default IAsset;