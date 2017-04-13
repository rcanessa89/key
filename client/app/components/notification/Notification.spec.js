import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import Notification from './Notification.component';

expect.extend(expectJSX);

describe('Notification component', () => {
	const checkClassName = expectClassName => {
		const renderer = new ReactShallowRenderer();

		renderer.render(
			<Notification
				type="primary"
				text="Hello world"
			/>
		);

		return renderer
			.getRenderOutput()
			.props.className.includes(expectClassName);
	};

	it('Should has the class "is-primary"', () => {
		expect(checkClassName('is-primary')).toEqual(true);
	});

	it('Should be', () => {
		const renderer = new ReactShallowRenderer();

		renderer.render(
			<Notification
				type="primary"
				text="Hello world"
			/>
		);

		const actual = renderer.getRenderOutput();

		const expected = (
			<div className="notification is-primary">
				<button className="delete" />
				Hello World
			</div>
		);

		expect(actual).toEqualJSX(expected);
	})
});
