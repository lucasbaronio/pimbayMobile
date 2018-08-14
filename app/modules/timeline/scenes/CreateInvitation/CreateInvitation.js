import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput } from 'react-native';

import ContextActionList from '../../components/ContextActionList';
import EventCardCreateInvitation from '../../../shared/Event/EventCardCreateInvitation';
import TypeInvitation from '../../components/TypeInvitation/TypeInvitation';
import DatePicker from '../../components/DatePicker/DatePicker';
import Quota from '../../components/Quota/Quota';
import InvitedUsers from '../../components/InvitedUsers';

import { connect } from 'react-redux';
import styles from './styles';

import { actions as createInvitation } from "../../index";
const { createNewInvitation } = createInvitation;

class CreateInvitation extends Component {
    state = {
        description: "",
        placeholderDescription: "Que estas para hacer hoy?",
        onFocusDescription: false,
        contextActionSelected: null,
        eventInvitation: null,
        openInvitation: null,
        typeInvitation: null,
        dueDate: null,
        quota: null,
        hasQuota: true,
        invitedUsers: null,
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

    onChangeTypeInvitation = ({typeInvitationSelected}) => {
        this.setState({typeInvitation: typeInvitationSelected});
    }

    onChangeDueDate = (dueDate) => {
        this.setState({dueDate: dueDate});
    }

    onChangeQuota = ({quota, hasQuota}) => {
        this.setState({quota, hasQuota})
    }

    onChangeInvitedUserList = (invitedUsers) => {
        this.setState({invitedUsers})
    }

    render() {

        return (
            <ScrollView style={styles.container}>
                <View style={styles.descriptionView}>
                    <TextInput
                        style = {[
                            styles.description, 
                            !!this.state.onFocusDescription 
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
                <DatePicker 
                    onChangeDueDate={this.onChangeDueDate}/>
                <TypeInvitation 
                    onChangeTypeInvitation={this.onChangeTypeInvitation} />
                {
                    this.state.typeInvitation !== "OPEN_INVITATION" &&
                    <Quota 
                        onChangeQuota={this.onChangeQuota}/>
                }
                {
                    this.state.typeInvitation !== "OPEN_INVITATION" &&
                    <InvitedUsers 
                        onChangeInvitedUserList={this.onChangeInvitedUserList}/>
                }
            </ScrollView>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, { createNewInvitation })(CreateInvitation);