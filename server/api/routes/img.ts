import * as express from 'express';
import { ParsedAsJson } from 'body-parser';
import * as path from 'path';

module.exports = function(router: express.Router) {
	router.route('/:imgId')
		.get((req: express.Request & ParsedAsJson, res: express.Response, next: express.NextFunction) => {
			const rootPath = `${path.dirname(require.main.filename)}/../api/users-img`;

			res.sendFile(path.resolve(`${rootPath}/${req.params.imgId}`));
		});
};