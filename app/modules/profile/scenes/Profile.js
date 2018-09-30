import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { actions as profileActions } from "../index";
const { getLoggedUserData } = profileActions;

import styles from "./styles"

class Profile extends React.Component {

    componentDidMount() {
        this.props.getLoggedUserData(this.onError);
    }

    onError(error) {
        Alert.alert("Oops", error.message);
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
                <View style={styles.container}>
                    <Avatar
                        xlarge
                        rounded
                        title={(!avatar) ? initials : null}
                        source={(avatar) ? { uri: avatar } : null}
                        containerStyle={{ marginTop: 20 }} />
                    <Text style={styles.fullNameStyle}>{fullName}</Text>
                    <Text style={styles.bioStyle}>{biography}</Text>
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
                </View>
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isLoadingUser: state.profileReducer.isLoadingUser,
        user: state.profileReducer.user
    }
}

export default connect(mapStateToProps, { getLoggedUserData })(Profile);