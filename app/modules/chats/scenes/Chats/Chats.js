import React from 'react';
import { View, Text, FlatList, Alert, Image, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ChatItem from '../../components/ChatItem';

import { connect } from 'react-redux';

import { actions as chat } from "../../index";
const { getChatList } = chat;

import styles, { fontSize } from "./styles";
import DividerOpenInvitation from '../../../../assets/dividerOpenInvitation.png';

class Chats extends React.Component {

    componentDidMount() {
        this.props.getChatList(this.onError);
    }

    onError(error) {
        Alert.alert("Oops", error.message);
    }

    renderSeparator = () => (
        <View>
            <Image
                style={styles.dividerImageStyle}
                resizeMode='center'
                source={DividerOpenInvitation} />
        </View>
    );

    render() {
        if (this.props.isLoadingChatList) {
            return (
                <View style={styles.activityIndicatorCenter}>
                    <ActivityIndicator animating={true} />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        style={styles.listChatUsers}
                        data={this.props.chatList}
                        // data={[]}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                        renderItem={({item}) => (
                            <ChatItem chat={item} />
                        )}
                        ListEmptyComponent={() => (
                            <View style={{flexDirection: 'column', alignItems: 'center', marginTop: 100}}>
                                <Text>Usted no tiene invitaciones activas</Text>
                                <Text>Cree una en este momento, presionando el botón anaranjado</Text>
                                <Text> </Text>
                                <Text style={{ fontSize: fontSize.title1 }}>👇</Text>
                            </View>
                        )}
                    />
                </View>
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        chatList: state.chatReducer.chatList,
        isLoadingChatList: state.chatReducer.isLoadingChatList,
    }
}

export default connect(mapStateToProps, { getChatList })(Chats);