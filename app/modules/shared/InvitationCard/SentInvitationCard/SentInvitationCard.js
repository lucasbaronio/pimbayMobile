import React, { Component } from 'react';
import { View, Text, Image, Alert, TouchableWithoutFeedback } from 'react-native';
import { Button as ButtonElements, Avatar, Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import styles, { fontSize } from "./styles";
import EventCardCreateInvitation from '../../../shared/Event/EventCardCreateInvitation';
import { getDueTime, getInvSentTime } from "../../../shared/utils/date";
import { fontFamily } from '../../../../styles/theme';

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
                <Text style={styles.createdTimeStyle}>{getCreatedTime(item.dateCreated)}</Text>
            </View>);
    }

    renderUserPhotoSection = (userInfo) => {
        return (
            <View style={styles.userAvatarSectionContainer}>
                <View style={styles.userAvatarSectionContainer}>
                    <Avatar
                        rounded
                        medium
                        large
                        source={{ uri: userInfo.avatar }}
                        containerStyle={{ marginTop: 20 }}
                    />
                </View>
                <Image source={require('../../../../assets/icons/sentIcon.png')} style={styles.iconSentStyle} />
            </View>
        );

    }

    renderDescriptionInformation = (item) => {
        const { contextActionId, eventId, description } = item;
        if (contextActionId == null && eventId == null) {
            return (
                <View style={styles.descriptionContainerStyle}>
                    <Text style={styles.descriptionStyle}>{description}</Text>
                </View>
            );
        } else {
            if (contextActionId != null) {
                const contextAction = this.getContextAction(contextActionId);
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
                const event = this.getEvent(eventId);
                return (
                    <View style={styles.descriptionContainerStyle}>
                        <EventCardCreateInvitation eventInvitation={event} />
                        <Text style={styles.descriptionWithEventStyle}>{description}</Text>
                    </View>
                );
            }
        }
    }

    getUserInfo = (ownerId) => {
        switch (ownerId) {
            case "DDM2AobexaNzHbRyjuYk":
                return {
                    id: "DDM2AobexaNzHbRyjuYk",
                    userName: "alvaro.scelza",
                    fullName: "Alvaro Rodriguez Scelza",
                    gender: "MAN",
                    mail: "alvarito@alvaro.com",
                    avatar: "http://i64.tinypic.com/t6rout.jpg",
                    birthdate: "16/08/92",
                    creationDate: "16/08/18",
                    deleted: false,
                    biography: "El alvarito",
                    interests: [],
                    favoriteUsers: []
                }
            case "Iiz3cW33NF6XQ61EU69x":
                console.log('aca?');
                return {
                    id: "Iiz3cW33NF6XQ61EU69x",
                    userName: "mati_zalynas",
                    fullName: "Matias Zalynas",
                    gender: "MAN",
                    mail: "mati@mail.com",
                    avatar: "http://i64.tinypic.com/21abyp2.jpg",
                    birthdate: "16/08/92",
                    creationDate: "16/08/18",
                    deleted: false,
                    biography: "Mati",
                    interests: [],
                    favoriteUsers: []
                }
            default:
                return {
                    id: "aguscarrabs",
                    userName: "aguscarrabs",
                    fullName: "Agustin Carrabs",
                    gender: "MAN",
                    mail: "agus@mail.com",
                    avatar: "http://i67.tinypic.com/2hog13b.jpg",
                    birthdate: "16/08/92",
                    creationDate: "16/08/18",
                    deleted: false,
                    biography: "agus",
                    interests: [],
                    favoriteUsers: []
                }
        }
    }

    getContextAction = () => {
        return {
            id: "1",
            title: "A tomar una",
            icon: 'ios-beer',
            type: 'ionicon',
            image: null
        }
    }

    getEvent = (eventId) => {
        return {
            id: "0EzifiT6X4NR39g6nvde",
            title: "Matias Agri",
            type:"EVENT",
            realizationDate:"2018-07-26T01:00:00.000+0000",
            place: "Montevideo, Uruguay",
            image:"https://images.sk-static.com/images/media/profile_images/artists/9215129/huge_avatar",
            categories: ["Musica","Concierto"], 
            description: "Doors open: 22:00\nTour name: Por El Bien De Los Dos TOUR\nMatias Agri se presentará por primera vez en Uruguay. En un show acústico super intimo.\nCompra los ticket y enterate de todo en sus redes sociales :\nInstagram: @matiasagri\nTwitter: @matiasagri\nFacebook: /matiasagri",
            dateCreated: null,
            orderByDate: "2018-07-26T01:00:00.000+0000"
        }
    }

    render() {
        const { item } = this.props;
        const userInfo = this.getUserInfo(item.invitedUsers[0]);

        return (
            <View>
                <View style={styles.container}>
                    {this.renderUserPhotoSection(userInfo)}
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