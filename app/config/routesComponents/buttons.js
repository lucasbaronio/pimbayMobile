import React from 'react';
import { Actions } from 'react-native-router-flux';
import NavButton from '../../components/NavButton';

import { color } from "../../styles/theme";

export function AddButton({goToScreen}) {
    return (
        <NavButton onPress={() => Actions.push(goToScreen)}
                   name={"plus"} type={"entypo"}
                   color={color.black}/>
    )
}

export function SearchButton({goToScreen}) {
    return (
        <NavButton onPress={() => Actions.push(goToScreen)}
                    name={"search"} type={"Feather"}
                    color={color.black}/>
    )
}

export function CloseButton() {
    return (
        <NavButton onPress={Actions.pop}
                   name={"md-close"}
                   type={"ionicon"}
                   color={color.black}/>
    )
}

export function BackButton() {
    return (
        <NavButton onPress={Actions.pop}
                   name={"ios-arrow-back"}
                   type={"ionicon"}
                   color={color.black}/>
    )
}