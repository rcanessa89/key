// React.
import React from 'react';
import { Text, TouchableHighlight, TextInput, View, TouchableOpacity, Modal } from 'react-native';
// Dev.
import Spinner from 'react-native-loading-spinner-overlay';
// API.
import DocumentIdService from '../services/DocumentIdService';
// Styles.
import { DocumentSearchStyles as styles } from '../styles';
// Components.
import BackgroundImage from './backgroundImage';
import ConfirmIdentityModal from './confirmIdentityModal';
import Button from './button';

class DocumentSearch extends React.PureComponent {
    constructor() {
        super();
        
        this.searchBar = null;

        this.state = {
            documentId : '',
            person : {},
            maxLength : 9,
        }
    }

    getPersonalInformation(documentId) {
        const person = {
            name       : 'Jorge Daniel',
            lastname_1 : 'Valverde',
            lastname_2 : 'Matarrita',
        }; // DocumentIdService.searchByDocumentId(documentId);

        return { 
            name : person.name+' '+person.lastname_1+' '+person.lastname_2,
            id   : documentId
        };
    }

    resetInput () {
        this.setState({ person : {} });
        this.searchBar.clear();
    }

    validateSearchBar (text) {
        const documentId = text.replace(/\D/g,'').trim();
        this.setState({ documentId });
        this.validateModalVisibility(documentId);
    }

    validateModalVisibility (documentId) {
        if (documentId.length === this.state.maxLength) {
            let person = this.getPersonalInformation(documentId);
            this.searchBar.blur();
            this.setState({ person : person });
        }
    }

    processAnswer (answer) {

        switch (answer) {
            case 'YES' :
                this.resetInput();
                this.props.onPersonalInformationGathered();
                break;
            case 'NO' : 
            default :
                this.resetInput();
                break;
        }

    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <TouchableOpacity onPress={this.resetInput.bind(this)}>
                    <TextInput 
                        placeholder="Identification Card #"
                        style={styles.searchBar}
                        keyboardType="numeric"
                        placeholderTextColor={styles.searchBar.color}
                        keyboardAppearance="dark"
                        maxLength={this.state.maxLength}
                        ref={ (input) => { this.searchBar = input } }
                        value={this.state.documentId}
                        onChangeText={this.validateSearchBar.bind(this)}
                    />
                </TouchableOpacity>
                <ConfirmIdentityModal
                    visible={ (Object.keys(this.state.person).length > 0) }
                    person={this.state.person}
                    processAnswer={this.processAnswer.bind(this)}
                />
            </View>
        );
    }
}

export default DocumentSearch;