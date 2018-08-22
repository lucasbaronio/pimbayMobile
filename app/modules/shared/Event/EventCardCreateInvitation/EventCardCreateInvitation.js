import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import { getFormalDate } from "../../utils/date";
import LocationButton from "../components/LocationButton";

class EventCardCreateInvitation extends PureComponent {

    render() {
        const { title, realizationDate, place, image } = this.props.eventInvitation;

        return (
            <View style={styles.container}>
                <View>
                    <Image
                        style={styles.image}
                        resizeMode='cover'
                        source={{ uri: image }}
                    />
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', marginHorizontal: 10 }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.realizationDate}>{getFormalDate(realizationDate)}</Text>
                    <LocationButton place={place} />
                </View>
            </View>
        )
    }
}

export default connect(null, {})(EventCardCreateInvitation);