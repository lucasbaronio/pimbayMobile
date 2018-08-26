import React, { Component } from 'react';
import { View, Text, Image, Alert, TouchableWithoutFeedback } from 'react-native';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import styles, { fontSize } from "./styles";
import EventCardCreateInvitation from '../../../shared/Event/EventCardCreateInvitation';
import ContextAction from '../../ContextAction';
import { getDueTime, getInvSentTime } from "../../../shared/utils/date";
import UserPhotoSection from '../components/UserPhotoSection';
import { contextActionSize } from '../../constants';

import sentIcon from '../../../../assets/icons/sentIcon.png';
import timePassing from '../../../../assets/icons/time-passing.png';
import letterX from '../../../../assets/icons/letter-x.png';
import rightArrow from '../../../../assets/icons/right-arrow.png';
import dividerOpenInvitation from '../../../../assets/dividerOpenInvitation.png';
import publicEarth from '../../../../assets/icons/earthColor.png';

// Borrar luego de que obtengamos la info de backend
import { getContextAction, getEvent } from '../backendInfoTmp';
import * as api from '../../../myInvitations/api';

class SentInvitationCard extends Component {

    state = {
        isLoadingUser: true,
        user: null
    }

    componentDidMount() {
        const { item } = this.props;
        let userId;
        (item.invitationType == 'OPEN') ? userId = item.ownerId : userId = item.invitedUsers[0]  //TODO multiple users, now it render only the first user in the list

        api.getUserById(userId, function (success, data, error) {
            if (success) this.setState({ isLoadingUser: false, user: data });
            else if (error) errorCB(error);
        }.bind(this));
    }

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
                <Text style={styles.createdTimeStyle}>{getInvSentTime(item.dateCreated)}</Text>
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
                <Text style={styles.createdTimeStyle}>{getInvSentTime(item.dateCreated)}</Text>
            </View>);
    }

    renderDescriptionInformation = (item) => {
        const { contextActionId, eventId, description } = item;
        if (eventId) {
            const event = getEvent(eventId);
            return (
                <View style={styles.descriptionContainerStyle}>
                    <EventCardCreateInvitation eventInvitation={event} />
                    <Text style={styles.descriptionWithEventStyle}>{description}</Text>
                </View>
            );
        } else if (contextActionId) {
            const contextAction = getContextAction(contextActionId);
            return (
                <View style={styles.descriptionWithContextContainerStyle}>
                    <ContextAction
                        item={contextAction}
                        size={contextActionSize.SMALL}
                        selectable={false} />
                    <View style={{ flex: 2 }}>
                        <Text style={styles.descriptionWithContextStyle}>{description}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.descriptionContainerStyle}>
                    <Text style={styles.descriptionStyle}>{description}</Text>
                </View>
            );
        }
    }

    renderUserPhotoSection = (item) => {
        const isOpen = (item.invitationType == 'OPEN');
        return <UserPhotoSection
            userAvatar={(this.state.isLoadingUser) ? 'default' : this.state.user.avatar}
            icon={(isOpen) ? publicEarth : sentIcon}
        />
    }

    renderUserNameIfDirected = (item) => {
        if (item.invitationType == 'OPEN') {
            return <Text style={styles.userNameStyle}>Invitación abierta</Text>
        } else {
            return <Text style={styles.userNameStyle}>{(this.state.isLoadingUser) ? '' : this.state.user.userName}</Text>
        }
    }

    renderGoToChatButton = (item) => {
        if (item.invitationType != 'OPEN') {
            return (
                <TouchableWithoutFeedback onPress={() => { Alert.alert('Ir al chat'); }}>
                    <View style={styles.buttonViewChat}>
                        <Text style={[styles.button, { marginRight: 10 }]}>IR AL CHAT</Text>
                        <Image source={rightArrow} style={{ height: 10, width: 10 }} />
                    </View>
                </TouchableWithoutFeedback>
            );
        }
    }

    render() {
        const { item } = this.props;

        return (
            <View>
                <View style={styles.container}>
                    {this.renderUserPhotoSection(item)}
                    <View style={styles.invitationInfoSectionContainer}>
                        <View style={{ justifyContent: 'center' }}>
                            {this.renderUserNameIfDirected(item)}
                            {this.renderDetailsInformation(item)}
                            {this.renderDescriptionInformation(item)}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                                <TouchableWithoutFeedback onPress={() => { Alert.alert('Finalizar'); }}>
                                    <View style={styles.buttonViewFinalize}>
                                        <Image source={letterX} style={{ height: 10, width: 10 }} />
                                        <Text style={[styles.button, { marginLeft: 10 }]}>FINALIZAR</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                {this.renderGoToChatButton(item)}
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

export default connect(null, {})(SentInvitationCard);