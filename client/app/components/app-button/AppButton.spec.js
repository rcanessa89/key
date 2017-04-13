import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import AppButton from './AppButton.component';

expect.extend(expectJSX);

describe('AppButton Component', () => {
	const checkClassName = expectClassName => {
		const renderer = new ReactShallowRenderer();

		renderer.render(
			<AppButton
				text="test"
				type="dark"
				action={() => false}
				size="small"
				state="primary"
				inverted={true}
				outlined={true}
				hovered={true}
				focused={true}
				active={true}
				loading={true}
			/>
		);

		return renderer
			.getRenderOutput()
			.props.className.includes(expectClassName);
	};

	it('Should has class "button"', () => {
		expect(checkClassName('button')).toEqual(true);
	});

	it('Should has size class "is-small"', () => {
		expect(checkClassName('is-small')).toEqual(true);
	});

	it('Should has size class "is-dark"', () => {
		expect(checkClassName('is-dark')).toEqual(true);
	});

	it('Should has size class "is-primary"', () => {
		expect(checkClassName('is-primary')).toEqual(true);
	});

	it('Should has size class "is-inverted"', () => {
		expect(checkClassName('is-inverted')).toEqual(true);
	});

	it('Should has size class "is-outlined"', () => {
		expect(checkClassName('is-outlined')).toEqual(true);
	});

	it('Should has size class "is-hovered"', () => {
		expect(checkClassName('is-hovered')).toEqual(true);
	});

	it('Should has size class "is-focused"', () => {
		expect(checkClassName('is-focused')).toEqual(true);
	});

	it('Should has size class "is-active"', () => {
		expect(checkClassName('is-active')).toEqual(true);
	});

	it('Should has size class "is-loading"', () => {
		expect(checkClassName('is-loading')).toEqual(true);
	});

	it('Should include an icon', () => {
		const renderer = new ReactShallowRenderer();

		renderer.render(
			<AppButton
				text="test"
				action={() => false}
				size="small"
				state="primary"
				iconSize="small"
				iconClass="italic"
			/>
		);

		const actual = renderer.getRenderOutput();

		const expected = (
			<span className="icon is-small">
				<i className="fa fa-italic"></i>
			</span>
		);

		expect(actual).toIncludeJSX(expected);
	});
});
