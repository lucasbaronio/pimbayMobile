import React from 'react';
import { View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, FormValidationMessage, Avatar } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'

import { connect } from 'react-redux';
import { actions as profileActions } from "../../index";
const { updateUser } = profileActions;

import styles from "./styles"

class EditProfile extends React.Component {

    state = {
        biography: null,
        fullName: null,
        birthdate: null,
        interests: null
    }

    componentWillMount() {
        this.setState({ birthdate: this.props.user.birthdate })
    }

    componentDidMount() {
        console.log(this.props);
        console.log(this.state);
    }

    saveChanges = () => {
        this.updateUser()
    }

    render() {
        let { avatar, biography, birthdate, fullName, interests, mail, userName } = this.props.user;
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
                <FormValidationMessage></FormValidationMessage>

                <FormLabel>Biografía</FormLabel>
                <FormInput onChangeText={(text) => { this.setState({ biography: text }) }}>{biography}</FormInput>
                <FormValidationMessage></FormValidationMessage>

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
                    containerViewStyle={styles.createInvitationContainer}
                    buttonStyle={styles.createInvitationButton}
                    textStyle={styles.createInvitationText}
                    onPress={this.saveChanges()} />
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