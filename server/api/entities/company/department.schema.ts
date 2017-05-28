import * as mongoose from 'mongoose';
import hostSchema from './host.schema';

export default new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},

	hosts: [hostSchema]
}, {
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});