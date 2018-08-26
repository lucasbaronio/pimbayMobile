import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
// import { Card, Button as ButtonElements } from 'react-native-elements';
import { connect } from 'react-redux';

// import { actions as timeline } from "../../index";
// const { getContextActionList } = timeline;
import { Actions } from 'react-native-router-flux';

import AvatarUser from "../../../shared/AvatarUser";
import AddUser from "../../../../assets/icons/adduser.png";

import styles from "./styles";

class InvitedUsers extends React.Component {

    renderItem = ({item, index}) => {
        return (
            <AvatarUser item={item} />
        )
    }

    renderHeader = () => {
        return (
            <AvatarUser 
                onPressInviteButtom={this.onPressInviteButtom}
                item={{ 
                    avatar: "../../../assets/icons/adduser.png", 
                    userName: "Invitar", 
                    fullName: "Invitar" 
                }} />
        )
    }

    onPressInviteButtom = (item) => {
        Actions.push("SelectUsersFromList");
    };

    render() {
        const { invitedUsers } = this.props;
        console.log(invitedUsers);
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    Mis invitados
                </Text>
                <FlatList
                    horizontal
                    data={invitedUsers}
                    // extraData={this.state}
                    showsHorizontalScrollIndicator={false}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => item.id}
                    style={{marginLeft: 10}}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        invitedUsers: state.timelineReducer.invitedUsers
    }
}

export default connect(mapStateToProps, { })(InvitedUsers);