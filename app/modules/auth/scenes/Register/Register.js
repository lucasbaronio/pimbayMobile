import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { actions as auth } from "../../index"
const { register } = auth;

import Form from "../../components/Form"
import styles from './styles';

const fields = [
    {
        key: 'email',
        label: "Email Address",
        placeholder: "Dirección de correo electónico",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "email",
        returnKeyType: "next",
        keyboardType: "email-address"
    },
    {
        key: 'fullName',
        label: "Nombre Completo",
        placeholder: "Nombre Completo",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text",
        returnKeyType: "next"
    },
    {
        key: 'username',
        label: "Username",
        placeholder: "Usuario",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text",
        returnKeyType: "next"
    },
    {
        key: 'password',
        label: "Password",
        placeholder: "Contraseña",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        type: "password",
        returnKeyType: "next"
    },
    {
        key: 'confirm_password',
        label: "Confirm Password",
        placeholder: "Confirmar contraseña",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        type: "confirm_password",
        returnKeyType: "done"
    }
];

const error = {
    general: "",
    email: "",
    fullName: "",
    username: "",
    password: "",
    confirm_password: ""
}

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages

        this.props.register(data, this.onSuccess, this.onError)
    }

    onSuccess(user) {
        Actions.Main()
    }

    onError(error) {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }
        this.setState({error: errObj});
    }

    render() {
        return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={(Platform.OS === 'ios') ? "padding" : null}
            // keyboardVerticalOffset={Platform.select({ ios: 30, android: 500 })}
            enabled >
            <ScrollView style={{ flex: 1 }}>
                <Form fields={fields}
                    showLabel={false}
                    onSubmit={this.onSubmit}
                    buttonTitle={"Crear cuenta"}
                    isLoading={this.props.isLoading}
                    error={this.state.error}/>
            </ScrollView>
        </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.authReducer.isLoading
    }
}

export default connect(mapStateToProps, { register })(Register);
