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

hostSchema.pre('save', next => {
	this.updated_at = new Date();

	next();
});

export default mongoose.model <IHost> ('Host', hostSchema);