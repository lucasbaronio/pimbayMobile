import React, { Component } from 'react';
import { 
    ScrollView, View, Alert, TextInput, 
    ActivityIndicator, KeyboardAvoidingView, 
    Platform, SafeAreaView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ContextActionList from '../../components/ContextActionList';
import EventCardCreateInvitation from '../../../shared/Event/EventCardCreateInvitation';
import DatePicker from '../../components/DatePicker/DatePicker';
import RealizationDatePicker from '../../components/RealizationDatePicker/RealizationDatePicker';
import Quota from '../../components/Quota/Quota';
import Target from '../../components/Target';
import InvitedUsers from '../../components/InvitedUsers';

import { pimbayType, invitationType as invType, contextActionSize } from '../../../shared/constants';

import { connect } from 'react-redux';
import styles from './styles';
import { Button } from 'react-native-elements';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { actions as createInvitation } from "../../index";
const { createNewInvitation, cleanCreateInvitation } = createInvitation;

class CreateInvitation extends Component {

    state = {
        description: "",
        onFocusDescription: false,
        contextActionSelected: null,
        eventInvitation: null,
        invitationType: null,
        realizationDate: null,
        dueDate: null,
        quota: null,
        hasQuota: true,
        targetUsers: null,
        minAge: null,
        maxAge: null,
    }

    componentWillMount() {
        const { type, invitationType, item } = this.props;
        switch (type) {
            case pimbayType.CONTEXT_ACTION:
                this.setState({
                    contextActionSelected: item,
                    invitationType,
                    description: item.description
                });
                break;
            case pimbayType.EVENT:
                this.setState({
                    eventInvitation: item,
                    invitationType
                });
                break;
            case pimbayType.SIMPLE:
                this.setState({
                    invitationType
                });
                break;
        }
    }

    onPressViewEvent = (item) => {
        Actions.push("EventDetail", { props: this.props, item });
    }

    createInvitation = () => {
        const {
            description, dueDate,
            invitationType, targetUsers,
            minAge, maxAge, realizationDate,
            contextActionSelected,
            eventInvitation } = this.state;
        const { createNewInvitation, invitedUsers } = this.props;
        if (invitationType === invType.OPEN && (!minAge || !maxAge)) {
            Alert.alert('Edades', "No se ha definido el rango de edades.");
            return;
        }
        if (invitationType !== invType.OPEN && invitedUsers.length === 0) {
            Alert.alert('Usuarios invitados', "No se han elegido los usuarios invitados.");
            return;
        }
        const avatar = contextActionSelected
                        ? contextActionSelected.image
                        : eventInvitation
                            ? eventInvitation.image
                            : "";
        createNewInvitation({
            description,
            dueDate,
            realizationDate,
            invitationType,
            sex: targetUsers,
            minAge,
            maxAge,
            contextActionId: contextActionSelected ? contextActionSelected.id : null,
            eventId: eventInvitation ? eventInvitation.id : null,
            invitedUsers: this.getInvitedUsersIds()
        }, avatar, this.onSuccess, this.onError);
    }

    onSuccess() {
        Actions.pop();
    }

    onError(error) {
        Alert.alert("Oops", error.message);
    }

    getInvitedUsersIds = () => {
        const { invitedUsers } = this.props;
        var invitedUsersIds = [];
        for (var i = 0; i < invitedUsers.length; i++) {
            invitedUsersIds[i] = invitedUsers[i].id;
        }
        return invitedUsersIds;
    }

    renderType = () => {
        const { type } = this.props;
        switch (type) {
            case pimbayType.SIMPLE:
                return this.renderTextBox();
            case pimbayType.CONTEXT_ACTION:
                return this.renderContextActionList();
            case pimbayType.EVENT:
                return this.renderEventInvitation();
        }
    }

    renderTextBox = () => {
        return (
            <View style={styles.descriptionView}>
                <TextInput
                    style={[
                        styles.description,
                        !!this.state.onFocusDescription
                        && styles.descriptionFocused
                    ]}
                    onFocus={() => this.setState({ onFocusDescription: true })}
                    onEndEditing={() => this.setState({ onFocusDescription: false })}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(description) => this.setState({ description })}
                    editable={true}
                    value={this.state.description}
                    placeholder="Estoy para ..."
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                />
            </View>
        );
    }

    renderContextActionList = () => {
        const { contextActionSelected } = this.state;
        return (
            <ContextActionList
                size={contextActionSize.MEDIUM}
                selectable={true}
                selectedItem={contextActionSelected}
                onPressContextAction={this.onPressContextAction} />
        );
    }

    onPressContextAction = (item) => {
        this.setState({ contextActionSelected: item, description: item.description });
    }

    renderEventInvitation = () => {
        const { eventInvitation } = this.state;
        return (
            <EventCardCreateInvitation eventInvitation={eventInvitation} onPressViewEvent={this.onPressViewEvent} />
        );
    }

    onChangeTargetUsers = ({ target, minAge, maxAge }) => {
        this.setState({ targetUsers: target, minAge, maxAge });
    }

    onChangeDueDate = (dueDate) => {
        this.setState({ dueDate: dueDate });
    }

    onChangeRealizationDate = (realizationDate) => {
        this.setState({ realizationDate });
    }

    onChangeQuota = ({ quota, hasQuota }) => {
        this.setState({ quota, hasQuota })
    }

    render() {
        const { type, isLoading } = this.props;
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={(Platform.OS === 'ios') ? "padding" : null}
                keyboardVerticalOffset={Platform.select({ ios: 63 + getBottomSpace(), android: 500 })}
                enabled >
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView style={styles.container}>
                        {this.renderType()}
                        {
                            !!(type !== pimbayType.SIMPLE) &&
                            this.renderTextBox()
                        }
                        <RealizationDatePicker
                            eventDate={
                                this.props.type === pimbayType.EVENT
                                    ? this.state.eventInvitation.realizationDate
                                    : null
                            }
                            onChangeRealizationDate={this.onChangeRealizationDate} />
                        <DatePicker
                            eventDate={
                                this.props.type === pimbayType.EVENT
                                    ? this.state.eventInvitation.realizationDate
                                    : null
                            }
                            onChangeDueDate={this.onChangeDueDate} />
                        {
                            !!(this.props.invitationType === invType.OPEN) &&
                            <Target onChangeTargetUsers={this.onChangeTargetUsers} />
                        }
                        <Quota
                            onChangeQuota={this.onChangeQuota} />
                        {
                            !!(this.props.invitationType !== invType.OPEN) &&
                            <InvitedUsers
                                onChangeInvitedUserList={this.onChangeInvitedUserList} />
                        }
                    </ScrollView>
                    {
                        !!isLoading
                            ? <View style={styles.loadingCreateInvitation}>
                                <ActivityIndicator color="white" />
                            </View>
                            : <Button
                                raised
                                title="Crear Invitación"
                                borderRadius={4}
                                containerViewStyle={styles.createInvitationContainer}
                                buttonStyle={styles.createInvitationButton}
                                textStyle={styles.createInvitationText}
                                onPress={this.createInvitation} />
                    }
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
        invitedUsers: state.timelineReducer.invitedUsers,
        isLoading: state.timelineReducer.isLoadingCreateInvitation
    }
}

export default connect(mapStateToProps, {
    createNewInvitation,
    cleanCreateInvitation
})(CreateInvitation);