import { NextFunction } from 'express';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';
import IUser from './IUser';
import regex from '../../util/regex';
import guid from '../../util/guid';
import saveBase64 from '../../util/saveBase64';
import PreHook from '../../services/PreHook';
import constants from '../../../constants';

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

	password: {
		type: String,
		select: false,
		default: null
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
	}
}, {
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const preHook = new PreHook(userSchema);

preHook.setHook((user, next) => {
	if (!user.isModified('password')) {
		next();
	}

	bcrypt.genSalt(constants.SALT_WORK_FACTOR, (error, salt) => {
		if (error) {
			return next(error);
		}

		bcrypt.hash(user.password, salt, () => {}, (error, hash) => {
				if (error) {
					return next(error);
				}

				user.password = hash;

				next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword) {
	const user = this;

	return new Promise((resolve, reject) => {
		bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
			if (error) {
				reject(error);
			} else {
				resolve(isMatch);
			}
		});
	});
};

export default mongoose.model <IUser> ('User', userSchema);