import React from 'react';
import { Actions } from 'react-native-router-flux';
import NavButton from '../../components/NavButton';

import { color } from "../../styles/theme";

export const renderAddButton = ({screen}) => {
    return (
        <NavButton onPress={Actions.push(screen)}
                   name={"plus"} type={"entypo"}
                   color={color.black}/>
    )
}

export function renderSearchTimelineButton({screen}) {
    return (
        <NavButton onPress={Actions.push(screen)}
                    name={"search"} type={"Feather"}
                    color={color.black}/>
    )
}

export const renderCloseButton = () => {
    return (
        <NavButton onPress={Actions.pop}
                   name={"md-close"}
                   type={"ionicon"}
                   color={color.black}/>
    )
}