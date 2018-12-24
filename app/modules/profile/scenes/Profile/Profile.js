import React from 'react';
import { View, Text, ActivityIndicator, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { Avatar, Button as ButtonElements } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import GridView from 'react-native-super-grid';

import AvatarUser from '../../../shared/AvatarUser';

import { actions as profileActions } from "../../index";
const { 
    addFavouriteUser, removeFavouriteUser, 
    signOut, getFavouriteUsers, getUserData 
} = profileActions;

import styles, { color, fontSize, windowWidth } from "./styles"

class Profile extends React.Component {

    state = {
        selected: "INTERESTS",
        favouriteUsers: [],
    }

    renderInterests(interests) {
        return interests.map((item, key) => {
            return (
                <Text key={key} style={styles.interestTextStyle}>
                    {item}
                </Text>
            );
        });
    }

    renderFollowUserButton() {
        const { isNotLoggedUser, iAmFollowing, isLoadingAddFavouriteUser } = this.props;
        if (isNotLoggedUser) {
            if (isLoadingAddFavouriteUser) {
                return (
                    // TODO: Agregar un box de loading cuando esta esperando por el req de add/remove fav user
                    null
                );
            }
            return (
                <ButtonElements
                    backgroundColor={iAmFollowing ? color.white : color.orange}
                    onPress={iAmFollowing ? this.onRemoveFavouriteUser : this.onAddFavouriteUser}
                    buttonStyle={styles.button}
                    color={iAmFollowing ? color.black : color.white}
                    title={iAmFollowing ? 'ELIMINAR FAVORITO' : 'AGREGAR FAVORITO'}
                    fontColor={iAmFollowing ? color.orange : color.white}
                    fontSize={fontSize.text4} />
            );
        } else return (
            <ButtonElements
                    backgroundColor={color.white}
                    onPress={this.goToEditProfile}
                    buttonStyle={styles.button}
                    color={color.black}
                    title={'EDITAR PERFIL'}
                    fontColor={color.orange}
                    fontSize={fontSize.text4} />
        );
    }

    goToEditProfile = () => {
        Actions.push('EditProfile');
    }

    onAddFavouriteUser = () => {
        const { addFavouriteUser, user } = this.props;
        addFavouriteUser(user.mail, this.onError);
    }

    onRemoveFavouriteUser = () => {
        const { removeFavouriteUser, user } = this.props;
        removeFavouriteUser(user.mail, this.onError);
    }

    // onSignOut = () => {
    //     this.props.signOut(this.onSuccess, this.onError)
    // }

    onError(error) {
        Alert.alert("Oops", error.message);
    }

    // onSuccess = () => {
    //     Actions.reset('root');
    // }

    onPressInterests = () => {
        this.setState({ selected: "INTERESTS" });
    }

    onPressFavouriteUsers = () => {
        const { getFavouriteUsers, user } = this.props;
        getFavouriteUsers(user.id, (data) => {
            this.setState({ selected: "FAVOURITE_USERS", favouriteUsers: data })
        }, this.onError);
    }

    renderItem = (item) => {
        return (
            <AvatarUser
                item={item}
                selectable={false}
                onPressButtom={this.onPressUserAvatar}
            />
        )
    }

    onPressUserAvatar = (user) => {
        const { getUserData } = this.props;
        getUserData(user.id, this.onSuccessUserAvatar, this.onError);
    }

    onSuccessUserAvatar(isLoggedUser) {
        Actions.push("ProfileUser", { isNotLoggedUser: !isLoggedUser });
    }

    render() {
        if (this.props.isLoadingUser) {
            return (
                <View style={styles.activityIndicatorCenter}>
                    <ActivityIndicator animating={true} />
                </View>
            );
        } else {
            let { user } = this.props;
            let { avatar, biography, favoriteUsers, fullName, interests, openInvitationsCount } = user;
            var initials = fullName.match(/\b\w/g) || [];
            initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
            let { selected, favouriteUsers } = this.state;

            return (
                <SafeAreaView style={styles.container}>
                    <Avatar
                        xlarge
                        rounded
                        title={(!avatar) ? initials : null}
                        source={(avatar) ? { uri: avatar } : null}
                        containerStyle={{ marginTop: 20 }} />
                    <Text style={styles.fullNameStyle}>{fullName}</Text>
                    <Text style={styles.bioStyle}>{biography}</Text>
                    {this.renderFollowUserButton()}
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity 
                            style={[ styles.optionsViews, 
                                selected === "FAVOURITE_USERS" && styles.optionsSelected]}
                            onPress={this.onPressFavouriteUsers}>
                            <Text style={styles.bioStyle}>{favoriteUsers ? favoriteUsers.length : 0}</Text>
                            <Text style={styles.userInfoLabel}>Usuarios</Text>
                            <Text style={styles.userInfoLabel}>favoritos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[ styles.optionsViews, 
                                selected === "INTERESTS" && styles.optionsSelected]}
                            onPress={this.onPressInterests}>
                            <Text style={styles.bioStyle}>{interests.length}</Text>
                            <Text style={styles.userInfoLabel}>Intereses</Text>
                        </TouchableOpacity>
                        <View style={styles.optionsViews} >
                            <Text style={styles.bioStyle}>{openInvitationsCount}</Text>
                            <Text style={styles.userInfoLabel}>Invitaciones</Text>
                            <Text style={styles.userInfoLabel}>abiertas</Text>
                        </View>
                    </View>
                    <View style={styles.horizontalLineStyle} />
                    <View style={{ alignSelf: 'flex-start' }}>
                        <Text style={styles.interestsTitleStyle}>
                            {
                                selected === "INTERESTS" ? 'Intereses' : 'Usuarios Favoritos'
                            }
                        </Text>
                        {
                            selected === "INTERESTS"
                            ? <View style={{ flexDirection: 'row', marginLeft: 20, flexWrap: 'wrap' }}>
                                {this.renderInterests(interests)}
                            </View>
                            : <GridView
                                itemDimension={windowWidth * 0.2}
                                items={favouriteUsers}
                                renderItem={this.renderItem}
                            />
                        }
                        
                    </View>
                    {/* <ButtonElements
                        raised
                        title="CERRAR SESIÓN"
                        borderRadius={4}
                        onPress={this.onSignOut} /> */}
                </SafeAreaView>
            );
        }
    }
}

function mapStateToProps(state, props) {
    const { isNotLoggedUser } = props;
    const { 
        isLoadingUser, loggedUser, userToShow, 
        isLoadingAddFavouriteUser, 
    } = state.profileReducer;
    return {
        isLoadingUser,
        user: isNotLoggedUser ? userToShow : loggedUser,
        isLoadingAddFavouriteUser,
        iAmFollowing: isNotLoggedUser 
                        ? loggedUser &&
                            loggedUser.favoriteUsers &&
                            loggedUser.favoriteUsers.indexOf(userToShow.id) > -1 
                        : false,
    }
}

export default connect(mapStateToProps, { 
    addFavouriteUser, 
    removeFavouriteUser, 
    getFavouriteUsers,
    getUserData,
    signOut 
})(Profile);