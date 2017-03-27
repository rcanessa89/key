import assetModel from './asset.model';
import BaseHandler from '../../services/BaseHandler';

class AssetHandler extends BaseHandler {
	constructor() {
		super(assetModel);
	}
}

export default new AssetHandler();