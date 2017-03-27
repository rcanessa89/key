import * as mongoose from 'mongoose';
import IRegistry from '../registry/IRegistry';

interface IAsset extends mongoose.Document {
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