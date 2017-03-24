import * as mongoose from 'mongoose';

interface ICompany extends mongoose.Document {
	name: string;
	created_at: Date;
	updated: Date;
}

export default ICompany;
