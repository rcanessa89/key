import * as logger from 'winston';
import constants from '../../constants';

export default text => {
	if (constants.ENV === 'test') {
		return;
	}

	logger.info(text);
};