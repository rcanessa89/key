import { NextFunction } from 'express';
import * as mongoose from 'mongoose';
import IUser from './IUser';
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

	last_name: {
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

	rol: {
		type: String,
		required: true,
		enum: ['super_admin', 'admin', 'viewer'],
		default: 'viewer'
	},

	photoId: {
		type: Object,
		default: null
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

	created_at: {
		type: Date,
		default: Date.now
	},

	updated_at: {
		type: Date,
		default: null
	}
});

export default mongoose.model <IUser> ('User', userSchema);