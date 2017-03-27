import * as mongoose from 'mongoose';

interface IHost extends mongoose.Document {
	name: string;
	last_name: string;
	email: string;
	created_at: Date;
	updated_at: Date;
}

export default IHost;