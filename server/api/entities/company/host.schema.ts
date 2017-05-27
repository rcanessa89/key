import * as mongoose from 'mongoose';
import regex from '../../util/regex';

export default new mongoose.Schema({
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
	}
}, {
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});