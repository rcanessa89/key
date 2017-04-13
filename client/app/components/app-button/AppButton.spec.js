import chai, {expect} from 'chai'
import jsxChai from 'jsx-chai'
import TestUtils from 'react-dom/test-utils';
import AppButton from './AppButton.component';

chai.use(jsxChai);

describe('empty', () => {
	it('Should work', () => {
		expect(true).to.equal(true);
	});
});
