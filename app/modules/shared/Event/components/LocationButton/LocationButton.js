import React from 'react';
import { Linking, View, TouchableOpacity, Text, Image } from 'react-native';
// import { Entypo } from '@expo/vector-icons';
import mapLocation from '../../../../../assets/icons/map-location.png';

import styles from "./styles"
import { connect } from "react-redux";

class LocationButton extends React.Component {
    _onPressButton = () => {
        const URL = "https://www.google.com/maps/search/?api=1&query=";
        var query = this.props.place.replace(" ", "+");
        Linking.openURL(URL + query);
    };

    render() {
        const { place } = this.props;

        return (
            <TouchableOpacity onPress={this._onPressButton}>
                <View style={styles.container}>
                    {/* <Entypo name="location" size={20} color="green" /> */}
                    <Image 
                        style={{width: 20, height: 20}}
                        source={mapLocation} />
                    <Text style={styles.text}>
                        {(place.length > 25) 
                        ? place.substring(0, 25) + '...' 
                        : place}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default connect(null, { })(LocationButton);