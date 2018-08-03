import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, DatePickerIOS, Platform } from 'react-native';
import { SearchBar, Header } from 'react-native-elements';

import ContextActionList from '../../components/ContextActionList';
import EventCardCreateInvitation from '../../../shared/EventCardInvitation/EventCardCreateInvitation';
import DatePicker from '../../components/DatePicker/DatePicker';

import { connect } from 'react-redux';
import styles from './styles';
import Quota from '../../components/Quota/Quota';

class CreateInvitation extends Component {
    state = {
        description: "",
        placeholderDescription: "Que estas para hacer hoy?",
        onFocusDescription: false,
        contextActionSelected: null,
        eventInvitation: null,
        openInvitation: null,
        dueDate: null,
        quota: null,
        hasQuota: true,
    }

    componentWillMount() {
        const { type } = this.props;
        switch (type) {
            case 'OPEN_INVITATION':
                const { openInvitation } = this.props;
                this.setState({openInvitation: openInvitation});
            break;
            case 'CONTEXT_ACTION':
                const { contextAction } = this.props;
                this.setState({contextActionSelected: contextAction});
            break;
            case 'EVENT_INVITATION':
                const { eventInvitation } = this.props;
                this.setState({
                    eventInvitation: eventInvitation, 
                    placeholderDescription: "Comentario"
                });
            break;
        }
    }

    renderType = () => {
        const { type } = this.props;
        switch (type) {
            case 'OPEN_INVITATION':
                return this.renderOpenInvitation();
            case 'CONTEXT_ACTION':
                return this.renderContextActionList();
            case 'EVENT_INVITATION':
                return this.renderEventInvitation();
        }
    }

    renderContextActionList = () => {
        const { contextActionSelected } = this.state;
        return (
            <ContextActionList 
                timeline={false}
                selectedItem={contextActionSelected}
                onPressContextAction={this.onPressContextAction}/>
        );
    }

    onPressContextAction = (item) => {
        this.setState({contextActionSelected: item});
    }

    renderEventInvitation = () => {
        const { eventInvitation } = this.props;
        return (
            <EventCardCreateInvitation eventInvitation={eventInvitation}/>
        );
    }

    renderOpenInvitation = () => {
        const { id, type, categories, userId, userName, userPhoto, description, date, dueDate } = this.props.openInvitation;
        return (
            <View>
                <Text>{id}</Text>
                <Text>{type}</Text>
                <Text>{categories}</Text>
                <Text>{userId}</Text>
                <Text>{userName}</Text>
                <Text>{userPhoto}</Text>
                <Text>{description}</Text>
                <Text>{date}</Text>
                <Text>{dueDate}</Text>
            </View>
        );
    }

    renderDatePicker = () => {
        return (
            <DatePicker 
                onChangeDueDate={this.onChangeDueDate}/>
        );
    }

    onChangeDueDate = (dueDate) => {
        this.setState({dueDate: dueDate});
    }

    renderTypeInvitation = () => {
        return (
            <View>

            </View>
        );
    }

    renderQuota = () => {
        return (
            <Quota 
                onChangeQuota={this.onChangeQuota}/>
        );
    }

    onChangeQuota = ({quota, hasQuota}) => {
        this.setState({quota, hasQuota})
    }

    render() {

        return (
            <ScrollView style={styles.container}>
                <View style={styles.descriptionView}>
                    <TextInput
                        style = {[
                            styles.description, 
                            this.state.onFocusDescription 
                            && styles.descriptionFocused
                        ]}
                        onFocus = {() => this.setState({onFocusDescription: true})}
                        onEndEditing = {() => this.setState({onFocusDescription: false})}
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={(description) => this.setState({description})}
                        editable = {true}
                        placeholder = {this.state.placeholderDescription}
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                    />
                </View>
                {this.renderType()}
                {this.renderDatePicker()}
                {this.renderTypeInvitation()}
                {this.renderQuota()}
            </ScrollView>
        );
    }
}

export default connect(null, { })(CreateInvitation);