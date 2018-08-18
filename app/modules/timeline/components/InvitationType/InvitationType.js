import React from 'react';
import { 
    View, Text, 
    Switch, 
    Slider,
    Platform, 
    TouchableOpacity,
    Button,
    Alert
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { invitationType } from '../../../shared/constants';

// import { color } from '../../../../styles/theme';
import styles from "./styles";

class InvitationType extends React.Component {

    state = {
        selectedIndex: 0,
        invitationTypeSelected: invitationType.OPEN
    };
    componentWillMount() {
        this.props.onChangeInvitationType({ invitationTypeSelected: this.state.invitationTypeSelected });
    }

    updateIndex = (selectedIndex) => {
        this.setState({ selectedIndex });
        console.log(selectedIndex);
        switch (selectedIndex) {
            case 0:
                this.props.onChangeInvitationType({ invitationTypeSelected: invitationType.OPEN });
                break;
            case 1:
                this.props.onChangeInvitationType({ invitationTypeSelected: invitationType.DIRECTED });
                break;
        }
    }

    openInvitation = () => (
        <View style={styles.buttonView}>
            <MaterialIcons name="public" size={48} color="black"/>
            <Text>Abierto</Text>
        </View>
    );

    directedInvitation = () => (
        <View style={styles.buttonView}>
            <FontAwesome name="users" size={48} color="black"/>
            <Text>Grupo de favoritos</Text>
        </View>
    );

    render() {
        const buttons = [{ element: this.openInvitation }, { element: this.directedInvitation }];
        const { selectedIndex } = this.state;

        return(
            <View style={styles.container}>
                <Text style={styles.titleForWhom}>Para quien?</Text>
                <ButtonGroup
                    selectedButtonStyle={styles.selectedButtonStyle}
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{height: 80}} />
            </View>
        )
    }
}

export default InvitationType;