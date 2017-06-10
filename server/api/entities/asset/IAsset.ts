import * as mongoose from 'mongoose';
import IPeople from '../people/IPeople';

interface IAsset extends mongoose.Document {
	description: string;
	asset_model: string;
	series_number: string;
	brand: string;
	owner: IPeople;
	check_in: Date;
	check_out: Date;
	created_at: Date;
	updated_at: Date;
}

export default IAsset;