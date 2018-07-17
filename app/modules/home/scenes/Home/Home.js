import React from 'react';
import { View, Alert } from 'react-native';

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;

const { color } = theme;

class Home extends React.Component {
    constructor(){
        super();
        this.state = { }
        
        this.onSignOut = this.onSignOut.bind(this);
    }

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onLocation() {
        Actions.push("Location");
    }

    onNotification() {
        Actions.push("Notification");
    }

    onSuccess() {
        Actions.reset("Auth")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    raised
                    borderRadius={4}
                    title={'Ubicación'}
                    containerViewStyle={[styles.bottomContainer]}
                    buttonStyle={[styles.buttonContainer]}
                    textStyle={styles.buttonText}
                    onPress={this.onLocation}/>
                <Button
                    raised
                    borderRadius={4}
                    title={'Notificaciones'}
                    containerViewStyle={[styles.bottomContainer]}
                    buttonStyle={[styles.buttonContainer]}
                    textStyle={styles.buttonText}
                    onPress={this.onNotification}/>
                <Button
                    raised
                    borderRadius={4}
                    title={'Cerrar Sesión'}
                    containerViewStyle={[styles.bottomContainer]}
                    buttonStyle={[styles.buttonContainer]}
                    textStyle={styles.buttonText}
                    onPress={this.onSignOut}/>
            </View>
        );
    }
}

export default connect(null, { signOut })(Home);