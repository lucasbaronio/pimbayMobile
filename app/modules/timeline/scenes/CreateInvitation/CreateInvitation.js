import React, { Component } from 'react';
import { ScrollView, View, Alert, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ContextActionList from '../../components/ContextActionList';
import EventCardCreateInvitation from '../../../shared/Event/EventCardCreateInvitation';
import DatePicker from '../../components/DatePicker/DatePicker';
import RealizationDatePicker from '../../components/RealizationDatePicker/RealizationDatePicker';
import Quota from '../../components/Quota/Quota';
import Target from '../../components/Target';
import InvitedUsers from '../../components/InvitedUsers';
import { pimbayType, invitationType as invType, contextActionSize } from '../../../shared/constants';

import { CloseButtonOnPress} from '../../../../config/routesComponents/buttons';
import { connect } from 'react-redux';
import styles from './styles';
import { Button } from 'react-native-elements';

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
        Actions.refresh({ 
            title: invitationType === invType.OPEN 
                    ? "Invitación Abierta"
                    : "Invitación Dirigida",
            left: <CloseButtonOnPress onPress={this.cleanCreateInvitation} />,
        });
        switch (type) {
            case pimbayType.CONTEXT_ACTION:
                this.setState({
                    contextActionSelected: item,
                    invitationType
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

    cleanCreateInvitation = () => {
        this.props.cleanCreateInvitation();
        Actions.pop();
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
        createNewInvitation({
            description,
            dueDate,
            realizationDate,
            invitationType,
            sex: targetUsers,
            minAge,
            maxAge,
            ownerId: '7idtcB9R1KNmaPTCfN9y',
            contextActionId: contextActionSelected ? contextActionSelected.id : null,
            eventId: eventInvitation ? eventInvitation.id : null,
            invitedUsers: this.getInvitedUsersIds()
        }, this.onSuccess, this.onError);
    }

    onSuccess(){
        Actions.pop();
    }

    onError(error){
        Alert.alert("Oops", error.message);
    }

    getInvitedUsersIds = () => {
        const { invitedUsers } = this.props;
        var invitedUsersIds = [];
        for(var i = 0; i < invitedUsers.length; i++) {
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
                    placeholder = "Estoy para ..."
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
                onPressContextAction={this.onPressContextAction}/>
        );
    }

    onPressContextAction = (item) => {
        this.setState({contextActionSelected: item});
    }

    renderEventInvitation = () => {
        const { eventInvitation } = this.state;
        return (
            <EventCardCreateInvitation eventInvitation={eventInvitation}/>
        );
    }

    onChangeTargetUsers = ({target, minAge, maxAge}) => {
        this.setState({targetUsers: target, minAge, maxAge});
    }

    onChangeDueDate = (dueDate) => {
        this.setState({dueDate: dueDate});
    }

    onChangeRealizationDate = (realizationDate) => {
        this.setState({ realizationDate });
    }

    onChangeQuota = ({quota, hasQuota}) => {
        this.setState({quota, hasQuota})
    }

    render() {
        const { type, isLoading } = this.props;
        return (
            <View style={{flex: 1}}>
                <ScrollView style={styles.container}>
                    <KeyboardAvoidingView 
                        behavior= {(Platform.OS === 'ios')? "padding" : null} 
                        keyboardVerticalOffset={Platform.select({ios: 84, android: 500})}
                        enabled >

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
                            onChangeRealizationDate={this.onChangeRealizationDate}/>
                        <DatePicker 
                            eventDate={
                                this.props.type === pimbayType.EVENT 
                                    ? this.state.eventInvitation.realizationDate
                                    : null
                            }
                            onChangeDueDate={this.onChangeDueDate}/>
                        {
                            !!(this.props.invitationType === invType.OPEN) &&
                            <Target onChangeTargetUsers={this.onChangeTargetUsers} />
                        }
                        <Quota 
                            onChangeQuota={this.onChangeQuota}/>
                        {
                            !!(this.props.invitationType !== invType.OPEN) &&
                            <InvitedUsers 
                                onChangeInvitedUserList={this.onChangeInvitedUserList}/>
                        }
                    </KeyboardAvoidingView>
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
                        onPress={this.createInvitation}/>
                }
            </View>
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