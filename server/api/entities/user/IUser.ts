import * as mongoose from 'mongoose';

enum Rol {
	super_admin,
	admin,
	viewer
}

interface IUser extends mongoose.Document {
	name: string;
	last_name: string;
	rol: Rol;
	photoId: string;
	email: string;
	verified: boolean;
	created_at: Date;
	updated_at: Date;
}

export default IUser;
