import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from "react-redux";
import styles from "./styles";
import { getFormalDate } from "../../utils/date";
import LocationButton from "../components/LocationButton";

class EventCardCreateInvitation extends PureComponent {

    onPressViewEvent = () => {
        const { eventInvitation } = this.props;
        this.props.onPressViewEvent(eventInvitation);
    }

    render() {
        const { backgroundColor, eventInvitation } = this.props;
        const { title, realizationDate, place, image } = eventInvitation;

        return (
            <TouchableWithoutFeedback onPress={this.onPressViewEvent}>
                <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                    <View>
                        <Image
                            style={styles.image}
                            resizeMode='cover'
                            source={{ uri: image }}
                        />
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginHorizontal: 10, flex: 2 }}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.realizationDate}>{getFormalDate(realizationDate)}</Text>
                        <LocationButton place={place} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default connect(null, {})(EventCardCreateInvitation);