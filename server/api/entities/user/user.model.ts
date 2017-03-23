import * as mongoose from 'mongoose';
import IUser from './IUser';

const lettersRegex = /[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate: {
			validator: function(v) {
				return lettersRegex.test(v);
			},

			message: '{VALUE} is not a valid, only letters allowed.'
		}
    },

    // lastName: {
	// 	type: String,
	// 	required: true,
	// 	trim: true,
	// 	validate: {
	// 		validator: function(v) {
	// 			return lettersRegex.test(v);
	// 		},

	// 		message: '{VALUE} is not a valid, only letters allowed.'
	// 	}
	// },

    // rol: {
	// 	type: String,
	// 	required: true,
	// 	enum: ['admin', 'viewer'],
	// 	default: 'viewer'
	// },

    // photoId: {
	// 	type: Object,
	// 	default: null
	// },

    // email: {
	// 	type: String,
	// 	unique: true,
	// 	required: true,
	// 	validate: {
	// 		validator: function(v) {
	// 			return emailRegex.test(v);
	// 		},

	// 		message: '{VALUE} is not a valid email'
	// 	}
	// },

    // created_at: {
	// 	type: Date,
	// 	default: Date.now
	// },

	// updated: {
	// 	type: Date,
	// 	default: null
	// }
});

export default mongoose.model <IUser> ('User', userSchema);