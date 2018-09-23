import React, { Component } from 'react';
import { View, Text, Image, Alert, TouchableWithoutFeedback } from 'react-native';
import { connect } from "react-redux";

import EventCardCreateInvitation from '../../../shared/Event/EventCardCreateInvitation';
import ContextAction from '../../ContextAction';
import UserPhotoSection from '../components/UserPhotoSection';

import { contextActionSize, invitationType as invType } from '../../constants';
import { getDueTime, getInvSentTime } from "../../../shared/utils/date";
import styles from "./styles";

import sentIcon from '../../../../assets/icons/sentIcon.png';
import timePassing from '../../../../assets/icons/time-passing.png';
import letterX from '../../../../assets/icons/letter-x.png';
import rightArrow from '../../../../assets/icons/right-arrow.png';
import dividerOpenInvitation from '../../../../assets/dividerOpenInvitation.png';
import publicEarth from '../../../../assets/icons/earthColor.png';

import { actions as myInvitations } from "../../../myInvitations/index";
const { getUserById } = myInvitations;

class SentInvitationCard extends Component {

    componentWillMount(){
        const { item } = this.props;

        if (item.invitationType === invType.DIRECTED)
            this.props.getUserById(item.invitedUsers[0], (error) => alert(error.message));
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
        const { event, contextAction } = this.props;
        if (event) {
            return (
                <View style={styles.descriptionContainerStyle}>
                    <EventCardCreateInvitation eventInvitation={event} onPressViewEvent={this.onPressViewEvent} />
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

    renderUserPhotoSection = (item) => {
        const { firstUserInvited } = this.props;
        return (
            (item.invitationType === invType.DIRECTED)
            ? <UserPhotoSection
                userAvatar={firstUserInvited ? firstUserInvited.avatar : ''}
                icon={sentIcon}
            />
            : <View style={{flex: 1, alignItems: 'center', marginTop: 20, margin: 10}}>
                <Image 
                source={publicEarth} 
                style={{ height: 50, width: 50 }} />
            </View>
        );
    }

    renderUserNameIfDirected = (item) => {
        return (
            <Text style={styles.userNameStyle}>
                { item.invitationType == 'OPEN' ? "Invitación abierta" : "Invitación dirigida" }
            </Text>
        )
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

    onPressViewEvent = (item) => {
        this.props.onPressViewEvent(item);
    };

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

function mapStateToProps(state, props) {
    const { item } = props;
    return {
        firstUserInvited: item.invitationType === invType.DIRECTED
            ? state.invitationsReducer.users.filter(user => user.id === item.invitedUsers[0])[0]
            : null,
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

export default connect(mapStateToProps, { getUserById })(SentInvitationCard);