import React, { PureComponent } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { Button as ButtonElements } from 'react-native-elements';
import LocationButton from "../components/LocationButton";
import styles, { fontSize, color } from "./styles";
import { getFormalDate } from "../../utils/date";

class EventCardMedium extends PureComponent {

    onInvitePress = () => {
        const { item } = this.props;
        this.props.onPressItem(item);
    }

    onPressViewEvent = () => {
        const { item } = this.props;
        this.props.onPressViewEvent(item);
    }

    render() {
        const { item } = this.props;

        return (
            <View style={styles.container} >
                <TouchableOpacity onPress={this.onPressViewEvent} activeOpacity={0.9}>
                    <ImageBackground
                        source={{ uri: item.image }}
                        imageStyle={{ borderRadius: 10 }}
                        style={styles.image} >
                        <View style={styles.overlay} />
                        <View style={styles.buttonView}>
                            <ButtonElements
                                backgroundColor={color.orange}
                                onPress={this.onInvitePress}
                                buttonStyle={styles.button}
                                title='CREAR INVITACIÓN'
                                fontSize={fontSize.text4} />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPressViewEvent} activeOpacity={0.9}>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    activeOpacity={0.9}
                    style={styles.eventDetail} 
                    onPress={this.onPressViewEvent}>
                    {/* <View style={styles.eventDetail}> */}
                        <Text style={styles.realizationDate}>
                            {getFormalDate(item.realizationDate)}
                        </Text>
                        <LocationButton place={item.place} ellipsizeText={true} />
                    {/* </View> */}
                </TouchableOpacity>
                {/* <View style={styles.buttonView}>
                    <ButtonElements
                        backgroundColor={color.orange}
                        onPress={this.onInvitePress}
                        buttonStyle={styles.button}
                        title='CREAR INVITACIÓN'
                        fontSize={fontSize.text4} />
                </View> */}
            </View>
        )
    }
}

export default EventCardMedium;