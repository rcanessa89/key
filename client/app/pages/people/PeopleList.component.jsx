import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Collapse from '../../components/collapse/Collapse.component';
import peopleService from './people.service';

const propTypes = {
	search: PropTypes.string.isRequired,
	currentOption: PropTypes.string.isRequired,
	registries: PropTypes.arrayOf(PropTypes.shape({
		check_in: PropTypes.string.isRequired,
		check_out: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
		department: PropTypes.string.isRequired,
		document_id: PropTypes.string.isRequired,
		host: PropTypes.string.isRequired,
		last_name_1: PropTypes.string.isRequired,
		last_name_2: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		sign: PropTypes.string.isRequired,
		_id: PropTypes.string.isRequired,
	})).isRequired,
};

const stateMap = state => ({
	registries: state.peoplePage.registries.docs,
	search: state.peoplePage.filter.search,
	currentOption: state.peoplePage.filter.currentOption,
});

const PeopleList = (props) => {
	const search = props.search.toLowerCase();
	const currentOption = props.currentOption;
	const filterOptions = peopleService.filterOptions;

	const getpeopleCards = () => props.registries.map((registry) => {
		const label = <p>{registry.name} {registry.last_name_1} {registry.last_name_2} - {registry.document_id}</p>;
		const company = registry.company ? <p><span>Company:</span> {registry.company}</p> : null;

		if (registry.name.toLowerCase().indexOf(search) === -1 &&
			registry.last_name_1.toLowerCase().indexOf(search) === -1 &&
			registry.last_name_2.toLowerCase().indexOf(search) === -1 &&
			registry.document_id.toString().toLowerCase().indexOf(search) === -1) {
			return null;
		}

		if (currentOption === filterOptions.open && registry.check_out) {
			return null;
		}

		if (currentOption === filterOptions.closed && !registry.check_out) {
			return null;
		}

		return (
			<Collapse
				key={registry._id}
				label={label}
			>
				<div className="people-registry-content">
					<div className="col">
						<p><span>Department:</span> {registry.department}</p>
						<p><span>Check In:</span> {registry.check_in}</p>
						<p><span>Date:</span> {registry.date}</p>
					</div>
					<div className="col">
						<p><span>Host:</span> {registry.host}</p>
						<p><span>Check Out:</span> {registry.check_out}</p>
						{company}
					</div>
				</div>
				<div className="people-registry-sign-container">
					<img src={registry.sign} alt="sign" />
				</div>
			</Collapse>
		);
	});

	return (
		<div className="people-list">
			{getpeopleCards()}
		</div>
	);
};

PeopleList.propTypes = propTypes;

export default connect(stateMap)(PeopleList);
