import React from 'react';
import PropTypes from 'prop-types'

import { View, TouchableOpacity, Image, Text } from 'react-native';

import {Icon} from 'react-native-elements'

import styles from "./styles"

class NavButton extends React.Component {
    render() {
        const { name, type, size, color, onPress, buttonText, source } = this.props;
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
                                <Text style={{color: color, fontSize: size, marginHorizontal: 3}}>
                                    {buttonText}
                                </Text>
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
    color: "rgba(0,0,0,.84)",
    onPress: null,
    buttonText: "",
    text: false
}

export default NavButton;