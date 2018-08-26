import React, { Component } from 'react';
import { ScrollView, View, Alert, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ContextActionList from '../../components/ContextActionList';
import EventCardCreateInvitation from '../../../shared/Event/EventCardCreateInvitation';
// import InvitationType from '../../components/InvitationType/InvitationType';
import DatePicker from '../../components/DatePicker/DatePicker';
import Quota from '../../components/Quota/Quota';
import Target from '../../components/Target';
import InvitedUsers from '../../components/InvitedUsers';
import { pimbayType, invitationType as invType, contextActionSize } from '../../../shared/constants';

import { SaveButton, CloseButtonOnPress} from '../../../../config/routesComponents/buttons';
import { connect } from 'react-redux';
import styles from './styles';

import { actions as createInvitation } from "../../index";
const { createNewInvitation, cleanCreateInvitation } = createInvitation;

class CreateInvitation extends Component {

    state = {
        description: "",
        onFocusDescription: false,
        contextActionSelected: null,
        eventInvitation: null,
        invitationType: null,
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
        Actions.refresh({ 
            right: <SaveButton onPress={this.createInvitation} />,
            left: <CloseButtonOnPress onPress={this.cleanCreateInvitation} />,
        });
    }

    cleanCreateInvitation = () => {
        this.props.cleanCreateInvitation();
        Actions.pop();
    }

    createInvitation = () => {
        Actions.refresh({ 
            right: 
                <View style={{flex: 1, marginRight: 15}}>
                    <ActivityIndicator />
                </View> 
        });
        const { 
            description, dueDate, 
            invitationType, targetUsers, 
            minAge, maxAge, 
            contextActionSelected,
            eventInvitation } = this.state;
        const { createNewInvitation, invitedUsers } = this.props;
        console.log(invitationType);
        if (invitationType === invType.OPEN && (!minAge || !maxAge)) {
            Actions.refresh({ right: <SaveButton onPress={this.createInvitation} /> });
            Alert.alert('Edades', "No se ha definido el rango de edades.");
            return;
        }
        if (invitationType !== invType.OPEN && invitedUsers.length === 0) {
            Actions.refresh({ right: <SaveButton onPress={this.createInvitation} /> });
            Alert.alert('Usuarios invitados', "No se han elegido los usuarios invitados.");
            return;
        } 
        createNewInvitation({
            description,
            dueDate,
            invitationType,
            sex: targetUsers,
            minAge,
            maxAge,
            ownerId: 'DDM2AobexaNzHbRyjuYk',
            contextActionId: contextActionSelected ? contextActionSelected.id : null,
            eventId: eventInvitation ? eventInvitation.id : null,
            invitedUsers: this.getInvitedUsersIds()
        }, this.onSuccess, this.onError);
    }

    onSuccess(){
        Actions.refresh({ right: <SaveButton onPress={this.createInvitation} /> });
        Actions.pop();
    }

    onError(error){
        Actions.refresh({ right: <SaveButton onPress={this.createInvitation} /> });
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
            <View style={styles.eventContainer}>
                <EventCardCreateInvitation eventInvitation={eventInvitation}/>
            </View>
        );
    }

    // onChangeInvitationType = ({invitationTypeSelected}) => {
    //     this.setState({invitationType: invitationTypeSelected});
    // }

    onChangeTargetUsers = ({target, minAge, maxAge}) => {
        this.setState({targetUsers: target, minAge, maxAge});
    }

    onChangeDueDate = (dueDate) => {
        this.setState({dueDate: dueDate});
    }

    onChangeQuota = ({quota, hasQuota}) => {
        this.setState({quota, hasQuota})
    }

    render() {
        const { type } = this.props;
        return (
            <ScrollView >
                <KeyboardAvoidingView 
                    behavior= {(Platform.OS === 'ios')? "position" : null} 
                    keyboardVerticalOffset={Platform.select({ios: 84, android: 500})}
                    style={styles.container} enabled >

                    {this.renderType()}
                    <DatePicker 
                        onChangeDueDate={this.onChangeDueDate}/>
                    {/* <InvitationType 
                        onChangeInvitationType={this.onChangeInvitationType} /> */}
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
                    {
                        !!(type !== pimbayType.SIMPLE) &&
                        this.renderTextBox()
                    }
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
        invitedUsers: state.timelineReducer.invitedUsers
    }
}

export default connect(mapStateToProps, { 
    createNewInvitation, 
    cleanCreateInvitation 
})(CreateInvitation);