import * as mongoose from 'mongoose';
import ICompany from './ICompany';
import regex from '../../util/regex';

const userSchema: mongoose.Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		validate: {
			validator: function(v) {
				return regex.letters.test(v);
			},

			message: '{VALUE} is not a valid, only letters allowed.'
		}
	},

	email: {
		type: String,
		unique: true,
		required: true,
		validate: {
			validator: function(v) {
				return regex.email.test(v);
			},

			message: '{VALUE} is not a valid email'
		}
	},

	departments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Department'
	}],

	registries: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Registry'
	}],

	assets: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Asset'
	}],

	created_at: {
		type: Date,
		default: Date.now
	},

	updated_at: {
		type: Date,
		default: null
	}
});

export default mongoose.model <ICompany> ('Company', userSchema, 'Companies');