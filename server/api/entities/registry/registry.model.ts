import * as mongoose from 'mongoose';
import IRegistry from './IRegistry';

const registrySchema: mongoose.Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},

	last_name: {
		type: String,
		required: true,
		trim: true
	},

	document_id: {
		type: String,
		requried: true,
		trim: true
	},

	host: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Host'
	},

	sign: {
		type: String,
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

export default mongoose.model <IRegistry> ('Registry', registrySchema, 'Registries');