import React from 'react';
import PropTypes from 'prop-types'

import { View, TouchableOpacity, Image } from 'react-native';

import {Icon} from 'react-native-elements'

import styles from "./styles"

class NavButton extends React.Component {
    render() {
        const { name, type, size, color, onPress, buttonText, source } = this.props;
        console.log(onPress);
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.wrapper}>
                    {
                        (name) ?
                            <Icon name={name}
                                  type={type}
                                  size={size}
                                  iconStyle={{height: size}}
                                  color={color} />
                            : (source) ?
                                <Image 
                                    style={{width: 28, height: 28}}
                                    source={source} />
                                :
                                <Text>{buttonText}</Text>
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

NavButton.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.number,
    onPress: PropTypes.func.isRequired
}


NavButton.defaultProps = {
    name: "ios-settings",
    type: "ionicon",
    size: 26,
    color: "rgba(0,0,0,.84)",
    onPress: null,
    buttonText: "",
    text: false
}

export default NavButton;