import * as mongoose from 'mongoose';
import IHost from '../host/IHost';

interface IDepartment extends mongoose.Document {
	name: string;
	hosts: IHost[];
	created_at: Date;
	updated_at: Date;
}

export default IDepartment;