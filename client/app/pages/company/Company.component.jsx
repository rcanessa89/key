import React from 'react';
import Modal from '../../components/modal/Modal.component';

import AppForm from '../../components/app-form/AppForm.component';
import TextInput from '../../components/app-form/TextInput.component';
import SelectInput from '../../components/app-form/SelectInput.component';
import CheckInput from '../../components/app-form/CheckInput.component';
import RadioInput from '../../components/app-form/RadioInput.component';

export default () => (
	<div className="company-page">
		<h2>Company page</h2>

		<AppForm
			title="test fields"
		>
			<TextInput
				name="text-test"
				label="text test"
				placeholer="testing..."
				required={true}
				size="medium"
				type="email"
			/>

			<TextInput
				name="text-test"
				label="text test"
				placeholer="testing..."
				required={true}
				size="medium"
			/>

			<SelectInput
				name="select-input"
				label="select test"
				required={true}
				size="medium"
				options={[{label: 'uno', value: '1'}, {label: 'dos', value: '2'}, {label: 'tres', value: '3'}]}
				columns="6"
			/>

			<CheckInput
				name="check-input"
				label="check test"
				required={true}
				size="medium"
				options={[{label: 'uno', value: '1'}, {label: 'dos', value: '2'}, {label: 'tres', value: '3'}]}
				columns="6"
			/>

			<RadioInput
				name="radio-input"
				label="radio test"
				required={true}
				size="medium"
				options={[{label: 'uno', value: '1'}, {label: 'dos', value: '2'}, {label: 'tres', value: '3'}]}
				columns="6"
			/>
		</AppForm>

		
	</div>
);
