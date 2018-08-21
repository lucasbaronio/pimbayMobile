import React, { Component } from 'react';
import { View, Text, Image, Alert, TouchableWithoutFeedback } from 'react-native';
import { Button as ButtonElements, Avatar, Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import styles, { fontSize } from "./styles";
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
        return (
            <View style={styles.descriptionContainerStyle}>
                <Text style={styles.descriptionStyle}>{item.description}</Text>
            </View>
        );
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
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' , marginVertical: 15}}>
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