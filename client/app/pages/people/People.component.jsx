import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SectionHeader from '../../components/section-header/SectionHeader.component';
import AppButton from '../../components/app-button/AppButton.component';
import Modal from '../../components/modal/Modal.component';
import AppForm from '../../components/app-form/AppForm.component';
import TextInput from '../../components/app-form/TextInput.component';
import SelectInput from '../../components/app-form/SelectInput.component';
import ModalControl from '../../services/ModalControl';
import PeopleCard from './PeopleCard.component';

const PeoplePage = (props) => {
    return (
        <div className="users-page">
            <SectionHeader
				title="People"
				subtitle="Create, edit or delete the people registries"
				line
			/>
            <div className="users-page-main">
                <PeopleCard />
                <PeopleCard />
                <PeopleCard />
                <PeopleCard />
                <PeopleCard />
            </div>
        </div>
    );
};

export default PeoplePage;
