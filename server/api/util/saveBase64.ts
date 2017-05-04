import * as fs from 'fs';
import guid from './guid';

export default (fullBase64: string, format: string): string => {
	const dir: string = 'server/api/users-img';
	const id: string = guid();
	const name: string = `${id}.${format}`;
	const filePath = `${dir}/${name}`;
	const base64: string = fullBase64.split(',')[1];

	if (!fs.existsSync(dir)) {
		fs.mkdir(dir, () => fs.writeFile(filePath, base64, 'base64'));
	} else {
		fs.writeFile(filePath, base64, 'base64');
	}

	return name;
};
