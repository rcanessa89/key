import React from 'react';
import Modal from '../../components/modal/Modal.component';
import AppButton from '../../components/app-button/AppButton.component';

export default () => (
	<div className="company-page">
		<h2>Company page</h2>
		<Modal modalId="xxx" modalButton={<AppButton text="test" action={() => false} />} type="card" title="test modal card" footer={<div>test footer</div>}>
			<div>jnasijdnsd</div>
		</Modal>
	</div>
);
