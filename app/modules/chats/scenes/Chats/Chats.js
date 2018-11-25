import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';

import { actions as chat } from "../../index";
const { signOut } = chat;

import styles from "./styles";

class Chats extends React.Component {

    onSignOut = () => {
        this.props.signOut(this.onSuccess, this.onError)
    }

    onSuccess = () => {
        Actions.reset('root');
        // Actions.scene({type: "reset"})
    }

    onError = (error) => {
        Alert.alert('Oops!', error.message);
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    raised
                    title="CERRAR SESIÓN"
                    borderRadius={4}
                    // containerViewStyle={styles.signOutContainer}
                    // buttonStyle={styles.signOutButton}
                    // textStyle={styles.signOutText}
                    onPress={this.onSignOut} />
            </View>
        );
    }
}

export default connect(null, { signOut })(Chats);