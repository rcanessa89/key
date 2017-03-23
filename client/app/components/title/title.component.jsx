import React from 'react';

export default class Title extends React.Component {
	constructor(props) {
		super(props);
		this.text = 'React App.';
	}

	render() {
		return (
			<div className="title">
				<h1>{this.text}</h1>
			</div>
		);
	}
}
