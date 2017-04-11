import store from '../store.app';
import setTitle from '../components/app-header/action-creators';

const setDocumentTitle = (transition) => { document.title = `Key - ${transition.to.data.title}`; };
const dispatchTitle = transition => store.dispatch(setTitle(transition.to.data.title));

export default (router) => {
	const transition = {
		to: router.to(),
		from: router.from(),
		params: router.params(),
	};

	setDocumentTitle(transition);
	dispatchTitle(transition);
};
