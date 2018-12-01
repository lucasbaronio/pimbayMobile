import React, { Component } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Alert, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AvatarUser from '../../../../../shared/AvatarUser';
import GridView from 'react-native-super-grid';

// import { actions as invitationsActions } from "../../index";
// const { getInvitationsIn, getInvitationsInRefresh } = invitationsActions;
import { actions as profileActions } from "../../../../../profile/index";
const { getUserData } = profileActions;

import styles, { windowWidth } from "./styles";

class SearchTimelineUser extends Component {

    // componentDidMount() {
    //     this.props.getInvitationsIn(this.onError);
    // }

    // onError(error) {
    //     Alert.alert("Oops", error.message);
    // }

    renderItem = (item) => {
        return (
            <AvatarUser
                item={item}
                onPressButtom={this.onPressUser}
            />
        )
    }

    onPressUser = (item) => {
        const { getUserData } = this.props;
        getUserData(item.id, this.onSuccess, this.onError);
    }

    onSuccess(isLoggedUser) {
        Actions.push("ProfileUser", { isNotLoggedUser: !isLoggedUser });
    }

    onError(error) {
        Alert.alert("Oops", error.message);
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={styles.activityIndicatorCenter}>
                    <ActivityIndicator animating={true} />
                </View>
            )
        } else {
            const { searchedUsers, emptySearchInput } = this.props;
            return (
                <View style={styles.container}>
                    {
                        searchedUsers.length > 0
                        ? <GridView
                            itemDimension={windowWidth * 0.2}
                            items={searchedUsers}
                            renderItem={this.renderItem}
                        />
                        : emptySearchInput 
                            ? <Text style={{ paddingTop: 100 }}>Realice una búsqueda...</Text>
                            : <Text style={{ paddingTop: 100 }}>No se encontraron usuarios...</Text>
                    }
                </View>
            )
        }
    }
}

function mapStateToProps(state, props) {
    return {
        searchedUsers: state.timelineReducer.searchedUsers,
        isLoading: state.timelineReducer.isLoadingSearchedUsers,
        emptySearchInput: state.timelineReducer.emptySearchInput,
    }
}

export default connect(mapStateToProps, { getUserData })(SearchTimelineUser);