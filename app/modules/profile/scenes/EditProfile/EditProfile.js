import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, FormValidationMessage, Avatar } from 'react-native-elements'

import { connect } from 'react-redux';

import styles from "./styles"

class EditProfile extends React.Component {
    onChangeDueDate = (dueDate) => {
        this.setState({ dueDate: dueDate });
    }
    
    componentDidMount() {
        console.log(this.props);
        console.log(this.state);
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
                <FormInput onChangeText={null}>{fullName}</FormInput>
                <FormValidationMessage></FormValidationMessage>

                <FormLabel>Biografía</FormLabel>
                <FormInput onChangeText={null}>{biography}</FormInput>
                <FormValidationMessage></FormValidationMessage>

                <FormLabel>Fecha de nacimiento</FormLabel>
                <FormValidationMessage></FormValidationMessage>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.profileReducer.user
    }
}

export default connect(mapStateToProps, {})(EditProfile);