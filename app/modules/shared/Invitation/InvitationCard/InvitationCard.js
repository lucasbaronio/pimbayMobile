import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Button as ButtonElements, Avatar } from 'react-native-elements';
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import EventCardCreateInvitation from '../../../shared/Event/EventCardCreateInvitation';
import GoToChatButton from '../components/GoToChatButton';

import { getDueTime, getCreatedTime } from "../../../shared/utils/date";

import { actions as invitationsActions } from "../../../myInvitations/index";
const { confirmInvitation, getConfirmedUsers, getRejectedUsers } = invitationsActions;
import { actions as profileActions } from "../../../profile/index";
const { getUserData } = profileActions;

import styles, { fontSize, color } from "./styles";

import TimePassing from '../../../../assets/icons/time-passing.png';
import DividerOpenInvitation from '../../../../assets/dividerOpenInvitation.png';

class InvitationCard extends Component {

    onPressConfirm = () => {
        const { item, confirmInvitation } = this.props;
        confirmInvitation({ 
            invitationId: item.id, 
            chatId: item.chatId,
            isOpenInvitation: true
        }, this.onError);
    }

    goToCreateInvitation = (props) => {
        Actions.push("CreateInvitation", props);
    }

    onPressViewEvent = (item) => {
        this.props.onPressViewEvent(item);
    };

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
                <Text style={styles.createdTimeStyle}>{getCreatedTime(item.dateCreated)}</Text>
                <Image
                    style={{ alignSelf: 'flex-start', height: 16, width: 16, marginLeft: 5 }}
                    resizeMode='center'
                    source={TimePassing} />
                <Text style={styles.dueDateStyle}>
                    {getDueTime(item.dueDate)}
                </Text>
            </View>
        );
    }

    renderDetailsWithoutDueDate = () => {
        const { item } = this.props;
        return (
            <View style={{ marginTop: 2, flexDirection: 'row' }}>
                <Text style={styles.createdTimeStyle}>{getCreatedTime(item.dateCreated)}</Text>
            </View>);
    }

    renderUserInfoOnly = () => {
        const { owner } = this.props;
        var initials = "";
        if (owner.fullName) {
            initials = owner.fullName.match(/\b\w/g) || [];
            initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        }
        return (
            <TouchableOpacity style={styles.userInfoSectionContainer} onPress={this.onPressUserInfo}>
                <Avatar
                    rounded
                    large
                    title={(!owner.avatar) ? initials : null}
                    source={(owner.avatar) ? { uri: owner.avatar } : null}
                    containerStyle={{ marginTop: 20 }}
                />
                <Text style={styles.userNameStyle}>{owner && owner.userName}</Text>
            </TouchableOpacity>
        )
    }

    onPressUserInfo = () => {
        const { getUserData, owner } = this.props;
        getUserData(owner.id, this.onSuccess, this.onError);
    }

    onSuccess(isLoggedUser) {
        Actions.push("ProfileUser", { isNotLoggedUser: !isLoggedUser });
    }

    onError(error) {
        Alert.alert("Oops", error.message);
    }

    renderUserInfoSection = () => {
        const { contextAction } = this.props;
        
        if (!contextAction) {
            return this.renderUserInfoOnly();
        } else {
            return (
                <View style={styles.userInfoSectionContainer}>
                    {this.renderUserInfoOnly()}
                    <Avatar
                        small
                        rounded
                        source={ contextAction.image
                                    ? { uri: contextAction.image }
                                    : null
                        }
                        icon={
                                (contextAction.icon && contextAction.type)
                                    ? { name: contextAction.icon, type: contextAction.type }
                                    : null
                        }
                        overlayContainerStyle={styles.avatarBackground}
                        containerStyle={styles.avatarContainerStyle}
                    />
                    <Text style={styles.avatarTextStyle}>
                        {
                            contextAction.title
                        }
                    </Text>
                </View>
            );
        }
    }

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
        const { item, event, iAmConfirmed } = this.props;

        return (
            <View>
                <TouchableOpacity 
                    onPress={this.onPressViewInvitation} 
                    activeOpacity={0.9} 
                    style={styles.container} >
                {/* <View style={styles.container}> */}
                    {this.renderUserInfoSection()}
                    <View style={styles.invitationInfoSectionContainer}>
                        <View style={{ justifyContent: 'center' }}>
                            {
                                !!event &&
                                <EventCardCreateInvitation eventInvitation={event} onPressViewEvent={this.onPressViewEvent}/>
                            }
                            <View style={styles.descriptionContainerStyle}>
                                <Text style={styles.descriptionStyle}>{item.description}</Text>
                            </View>
                            {this.renderDetailsInformation(item)}
                            <View style={styles.buttonView}>
                                {
                                    !iAmConfirmed 
                                    ? <ButtonElements
                                            backgroundColor={color.orange}
                                            onPress={this.onPressConfirm}
                                            buttonStyle={styles.button}
                                            title='ESTOY'
                                            fontSize={fontSize.text4} />
                                    : <GoToChatButton 
                                            chatId={item.chatId}
                                            buttonViewChatStyle={styles.buttonViewGoToChat}/>
                                }
                            </View>
                        </View>
                    </View>
                {/* </View> */}
                </TouchableOpacity>
                <View>
                    <Image
                        style={styles.dividerImageStyle}
                        resizeMode='center'
                        source={DividerOpenInvitation} />
                </View>
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    const { item } = props;
    const { user } = state.authReducer;
    return {
        owner: state.timelineReducer.users.filter(user => user.id === item.ownerId)[0],
        contextAction: item.contextActionId
            ? state.timelineReducer.contextActionsFromInvitations
                .filter(contextAction => contextAction.id === item.contextActionId)[0]
            : null,
        event: item.eventId
            ? state.timelineReducer.eventsFromInvitations
                .filter(event => event.id === item.eventId)[0]
            : null,
        iAmConfirmed: item.ownerId === user.id || (item.confirmedUsers.indexOf(user.id) > -1)
    }
}

export default connect(mapStateToProps, { 
    getUserData, 
    confirmInvitation,
    getConfirmedUsers,
    getRejectedUsers,
})(InvitationCard);