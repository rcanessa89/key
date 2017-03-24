import * as mongoose from 'mongoose';
import ICompany from './ICompany';
import regex from '../../util/regex';

const userSchema: mongoose.Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator: function(v) {
				return regex.letters.test(v);
			},

			message: '{VALUE} is not a valid, only letters allowed.'
		}
	},

	created_at: {
		type: Date,
		default: Date.now
	},

	updated: {
		type: Date,
		default: null
	}
});

export default mongoose.model <ICompany> ('Company', userSchema);