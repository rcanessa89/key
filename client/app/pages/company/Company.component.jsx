import React from 'react';
import Modal from '../../components/modal/Modal.component';
import TextInput from '../../components/app-form/text-input/TextInput.component';

export default () => (
	<div className="company-page">
		<h2>Company page</h2>
		<TextInput
			name="test"
			textInputId="probando"
			label="testing"
			placeholer="testing la vara"
			succesMessage="funciona"
		/>
	</div>
);
