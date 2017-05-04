import * as mongoose from 'mongoose';
import IHost from './IHost';
import regex from '../../util/regex';

const hostSchema: mongoose.Schema = new mongoose.Schema({
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

	email: {
		type: String,
		unique: true,
		required: true,
		validate: {
			validator: function(v) {
				return regex.email.test(v);
			},

			message: '{VALUE} is not a valid email.'
		}
	},

	department: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Department'
	}
}, {
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model <IHost> ('Host', hostSchema);