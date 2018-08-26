import React from 'react';
import { View } from "react-native";
import ActionSheet from 'react-native-actionsheet';
import { Actions } from "react-native-router-flux";
import { invitationType } from './constants';

import { theme } from "../index"
const { fontFamily, fontSize, color } = theme;

const actionSheetStyles = {
    titleText: {
        fontSize: fontSize.text4,
        fontFamily: fontFamily.bold,
        color: color.black
    },
    messageText: {
        fontSize: fontSize.text5,
        fontFamily: fontFamily.regular,
        color: color.grey
    },
    buttonText: {
        fontSize: fontSize.text4,
        fontFamily: fontFamily.regular,
        color: color.orange
    }
};

const withActionSheetInvitationHOC = WrappedComponent =>
    class extends React.Component {

        state = {
            actionSheetPimbayType: null,
            actionSheetItem: null
        }
        
        showActionSheet = ({...actionSheetStates}) => {
            this.setState({...actionSheetStates}, () => this.ActionSheet.show());
        }

        onPressActionSheetAndroid = (index) => {
            if (index == 0 || index == 1) {
                this.goToCreateInvitation({
                    type: this.state.actionSheetPimbayType,
                    item: this.state.actionSheetItem,
                    invitationType:
                        (index === 0)
                            ? invitationType.OPEN
                            : invitationType.DIRECTED
                });
            }
        }

        goToCreateInvitation = (props) => {
            Actions.push("CreateInvitation", props);
        }

        render() {
            return (
                <View style={{flex: 1}}>
                    <WrappedComponent
                        {...this.props}
                        showActionSheet={this.showActionSheet}
                    />
                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        title={'Crear Invitación - De que tipo?'}
                        message={'Abierta: Visible para todos en Pimbay.\nDirigida: Visible solo para usuarios invitados.'}
                        options={['Invitación Abierta', 'Invitación Dirigida', 'Cancelar']}
                        cancelButtonIndex={2}
                        onPress={(index) => { this.onPressActionSheetAndroid(index) }}
                        styles={actionSheetStyles}
                    />
                </View>
            );
        }
    };
  
export default withActionSheetInvitationHOC;