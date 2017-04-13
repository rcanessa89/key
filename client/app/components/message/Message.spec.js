import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import Message from './Message.component';

expect.extend(expectJSX);

describe('Message component', () => {
	const checkClassName = expectClassName => {
		const renderer = new ReactShallowRenderer();

		renderer.render(
			<Message
				type="primary"
				header="small"
			/>
		);

		return renderer
			.getRenderOutput()
			.props.className.includes(expectClassName);
	};

	it('Should has the class "message"', () => {
		expect(checkClassName('message')).toEqual(true);
	});

	it('Should has the class "is-primary"', () => {
		expect(checkClassName('is-primary')).toEqual(true);
	});

	it('Should has a header', () => {
		const renderer = new ReactShallowRenderer();

		renderer.render(
			<Message
				type="primary"
				header="Hello World"
			/>
		);

		const actual = renderer.getRenderOutput();

		const expected = (
			<div className="message-header">
				<p>Hello World</p>
				<button className="delete"></button>
			</div>
		);

		expect(actual).toIncludeJSX(expected);
	});
});
