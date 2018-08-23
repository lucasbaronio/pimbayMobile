import React, { Component } from 'react';
import { View, Text, Image, Alert, TouchableWithoutFeedback } from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import styles, { fontSize } from "./styles";
import EventCardCreateInvitation from '../../../shared/Event/EventCardCreateInvitation';
import { getDueTime, getInvSentTime } from "../../../shared/utils/date";
import UserPhotoSection from '../components/UserPhotoSection';

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
                    source={require('../../../../assets/icons/time-passing.png')} />
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

    // renderUserPhotoSection = (invitedUsers) => {
    //     const userInfo = getUserInfo(invitedUsers[0]);
    //     return (
    //         <View style={styles.userAvatarSectionContainer}>
    //             <View style={styles.userAvatarSectionContainer}>
    //                 <Avatar
    //                     rounded
    //                     medium
    //                     large
    //                     source={{ uri: userInfo.avatar }}
    //                     containerStyle={{ marginTop: 20 }}
    //                 />
    //             </View>
    //             <Image source={require('../../../../assets/icons/sentIcon.png')} style={styles.iconSentStyle} />
    //         </View>
    //     );
    // }

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
                    <View style={{ alignItems: 'center' }}>
                        <Avatar
                            small
                            rounded
                            source={(contextAction.image) ? { uri: contextAction.image } : null}
                            icon={(contextAction.icon && contextAction.type) ? { name: contextAction.icon, type: contextAction.type } : null}
                            overlayContainerStyle={styles.avatarBackground}
                        />
                        <Text style={styles.avatarTextStyle}>{contextAction.title}</Text>
                    </View>
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
                    
                    {/* {this.renderUserPhotoSection(item.invitedUsers)} */}
                    <UserPhotoSection invitedUsers={item.invitedUsers} />

                    <View style={styles.invitationInfoSectionContainer}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={styles.userNameStyle}>{userInfo.userName}</Text>
                            {this.renderDetailsInformation(item)}
                            {this.renderDescriptionInformation(item)}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                                <TouchableWithoutFeedback onPress={() => { Alert.alert('Finalizar'); }}>
                                    <View style={styles.buttonViewFinalizar}>
                                        <Image source={require('../../../../assets/icons/letter-x.png')} style={{ height: 10, width: 10 }} />
                                        <Text style={{ marginLeft: 10, backgroundColor: "transparent", fontSize: fontSize.text4, color: "#DE5134" }}>FINALIZAR</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { Alert.alert('Ir al chat'); }}>
                                    <View style={styles.buttonViewChat}>
                                        <Text style={{ marginRight: 10, backgroundColor: "transparent", fontSize: fontSize.text4, color: "#DE5134" }}>IR AL CHAT</Text>
                                        <Image source={require('../../../../assets/icons/right-arrow.png')} style={{ height: 10, width: 10 }} />
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
                        source={require('../../../../assets/dividerOpenInvitation.png')} />
                </View>
            </View>
        )
    }
}

export default connect(null, {})(SentInvitationCard);