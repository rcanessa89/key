import { NextFunction } from 'express';
import * as mongoose from 'mongoose';
import IUser from './IUser';
import regex from '../../util/regex';
import guid from '../../util/guid';
import saveBase64 from '../../util/saveBase64';

const userSchema: mongoose.Schema = new mongoose.Schema({
	company: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Company'
	},

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

	rol: {
		type: String,
		required: true,
		enum: ['super_admin', 'admin', 'viewer'],
		default: 'viewer'
	},

	photo: {
		type: String,
		unique: true,
		default: null,
		set: base64Obj => {
			let fileName = null;

			if (base64Obj) {
				fileName = saveBase64(base64Obj.base64, base64Obj.format);
			}

			return fileName;
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

			message: '{VALUE} is not a valid email.'
		}
	},

	verified: {
		type: Boolean,
		default: false
	},

	createdAt: {
		type: Date,
		default: Date.now
	},

	updated_at: {
		type: Date,
		default: null
	}
});

userSchema.pre('save', next => {
	this.updated_at = new Date();

	next();
});

export default mongoose.model <IUser> ('User', userSchema);