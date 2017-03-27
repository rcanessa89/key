import hostModel from './host.model';
import BaseHandler from '../../services/BaseHandler';

class HostHandler extends BaseHandler {
	constructor() {
		super(hostModel);
	}
}

export default new HostHandler();