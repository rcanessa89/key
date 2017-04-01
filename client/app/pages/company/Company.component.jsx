import React from 'react';
import Modal from '../../components/modal/Modal.component';
import SelectInput from '../../components/app-form/select-input/SelectInput.component';

export default () => (
	<div className="company-page">
		<h2>Company page</h2>
		<SelectInput
			name="name_txt"
			selectInputId="id_txt"
			label="testeando"
			options={[{ label: 'uno', value: '1' }, { label: 'dos', value: '2' }, { label: 'tres', value: '3' }]}
			required={true}
		/>
	</div>
);
