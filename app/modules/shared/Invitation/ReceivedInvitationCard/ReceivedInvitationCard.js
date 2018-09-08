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

// Borrar luego de que obtengamos la info de backend
import { getEvent } from '../backendInfoTmp';
import * as api from '../../../myInvitations/api';

class ReceivedInvitationCard extends Component {

    state = {
        isLoadingUser: true,
        user: null,
        isLoadingContextAction: true,
        contextAction: null,
        isLoadingEvent: true,
        event: null
    }

    componentDidMount() {
        const { item } = this.props;

        api.getUserById(item.ownerId, function (success, data, error) {
            if (success) this.setState({ isLoadingUser: false, user: data });
            else if (error) errorCB(error);
        }.bind(this));

        if (item.contextActionId) {
            api.getContextActionById(item.contextActionId, function (success, data, error) {
                if (success) this.setState({ isLoadingContextAction: false, contextAction: data });
                else if (error) errorCB(error);
            }.bind(this));
        }

        if (item.eventId) {
            api.getEventById(item.eventId, function (success, data, error) {
                if (success) this.setState({ isLoadingEvent: false, event: data });
                else if (error) { console.log(error); errorCB(error) };
            }.bind(this));
        }
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
        const { contextActionId, eventId, description } = item;
        if (eventId) {
            if (this.state.isLoadingEvent) {
                return <View style={styles.descriptionContainerStyle} />
            } else {
                const event = this.state.event;
                return (
                    <View style={styles.descriptionContainerStyle}>
                        <EventCardCreateInvitation eventInvitation={event} onPressViewEvent={this.onPressViewEvent}/>
                        <Text style={styles.descriptionWithEventStyle}>{description}</Text>
                    </View>
                );
            }
        } else if (contextActionId) {
            const contextAction = (this.state.isLoadingContextAction) ? { "title": '', "icon": null, "type": null, "image": 'default' } : this.state.contextAction;
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

    onPressViewEvent = (item) => {
        this.props.onPressViewEvent(item);
    };

    render() {
        const { item } = this.props;

        return (
            <View>
                <View style={styles.container}>
                    <UserPhotoSection userAvatar={(this.state.isLoadingUser) ? 'default' : this.state.user.avatar} icon={receivedIcon} isPublic={false} />
                    <View style={styles.invitationInfoSectionContainer}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={styles.userNameStyle}>{(this.state.isLoadingUser) ? '' : this.state.user.userName}</Text>
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

export default connect(null, {})(ReceivedInvitationCard);