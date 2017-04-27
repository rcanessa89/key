import * as fs from 'fs';
import guid from './guid';

export default (fullBase64: string, format: string): string => {
	const id: string = guid();
	const name: string = `${id}.${format}`;
	const base64: string = fullBase64.split(',')[1];

	fs.writeFile(name, base64, 'base64');

	return name;
};
