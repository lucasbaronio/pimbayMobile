import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import AvatarUser from "../../../shared/AvatarUser";
import { convertUserArrayInArrayOfArrays } from "../../../shared/utils/lists";

import { Ionicons } from '@expo/vector-icons';
import styles from "./styles";

const invitedUser = [
    {
        id: "1",
        avatar: null,
        fullName: 'Lucas Baronio',
        username: 'baronio7',
    },
    {
        id: "2",
        avatar: 'http://napolitans.org/wp-content/uploads/2017/08/profile-avatar.gif',
        fullName: 'Fernando de la Fuente',
        username: 'nanofer',
    },
    {
        id: "3",
        avatar: null,
        fullName: 'Agustin Carrabs',
        username: 'acarrabs',
    },
    {
        id: "4",
        avatar: 'http://napolitans.org/wp-content/uploads/2017/08/profile-avatar.gif',
        fullName: 'Alvaro Rodriguez',
        username: 'alvarito',
    },
    {
        id: "5",
        avatar: null,
        fullName: 'Matias Zalynas',
        username: 'mzalynas',
    },
]

class InvitedUsers extends React.Component {

    state = {
        newUserList: [],
        selected: new Map(),
        itemSelected: {}
    };

    componentWillMount() {
        const newUserList = convertUserArrayInArrayOfArrays(invitedUser, 4);
        this.setState({ newUserList });
    }

    // onPressAvatar = (item) => {
    //     if (this.props.timeline) {
    //         this.props.onPressContextAction(item);
    //     } else {
    //         this.setState((state) => {
    //             const selected = new Map();
    //             selected.set(item.id, !selected.get(item.id));
    //             return {selected, itemSelected: item};
    //         });
    //         this.props.onPressContextAction(item);
    //     }
    // };

    // renderItem = ({item, index}) => {
    //     console.log(item);
    //     return (
    //         <AvatarUser 
    //             item={item}
    //             // onPressAvatar={this.onPressAvatar}
    //             selected={!!this.state.selected.get(item.id)}/>
    //     )
    // }

    onPressView = () => {
        Actions.push("SelectUsersFromList");
    };

    renderRow = (row) => {
        return row.map((item) =>
            <AvatarUser
                key={item.id}
                item={item}
                // onPressAvatar={this.onPressAvatar}
                selected={!!this.state.selected.get(item.id)}
            />
        )
    };

    // invitedUserList = () => {
    //     const { newUserList } = this.state;
    //     return newUserList.map((row) =>
    //         <View style={styles.rowUserList}>
    //             {this.renderRow(row)}
    //         </View>
    //     );
    // };

    render() {
        const { newUserList } = this.state;

        return (
            <TouchableOpacity style={styles.container} onPress={this.onPressView}>

                <View style={styles.header}>
                    <View style={styles.titleSelectInvitedUsersView}>
                        <Text style={styles.titleSelectInvitedUsers}>
                            Seleccionar usuarios invitados
                        </Text>
                    </View>
                    <View>
                        <Ionicons name="ios-arrow-forward" size={32} color="black" />
                    </View>
                </View>
                <View style={styles.body}>
                    {/* {this.invitedUserList()} */}
                    <View style={styles.rowUserList}>
                        {this.renderRow(newUserList[0])}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

// function mapStateToProps(state, props) {
//     return {
//         isLoading: state.timelineReducer.isLoadingContextActionList,
//         contextActions: state.timelineReducer.contextActions
//     }
// }

// export default connect(mapStateToProps, { getContextActionList })(InvitedUsers);
export default InvitedUsers;