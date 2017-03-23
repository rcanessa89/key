import * as mongoose from 'mongoose';

enum Rol {
	admin,
	viewer
}

interface IUser extends mongoose.Document {
	name: string;
	lastName: string;
	rol: Rol;
	photoId: string;
	email: string;
	created_at: Date;
	updated: Date;
}

export default IUser;
