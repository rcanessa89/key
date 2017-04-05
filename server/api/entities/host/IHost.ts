import * as mongoose from 'mongoose';
import IDepartment from '../department/IDepartment';

interface IHost extends mongoose.Document {
	name: string;
	last_name: string;
	email: string;
	department: IDepartment;
	created_at: Date;
	updated_at: Date;
}

export default IHost;