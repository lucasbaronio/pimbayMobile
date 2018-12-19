import React, { Component } from 'react';
import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import EventCardCreateInvitation from '../../../shared/Event/EventCardCreateInvitation';
import ContextAction from '../../ContextAction';
import GoToChatButton from '../components/GoToChatButton';
// import UserPhotoSection from '../components/UserPhotoSection';

import { contextActionSize, invitationType as invType } from '../../constants';
import { getDueTime, getInvSentTime } from "../../../shared/utils/date";
import styles from "./styles";

import sentIcon from '../../../../assets/icons/sentIcon.png';
import timePassing from '../../../../assets/icons/time-passing.png';
import letterX from '../../../../assets/icons/letter-x.png';
// import rightArrow from '../../../../assets/icons/right-arrow.png';
import dividerOpenInvitation from '../../../../assets/dividerOpenInvitation.png';
import publicEarth from '../../../../assets/icons/earthColor.png';

import { actions as myInvitations } from "../../../myInvitations/index";
const { getUserById, getConfirmedUsers, getRejectedUsers } = myInvitations;
import { actions as chatActions } from "../../../chats/index";
const { getChatDetail } = chatActions;

import { isInvitationExpired } from '../../utils/date';

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
        // const { firstUserInvited } = this.props;
        return (
            (item.invitationType === invType.DIRECTED)
            // ? <UserPhotoSection
            //     userId={firstUserInvited.id}
            //     userAvatar={firstUserInvited ? firstUserInvited.avatar : null}
            //     fullName={firstUserInvited ? firstUserInvited.fullName : ""}
            //     icon={sentIcon}
            // />
            ? <View style={{flex: 1, alignItems: 'center', marginTop: 20, margin: 10}}>
                <Image 
                source={sentIcon} 
                style={{ height: 50, width: 50 }} />
            </View>
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

    // renderGoToChatButton = () => {
    //     return (
    //         <TouchableOpacity 
    //             style={styles.buttonViewChat}
    //             onPress={() => { this.onPressChat() }}>
    //                 <Text style={[styles.button, { marginRight: 10 }]}>IR AL CHAT</Text>
    //                 <Image source={rightArrow} style={{ height: 10, width: 10 }} />
    //         </TouchableOpacity>
    //     );
    // }

    renderFinalizeButton = () => {
        return (
            <TouchableOpacity onPress={() => { Alert.alert('Finalizar'); }}>
                <View style={styles.buttonViewFinalize}>
                    <Image source={letterX} style={{ height: 10, width: 10 }} />
                    <Text style={[styles.button, { marginLeft: 10 }]}>FINALIZAR</Text>
                </View>
            </TouchableOpacity>
        );
    }

    // onPressChat = () => {
    //     const { item, getChatDetail } = this.props;
    //     getChatDetail(item.chatId, ({ group_channel }) => {
    //         Actions.push("ChatMessenger", { chat: group_channel });
    //     }, this.onError);
    // }

    onError(error) {
        Alert.alert("Oops", error.message);
    }

    onPressViewEvent = (item) => {
        this.props.onPressViewEvent(item);
    };

    onPressViewInvitation = () => {
        if (Actions.currentScene !== 'InvitationDetails') {
            const { item, getConfirmedUsers, getRejectedUsers } = this.props;
            getRejectedUsers({ rejectedUsers: item.rejectedUsers }, this.onError);
            getConfirmedUsers({ confirmedUsers: item.confirmedUsers }, () => {
                Actions.push("InvitationDetails", { invitation: item });
            }, this.onError);
        }
    }

    render() {
        const { item } = this.props;

        return (
            <View>
                <TouchableOpacity
                    onPress={this.onPressViewInvitation} 
                    activeOpacity={0.9} 
                    style={styles.container} >
                {/* <View style={styles.container}> */}
                    {this.renderUserPhotoSection(item)}
                    <View style={styles.invitationInfoSectionContainer}>
                        <View style={{ justifyContent: 'center' }}>
                            {this.renderUserNameIfDirected(item)}
                            {this.renderDetailsInformation(item)}
                            {this.renderDescriptionInformation(item)}
                            {
                                !isInvitationExpired(item.realizationDate) &&
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                                    {this.renderFinalizeButton(item)}
                                    {/* {this.renderGoToChatButton(item)} */}
                                    <GoToChatButton 
                                        chatId={item.chatId}
                                        buttonViewChatStyle={styles.buttonViewChat}/>
                                </View>
                            }
                        </View>
                    </View>
                {/* </View> */}
                </TouchableOpacity>
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
        // firstUserInvited: item.invitationType === invType.DIRECTED
        //     ? state.invitationsReducer.users.filter(user => user.id === item.invitedUsers[0])[0]
        //     : null,
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
    getUserById, 
    getChatDetail,
    getConfirmedUsers,
    getRejectedUsers,
})(SentInvitationCard);