import React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, FormValidationMessage, Avatar, Button } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'

import { connect } from 'react-redux';
import { actions as profileActions } from "../../index";
const { updateUser } = profileActions;
import moment from 'moment';

import styles from "./styles"

class EditProfile extends React.Component {

    state = {
        biography: null,
        fullName: null,
        birthdate: null,
        interests: null,
        nameError: false,
        errors: false
    }

    onError(error) {
        Alert.alert("Oops", error.message);
    }

    onSuceess(data) {
        Actions.pop();
    }

    componentWillMount() {
        this.setState({ birthdate: this.props.user.birthdate })
    }

    saveChanges = () => {
        this.setState({ errors: false });
        var momentDate = new Date(moment(this.state.birthdate).format());
        let data = { 'birthdate': momentDate };
        (this.state.biography && this.state.biography.length > 0)
            ? data = { ...data, 'biography': this.state.biography }
            : this.setState({ errors: true });
        (this.state.fullName && this.state.fullName.length > 0)
            ? data = { ...data, 'fullName': this.state.fullName }
            : this.setState({ errors: true });

        if (!this.state.errors) {
            this.props.updateUser(data, this.onSuceess, this.onError);
        }
    }

    render() {
        let { avatar, biography, fullName } = this.props.user;
        var initials = fullName.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

        return (
            <View style={styles.container}>
                <Avatar
                    large
                    rounded
                    title={(!avatar) ? initials : null}
                    source={(avatar) ? { uri: avatar } : null}
                    containerStyle={{ marginTop: 20, alignSelf: "center" }} />

                <FormLabel>Nombre</FormLabel>
                <FormInput onChangeText={(text) => { this.setState({ fullName: text }) }}>{fullName}</FormInput>
                <FormValidationMessage>
                    {
                        !!this.state.nameError
                            ? "Nombre es requerido"
                            : ""
                    }
                </FormValidationMessage>

                <FormLabel>Biografía</FormLabel>
                <FormInput onChangeText={(text) => { this.setState({ biography: text }) }}>{biography}</FormInput>

                <FormLabel>Fecha de nacimiento</FormLabel>
                <DatePicker
                    style={{ width: 200 }}
                    date={this.state.birthdate}
                    mode="date"
                    placeholder="Fecha de nacimiento"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirmar"
                    cancelBtnText="Cancelar"
                    showIcon={false}
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginTop: 10,
                            marginLeft: 25,
                            alignItems: 'flex-start',
                            borderWidth: 0
                        }
                    }}
                    onDateChange={(date) => { this.setState({ birthdate: date }) }}
                />

                <Button
                    raised
                    title="Guardar"
                    borderRadius={4}
                    containerViewStyle={styles.saveButtonContainer}
                    buttonStyle={styles.saveButton}
                    textStyle={styles.saveButtonText}
                    onPress={this.saveChanges} />
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.profileReducer.user
    }
}

export default connect(mapStateToProps, { updateUser })(EditProfile);