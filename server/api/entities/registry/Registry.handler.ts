import registryModel from './registry.model';
import BaseHandler from '../../services/BaseHandler';

class RegistryHandler extends BaseHandler {
	constructor() {
		super(registryModel);
	}
}

export default new RegistryHandler();