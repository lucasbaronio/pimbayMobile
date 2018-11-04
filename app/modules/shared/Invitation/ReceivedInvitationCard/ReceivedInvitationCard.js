import React, { Component } from 'react';
import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import styles, { color } from "./styles";
import EventCardCreateInvitation from '../../../shared/Event/EventCardCreateInvitation';
import ContextAction from '../../ContextAction';
import { getDueTime, getInvReceivedTime } from "../../../shared/utils/date";
import UserPhotoSection from '../components/UserPhotoSection';
import { contextActionSize } from '../../constants';

import { actions as invitationsActions } from "../../../myInvitations/index";
const { confirmInvitation, rejectInvitation } = invitationsActions;

import receivedIcon from '../../../../assets/icons/ReceivedIcon.png';
import timePassing from '../../../../assets/icons/time-passing.png';
import letterX from '../../../../assets/icons/letter-x.png';
import rightArrow from '../../../../assets/icons/right-arrow.png';
import tick from '../../../../assets/icons/tick.png';
import dividerOpenInvitation from '../../../../assets/dividerOpenInvitation.png';

class ReceivedInvitationCard extends Component {

    renderDetailsInformation = (item) => {
        if (item.dueDate == null) {
            return this.renderDetailsWithoutDueDate(item);
        } else {
            return this.renderDetailsWithDueDate(item)
        }
    }

    renderDetailsWithDueDate = (item) => {
        return (
            <View style={{ marginTop: 2, flexDirection: 'row' }}>
                <Text style={[styles.createdTimeStyle, { color: item.iAmOut ? color.white : color.grey}]}>
                    {getInvReceivedTime(item.dateCreated)}
                </Text>
                <Image
                    style={{ alignSelf: 'flex-start', height: 16, width: 16, marginLeft: 5 }}
                    resizeMode='center'
                    source={timePassing} />
                <Text style={styles.dueDateStyle}>
                    {getDueTime(item.dueDate)}
                </Text>
            </View>
        );
    }

    renderDetailsWithoutDueDate = (item) => {
        return (
            <View style={{ marginTop: 2, flexDirection: 'row' }}>
                <Text style={styles.createdTimeStyle}>{getInvReceivedTime(item.dateCreated)}</Text>
            </View>
        );
    }

    renderDescriptionInformation = (item) => {
        const { event, contextAction } = this.props;
        if (event) {
            return (
                <View style={styles.descriptionContainerStyle}>
                    <EventCardCreateInvitation 
                        backgroundColor={item.iAmOut ? color.grey : null}
                        eventInvitation={event} 
                        onPressViewEvent={this.onPressViewEvent}/>
                    <Text style={styles.descriptionWithEventStyle}>{item.description}</Text>
                </View>
            );
        } else if (contextAction) {
            return (
                <View style={styles.descriptionWithContextContainerStyle}>
                    <ContextAction
                        item={contextAction}
                        size={contextActionSize.SMALL}
                        selectable={false} />
                    <View style={{ flex: 2 }}>
                        <Text style={styles.descriptionWithContextStyle}>{item.description}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.descriptionContainerStyle}>
                    <Text style={styles.descriptionStyle}>{item.description}</Text>
                </View>
            );
        }
    }

    onPressViewEvent = (item) => {
        this.props.onPressViewEvent(item);
    }

    onPressConfirm = () => {
        const { item } = this.props;
        this.props.confirmInvitation(item.id, this.onError);
    }

    onPressReject = () => {
        const { item } = this.props;
        this.props.rejectInvitation(item.id, this.onError);
    }

    onError(error) {
        Alert.alert("Intente mas tarde", error.message);
    }

    onPressChat = () => {
        const { item } = this.props;
        Actions.push("Chats");
    }

    render() {
        const { item, owner } = this.props;

        return (
            <View>
                <View style={[styles.container, item.iAmOut && styles.iAmOutBackgroundColor]}>
                    <UserPhotoSection 
                        userAvatar={owner.avatar} 
                        fullName={owner.fullName}
                        icon={receivedIcon} isPublic={false} />
                    <View style={styles.invitationInfoSectionContainer}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={styles.userNameStyle}>
                                {owner.userName}
                            </Text>
                            {this.renderDetailsInformation(item)}
                            {this.renderDescriptionInformation(item)}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                                <TouchableOpacity onPress={this.onPressReject}>
                                    {
                                        !item.iAmOut &&
                                        <View style={styles.buttonViewReject}>
                                            <Image source={letterX} style={{ height: 10, width: 10 }} />
                                            <Text style={[styles.button, { marginLeft: 10 }]}>
                                                {item.iAmConfirmed ? "SALIR" : "RECHAZAR"}
                                            </Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity onPress={item.iAmConfirmed ? this.onPressChat : this.onPressConfirm}>
                                    <View style={styles.buttonViewConfirm}>
                                        <Text style={[styles.button, { marginRight: 10 }]}>
                                            {item.iAmConfirmed 
                                                ? "IR AL CHAT" 
                                                : item.iAmOut
                                                    ? "ME ARREPENTÍ, QUIERO IR!"
                                                    : "ESTOY"
                                            }
                                        </Text>
                                        <Image 
                                            source={item.iAmConfirmed ? rightArrow : tick} 
                                            style={{ height: 10, width: 10 }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Image
                        style={styles.dividerImageStyle}
                        resizeMode='center'
                        source={dividerOpenInvitation} />
                </View>
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    const { item } = props;
    return {
        owner: state.invitationsReducer.users.filter(user => user.id === item.ownerId)[0],
        contextAction: item.contextActionId
            ? state.invitationsReducer.contextActionsFromInvitations
                .filter(contextAction => contextAction.id === item.contextActionId)[0]
            : null,
        event: item.eventId
            ? state.invitationsReducer.eventsFromInvitations
                .filter(event => event.id === item.eventId)[0]
            : null,
    }
}

export default connect(mapStateToProps, { 
    confirmInvitation, 
    rejectInvitation 
})(ReceivedInvitationCard);