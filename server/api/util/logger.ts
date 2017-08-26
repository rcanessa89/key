import * as logger from 'winston';
import envVariables from '../../env-variables';

export default text => {
	if (envVariables.environment === 'test') {
		return;
	}

	logger.info(text);
};