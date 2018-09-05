import React, { PureComponent } from 'react';
import { View, Text, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Button as ButtonElements } from 'react-native-elements';
import LocationButton from "../components/LocationButton";
import styles, { fontSize } from "./styles";
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
                <TouchableWithoutFeedback onPress={this.onPressViewEvent}>
                    <ImageBackground
                        source={{ uri: item.image }}
                        imageStyle={{ borderRadius: 10 }}
                        style={styles.image} >
                        <View style={styles.buttonView}>
                            <ButtonElements
                                backgroundColor='#DE5134'
                                onPress={this.onInvitePress}
                                buttonStyle={styles.button}
                                title='CREAR INIVTACIÓN'
                                fontSize={fontSize.text4} />
                        </View>
                    </ImageBackground>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onPressViewEvent}>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={styles.eventDetail} onPress={this.onPressViewEvent}>
                    <View style={styles.eventDetail}>
                        <Text style={styles.realizationDate}>
                            {getFormalDate(item.realizationDate)}
                        </Text>
                        <LocationButton place={item.place} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

export default EventCardMedium;