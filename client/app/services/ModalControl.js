import * as modalActionCreators from '../components/modal/action-creators';
import store from '../store.app';

export default class ModalControl {
	constructor(modalId) {
		this.modalId = modalId;
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	open() {
		store.dispatch(modalActionCreators.open(this.modalId));
	}

	close() {
		store.dispatch(modalActionCreators.close(this.modalId));
	}

	toggle() {
		store.dispatch(modalActionCreators.toggle(this.modalId));
	}
}
