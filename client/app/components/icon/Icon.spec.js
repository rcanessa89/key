import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import Icon from './Icon.component';

expect.extend(expectJSX);

describe('Icon component', () => {
	const renderer = new ReactShallowRenderer();

	renderer.render(
		<Icon
			icon="github"
			size="small"
		/>
	);

	const checkClassName = expectClassName => {
		return renderer
			.getRenderOutput()
			.props.className.includes(expectClassName);
	};

	it('Should has class "is-small"', () => {
		expect(checkClassName('is-small')).toEqual(true);
	});

	it('Should be', () => {
		const actual = renderer.getRenderOutput();
		const expected = (
			<span className="icon is-small">
				<i className="fa fa-github"></i>
			</span>
		);

		expect(actual).toEqualJSX(expected);
	});
});