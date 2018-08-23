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

// Borrar luego de que obtengamos la info de backend
import { getContextAction, getEvent, getUserInfo } from '../backendInfoTmp';

class SentInvitationCard extends Component {

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
                        selectable={false}/>
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

    render() {
        const { item } = this.props;
        const userInfo = getUserInfo(item.invitedUsers[0]);

        return (
            <View>
                <View style={styles.container}>
                    <UserPhotoSection userAvatar={userInfo.avatar} icon={sentIcon} />
                    <View style={styles.invitationInfoSectionContainer}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={styles.userNameStyle}>{userInfo.userName}</Text>
                            {this.renderDetailsInformation(item)}
                            {this.renderDescriptionInformation(item)}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                                <TouchableWithoutFeedback onPress={() => { Alert.alert('Finalizar'); }}>
                                    <View style={styles.buttonViewFinalize}>
                                        <Image source={letterX} style={{ height: 10, width: 10 }} />
                                        <Text style={[styles.button, { marginLeft: 10 }]}>FINALIZAR</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { Alert.alert('Ir al chat'); }}>
                                    <View style={styles.buttonViewChat}>
                                        <Text style={[styles.button, { marginRight: 10 }]}>IR AL CHAT</Text>
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

export default connect(null, {})(SentInvitationCard);