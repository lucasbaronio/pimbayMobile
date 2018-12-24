import React from 'react';
import { Platform, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import NavButton from '../../components/NavButton';
import tick from '../../assets/icons/tick.png';
import ActionSheet from 'react-native-actionsheet';

import { color, fontSize, fontFamily } from "../../styles/theme";
import { pimbayType, invitationType } from '../../modules/shared/constants';

export function AddButton({ goToScreen }) {
    return (
        <NavButton onPress={() => Actions.push(goToScreen)}
            name={"plus"} type={"entypo"}
            color={color.black} />
    )
}

export function SearchButton({ goToScreen }) {
    return (
        <NavButton onPress={() => Actions.push(goToScreen)}
            name={"search"} type={"Feather"}
            color={color.black} />
    )
}

export function EditButton({ goToScreen }) {
    return (
        <NavButton onPress={() => Actions.push(goToScreen)}
            name={"md-create"} type={"ionicon"}
            color={color.black} />
    )
}

export function LogOutButton({ onPress }) {
    return (
        <NavButton onPress={onPress}
            name={"ios-log-out"} type={"ionicon"}
            color={color.black} />
    )
}

export function CloseButton() {
    return (
        <NavButton onPress={Actions.pop}
            name={"md-close"}
            type={"ionicon"}
            color={color.black} />
    )
}

export function CloseButtonOnPress({ onPress }) {
    return (
        <NavButton onPress={onPress}
            name={"md-close"}
            type={"ionicon"}
            color={color.black} />
    )
}

export function BackButton() {
    return (
        <NavButton onPress={Actions.pop}
            name={"ios-arrow-back"}
            type={"ionicon"}
            color={color.black} />
    )
}

export function BackButtonOnPress({ onPress }) {
    return (
        <NavButton onPress={onPress}
            name={"ios-arrow-back"}
            type={"ionicon"}
            color={color.black} />
    )
}

export function SaveButton({ onPress }) {
    return (
        <NavButton
            onPress={onPress}
            source={tick}
            name={null} />
    )
}

export function CreateInvitationButton() {
    return (
        <View>
            <Avatar
                height={Platform.OS === 'ios' ? 65 : 45}
                width={Platform.OS === 'ios' ? 55 : 45}
                rounded
                icon={{ name: 'plus', type: 'material-community' }}
                overlayContainerStyle={{
                    backgroundColor: color.orange,
                    marginBottom: Platform.OS === 'ios' ? 10 : 0
                }}
                onPress={() => this.ActionSheet.show()}
                activeOpacity={0.8} />
            <ActionSheet
                ref={o => this.ActionSheet = o}
                title={'Crear Invitación - De que tipo?'}
                message={'Abierta: Visible para todos en Pimbay.\nDirigida: Visible solo para usuarios invitados.'}
                options={['Invitación Abierta', 'Invitación Dirigida', 'Cancelar']}
                cancelButtonIndex={2}
                onPress={(index) => {
                    if (index == 0 || index == 1) {
                        Actions.push("CreateInvitation", {
                            type: pimbayType.SIMPLE,
                            invitationType:
                                (index === 0)
                                    ? invitationType.OPEN
                                    : invitationType.DIRECTED
                        });
                    }
                }}
                styles={actionSheetStyles}
            />
        </View>
    )
}

export function TextButton({ text, onPress }) {
    return (
        <NavButton
            onPress={onPress}
            color={color.blue}
            size={fontSize.text2}
            buttonText={text} />
    )
}

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
