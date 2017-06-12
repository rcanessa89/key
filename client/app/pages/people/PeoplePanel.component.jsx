import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import peopleService from './people.service';
import { setFilterOption, search, getPeopleRegistries } from './action-creators';
import AppButton from '../../components/app-button/AppButton.component';

const propTypes = {
	currentOption: PropTypes.string.isRequired,
	page: PropTypes.number.isRequired,
	pagesTotal: PropTypes.number.isRequired,
};

const stateMap = state => ({
	currentOption: state.peoplePage.filter.currentOption,
	page: state.peoplePage.registries.page,
	pagesTotal: state.peoplePage.registries.pages,
});

const dispatchMap = dispatch => ({
	dispatch: bindActionCreators({ setFilterOption, search, getPeopleRegistries }, dispatch),
});

const PeoplePanel = (props) => {
	const currentOption = props.currentOption;

	const getFilterOptionBlocks = () => {
		const blocks = [];
		const filterOptions = peopleService.filterOptions;

		Object.keys(filterOptions).forEach((key) => {
			if (Object.prototype.hasOwnProperty.call(filterOptions, key)) {
				const blockClassName = classnames({
					'panel-block': true,
					'is-active': currentOption === filterOptions[key],
				});

				const block = (
					<a
						key={key}
						onClick={() => props.dispatch.setFilterOption(filterOptions[key])}
						className={blockClassName}
					>
						{filterOptions[key]}
					</a>
				);

				blocks.push(block);
			}
		});

		return blocks;
	};

	const getRegistries = () => {
		const nextPage = props.page + 1;

		props.dispatch.getPeopleRegistries(nextPage);
	};

	const loadMore = props.page < props.pagesTotal ? (
		<div className="panel-block">
			<AppButton
				text="Load More Registries"
				state="primary"
				action={getRegistries}
				fullWidth
			/>
		</div>
	) : null;

	return (
		<nav className="panel">
			<div className="panel-block">
				<p className="control has-icons-left">
					<input
						className="input is-small"
						type="text" placeholder="Search a registry"
						onChange={event => props.dispatch.search(event.target.value)}
					/>
					<span className="icon is-small is-left"><i className="fa fa-search" /></span>
				</p>
			</div>
			{getFilterOptionBlocks()}
			{loadMore}
		</nav>
	);
};

PeoplePanel.propTypes = propTypes;

export default connect(stateMap, dispatchMap)(PeoplePanel);
