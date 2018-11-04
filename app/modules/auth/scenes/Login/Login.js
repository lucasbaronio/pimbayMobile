import React from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { actions as auth } from "../../index";

import Form from "../../components/Form";

const { login } = auth;

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
        key: 'password',
        label: "Password",
        placeholder: "Contraseña",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        type: "password",
        returnKeyType: "done",
    }
];

const error = {
    general: "",
    email: "",
    password: ""
}

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onForgotPassword() {
        Actions.ForgotPassword();
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages

        this.props.login(data, this.onSuccess, this.onError);
    }

    onSuccess({exists, user}) {
        if (exists) Actions.Main();
        else Actions.CompleteProfile({user});
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
            <Form fields={fields}
                  showLabel={false}
                  onSubmit={this.onSubmit}
                  buttonTitle={"Iniciar Sesión"}
                  error={this.state.error}
                  isLoading={this.props.isLoading}
                  onForgotPassword={this.onForgotPassword}/>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.authReducer.isLoading
    }
}

export default connect(mapStateToProps, { login })(Login);
