import * as mongoose from 'mongoose';
import IAsset from './IAsset';

const assetSchema: mongoose.Schema = new mongoose.Schema({
	asset_type: {
		type: String,
		required: true,
		trim: true
	},

	asset_model: {
		type: String,
		required: true,
		trim: true
	},

	brand: {
		type: String,
		required: true,
		trim: true
	},

	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Registry',
		required: true
	},

	check_in: {
		type: Date,
		default: Date.now
	},

	check_out: {
		type: Date,
		default: null
	},

	created_at: {
		type: Date,
		default: Date.now
	},

	updated_at: {
		type: Date,
		default: null
	}
});

export default mongoose.model <IAsset> ('Asset', assetSchema);