import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import GridView from 'react-native-super-grid';

import { connect } from 'react-redux';

import { actions as createInvitation } from "../../index"
const { addUserToInvitedList, removeUserFromInvitedList, getFavoriteUsers } = createInvitation;

import styles, { windowWidth } from "./styles";
import AvatarUser from '../../../shared/AvatarUser';

class SelectUsersFromList extends React.Component {

    state = {
        favoriteUsers: [],
    }

    componentDidMount() {
        if (this.state.favoriteUsers.length === 0)
            this.props.getFavoriteUsers(this.onSuccess, (error) => alert(error.message));
    }

    onSuccess = (data) => {
        console.log(data);
        var favoriteUsers = [].concat(data);
        const { invitedUsers } = this.props;
        console.log(invitedUsers);
        for (var i = 0; i < invitedUsers.length; i++) {
            for (var j = 0; j < favoriteUsers.length; j++) {
                if (invitedUsers[i].id === favoriteUsers[j].id)
                    favoriteUsers[j].selected = true;
            }
        }

        this.setState({ favoriteUsers });
    }

    renderItem = (item) => {
        return (
            <AvatarUser
                item={item}
                selectable={true}
                onSelectUser={this.onSelectUser}
                onDeselectUser={this.onDeselectUser}
            />
        )
    }

    onSelectUser = (item) => {
        var favoriteUsers = this.state.favoriteUsers;
        for (var i = 0; i < favoriteUsers.length; i++) {
            if (favoriteUsers[i].id === item.id) {
                favoriteUsers[i].selected = true;
            }
        }
        this.setState({ favoriteUsers });

        const { addUserToInvitedList } = this.props;
        addUserToInvitedList(item);
    }

    onDeselectUser = (item) => {
        var favoriteUsers = this.state.favoriteUsers;
        for (var i = 0; i < favoriteUsers.length; i++) {
            if (favoriteUsers[i].id === item.id) {
                favoriteUsers[i].selected = false;
            }
        }
        this.setState({ favoriteUsers });

        const { removeUserFromInvitedList } = this.props;
        removeUserFromInvitedList(item);
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={styles.activityIndicatorCenter}>
                    <ActivityIndicator animating={true} />
                </View>
            )
        } else {
            const { favoriteUsers } = this.state;
            return (
                <View style={styles.container}>
                    <GridView
                        itemDimension={windowWidth * 0.2}
                        items={favoriteUsers}
                        renderItem={this.renderItem}
                    />
                </View>
            )
        }
    }
}

function mapStateToProps(state, props) {
    return {
        invitedUsers: state.timelineReducer.invitedUsers,
        isLoading: state.timelineReducer.isLoadingFavoriteUsers,
    }
}

export default connect(mapStateToProps, {
    addUserToInvitedList,
    removeUserFromInvitedList,
    getFavoriteUsers
})(SelectUsersFromList);