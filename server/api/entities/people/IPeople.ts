import * as mongoose from 'mongoose';
import ICompany from '../company/ICompany';

interface IRegistry extends mongoose.Document {
	company_id: string;
	name: string;
	last_name_1: string;
	last_name_2: string;
	document_id: string;
	company?: string;
	department: string;
	host: string;
	sign: string;
	date: Date;
	check_in: Date;
	check_out: Date;
	created_at: Date;
	updated_at: Date;
}

export default IRegistry;