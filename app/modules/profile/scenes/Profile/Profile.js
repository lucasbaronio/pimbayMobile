import React from 'react';
import { View, Text, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { Avatar, Button as ButtonElements } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { actions as profileActions } from "../../index";
const { addFavouriteUser, signOut } = profileActions;

import styles, { color, fontSize } from "./styles"

class Profile extends React.Component {

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
                    fontColor={iAmFollowing ? color.orange : color.white} // ver si funca esto
                    fontSize={fontSize.text4} />
            );
        } else return null;
    }

    onAddFavouriteUser = () => {
        const { addFavouriteUser, user } = this.props;
        addFavouriteUser(user.mail, this.onError);
    }

    onRemoveFavouriteUser = () => {
        // const { removeFavouriteUser, user } = this.props;
        // removeFavouriteUser(user.mail, this.onError);
        Alert.alert("Oops", "Aún no es posible eliminar un favorito.");
    }

    onError(error) {
        Alert.alert("Oops", error.message);
    }

    onSignOut = () => {
        this.props.signOut(this.onSuccess, this.onError)
    }

    onSuccess = () => {
        Actions.reset('root');
    }

    render() {
        if (this.props.isLoadingUser) {
            return (
                <View style={styles.activityIndicatorCenter}>
                    <ActivityIndicator animating={true} />
                </View>
            );
        } else {
            let { avatar, biography, favoriteUsers, fullName, interests } = this.props.user;
            var initials = fullName.match(/\b\w/g) || [];
            initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

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
                        <View style={{ flex: 1, height: 60, alignItems: 'center' }} >
                            <Text style={styles.bioStyle}>{favoriteUsers ? favoriteUsers.length : 0}</Text>
                            <Text style={styles.userInfoLabel}>Usuarios</Text>
                            <Text style={styles.userInfoLabel}>favoritos</Text>
                        </View>
                        <View style={{ flex: 1, height: 60, alignItems: 'center' }} >
                            <Text style={styles.bioStyle}>{interests.length}</Text>
                            <Text style={styles.userInfoLabel}>Intereses</Text>
                        </View>
                        <View style={{ flex: 1, height: 60, alignItems: 'center' }} >
                            <Text style={styles.bioStyle}>9</Text>
                            <Text style={styles.userInfoLabel}>Invitaciones</Text>
                            <Text style={styles.userInfoLabel}>abiertas</Text>
                        </View>
                    </View>
                    <View style={styles.horizontalLineStyle} />
                    <View style={{ alignSelf: 'flex-start' }}>
                        <Text style={styles.interestsTitleStyle}>Intereses</Text>
                        <View style={{ flexDirection: 'row', marginLeft: 20, flexWrap: 'wrap' }}>
                            {this.renderInterests(interests)}
                        </View>
                    </View>
                    <ButtonElements
                        raised
                        title="CERRAR SESIÓN"
                        borderRadius={4}
                        // containerViewStyle={styles.signOutContainer}
                        // buttonStyle={styles.signOutButton}
                        // textStyle={styles.signOutText}
                        onPress={this.onSignOut} />
                </SafeAreaView>
            );
        }
    }
}

function mapStateToProps(state, props) {
    const { isNotLoggedUser } = props;
    const { isLoadingUser, loggedUser, userToShow, isLoadingAddFavouriteUser } = state.profileReducer;
    return {
        isLoadingUser,
        user: isNotLoggedUser ? userToShow : loggedUser,
        isLoadingAddFavouriteUser,
        iAmFollowing: isNotLoggedUser 
                        ? loggedUser &&
                            loggedUser.favoriteUsers &&
                            loggedUser.favoriteUsers.indexOf(userToShow.id) > -1 
                        : false
    }
}

export default connect(mapStateToProps, { addFavouriteUser, signOut })(Profile);