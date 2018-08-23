import React, { Component } from 'react';
import { ScrollView, View, Alert, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ContextActionList from '../../components/ContextActionList';
import EventCardCreateInvitation from '../../../shared/Event/EventCardCreateInvitation';
// import InvitationType from '../../components/InvitationType/InvitationType';
import DatePicker from '../../components/DatePicker/DatePicker';
import Quota from '../../components/Quota/Quota';
import Target from '../../components/Target';
import InvitedUsers from '../../components/InvitedUsers';
import { pimbayType, invitationType, contextActionSize } from '../../../shared/constants';

import { SaveButton } from '../../../../config/routesComponents/buttons';
import { connect } from 'react-redux';
import styles from './styles';

import { actions as createInvitation } from "../../index";
const { createNewInvitation } = createInvitation;

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
        invitedUsers: null,
        targetUsers: null,
        minAge: null,
        maxAge: null,
        invitedUsers: []
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
        Actions.refresh({ right: <SaveButton onPress={this.createInvitation} /> });
    }

    createInvitation = () => {
        const { 
            description, dueDate, 
            invitationType, targetUsers, 
            minAge, maxAge, invitedUsers, 
            contextActionSelected,
            eventInvitation } = this.state;
        if (!minAge || !maxAge) {
            Alert.alert('Edades', "No se ha definido el rango de edades.");
            return;
        }
        console.log(this.state);
        this.props.createNewInvitation({
            description,
            dueDate,
            invitationType,
            // gender: targetUsers,
            // minAge,
            // maxAge,
            ownerId: 'DDM2AobexaNzHbRyjuYk',
            contextActionId: contextActionSelected ? contextActionSelected.id : null,
            eventId: eventInvitation ? eventInvitation.id : null,
            invitedUsers: invitedUsers
        }, this.onSuccess, this.onError);
    }

    onSuccess(){
        Actions.pop();
    }

    onError(error){
        Alert.alert("Oops", error.message);
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

    onChangeInvitedUserList = (invitedUsers) => {
        this.setState({invitedUsers})
    }

    render() {
        const { type } = this.props;
        return (
            <ScrollView style={styles.container}>
                {this.renderType()}
                <DatePicker 
                    onChangeDueDate={this.onChangeDueDate}/>
                {/* <InvitationType 
                    onChangeInvitationType={this.onChangeInvitationType} /> */}
                <Target onChangeTargetUsers={this.onChangeTargetUsers} />
                <Quota 
                    onChangeQuota={this.onChangeQuota}/>
                {
                    !!(this.props.invitationType !== invitationType.OPEN) &&
                    <InvitedUsers 
                        onChangeInvitedUserList={this.onChangeInvitedUserList}/>
                }
                {
                    !!(type !== pimbayType.SIMPLE) &&
                    this.renderTextBox()
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