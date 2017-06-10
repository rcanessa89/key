import * as mongoose from 'mongoose';
import IAsset from './IAsset';

const assetSchema: mongoose.Schema = new mongoose.Schema({
	description: {
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

	series_number: {
		type: String,
		required: true,
		trim: true
	},

	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'People',
		required: true
	},

	check_in: {
		type: Date,
		default: Date.now
	},

	check_out: {
		type: Date,
		default: null
	}
}, {
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model <IAsset> ('Asset', assetSchema);
