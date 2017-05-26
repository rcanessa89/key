import * as mongoose from 'mongoose';
import IHost from '../host/IHost';
import ICompany from '../company/ICompany';

interface IRegistry extends mongoose.Document {
	name: string;
	last_name: string;
	document_id: string;
	company: ICompany;
	host: IHost;
	sign: string;
	check_in: Date;
	check_out: Date;
	created_at: Date;
	updated_at: Date;
}

export default IRegistry;