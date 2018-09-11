import React, { Component } from 'react';
import { View, Text, Image, Alert, TouchableWithoutFeedback } from 'react-native';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import styles, { fontSize } from "./styles";
import EventCardCreateInvitation from '../../../shared/Event/EventCardCreateInvitation';
import ContextAction from '../../ContextAction';
import { getDueTime, getInvReceivedTime } from "../../../shared/utils/date";
import UserPhotoSection from '../components/UserPhotoSection';
import { contextActionSize } from '../../constants';

import receivedIcon from '../../../../assets/icons/ReceivedIcon.png';
import timePassing from '../../../../assets/icons/time-passing.png';
import letterX from '../../../../assets/icons/letter-x.png';
import rightArrow from '../../../../assets/icons/right-arrow.png';
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
                <Text style={styles.createdTimeStyle}>{getInvReceivedTime(item.dateCreated)}</Text>
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
                    <EventCardCreateInvitation eventInvitation={event} onPressViewEvent={this.onPressViewEvent}/>
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
    };

    render() {
        const { item, owner } = this.props;

        return (
            <View>
                <View style={styles.container}>
                    <UserPhotoSection 
                        userAvatar={owner.avatar} 
                        icon={receivedIcon} isPublic={false} />
                    <View style={styles.invitationInfoSectionContainer}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={styles.userNameStyle}>
                                {owner.userName}
                                </Text>
                            {this.renderDetailsInformation(item)}
                            {this.renderDescriptionInformation(item)}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                                <TouchableWithoutFeedback onPress={() => { Alert.alert('Rechazar'); }}>
                                    <View style={styles.buttonViewFinalizar}>
                                        <Image source={letterX} style={{ height: 10, width: 10 }} />
                                        <Text style={[styles.button, { marginLeft: 10 }]}>RECHAZAR</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { Alert.alert('Estoy'); }}>
                                    <View style={styles.buttonViewChat}>
                                        <Text style={[styles.button, { marginRight: 10 }]}>ESTOY</Text>
                                        <Image source={rightArrow} style={{ height: 10, width: 10 }} />
                                    </View>
                                </TouchableWithoutFeedback>
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

export default connect(mapStateToProps, { })(ReceivedInvitationCard);