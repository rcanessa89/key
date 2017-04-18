import * as React from 'react';

interface TextInputProps {
	id?: string,
	name?: string,
	placeholder?: string,
	label?: string,
	value?: string
};

export default class TextInput extends React.Component<TextInputProps, undefined> {
	render() {
		return (
			<div className="field text-field">
				<label className="label" htmlFor={this.props.id}>{this.props.label}</label>

				<p className="control has-icon has-icon-right">
					<input id={this.props.id} name={this.props.name} className="input" type="text" placeholder={this.props.placeholder} value={this.props.value ? this.props.value : ''} />
					<span className="icon is-small is-right"><i className="fa fa-check" /></span>
					<span className="icon is-small is-right"><i className="fa fa-warning" /></span>
				</p>

				<p className="help is-success">This username is available</p>
				<p className="help is-danger">This email is invalid</p>
			</div>
		);
	}
}