import React from 'react';
import { Linking, View, TouchableOpacity, Text, Image } from 'react-native';
import { connect } from "react-redux";
import mapLocation from '../../../../../assets/icons/map-location.png';
import styles, { windowHeight } from "./styles"
import { IPHONE_SE_HEIGHT } from '../../../../../config/phoneSizes';

class LocationButton extends React.Component {
    _onPressButton = () => {
        const URL = "https://www.google.com/maps/search/?api=1&query=";
        var query = this.props.place.replace(" ", "+");
        Linking.openURL(URL + query);
    };

    render() {
        const { place, ellipsizeText } = this.props;

        return (
            <TouchableOpacity onPress={this._onPressButton}>
                <View style={styles.container}>
                    <Image
                        style={{ width: 20, height: 20 }}
                        source={mapLocation} />
                    <Text style={styles.text}>
                        {
                            (place.length > 15 && windowHeight <= IPHONE_SE_HEIGHT && ellipsizeText)
                            ? place.substring(0, 15) + '...'
                            : (place.length > 25 && ellipsizeText)
                            ? place.substring(0, 25) + '...'
                            : place
                        }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default connect(null, {})(LocationButton);