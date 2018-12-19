import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Button as ButtonElements } from 'react-native-elements';
import LocationButton from "../components/LocationButton";
import { getCompleteFormalDate } from "../../utils/date";
import styles, { color, fontSize } from './styles';

class EventDetail extends Component {

    state = {
        showMore: false
    }

    onInvitePress = () => {
        const { item } = this.props;
        this.props.onPressCreateInvitation(item);
    }

    render() {
        const latitude = -34.9076753;
        const longitude = -56.2011147;
        const { title, realizationDate, place, image, categories, description, onPressCreateInvitation } = this.props.item;

        return (
            <ScrollView style={styles.scrollViewStyle}>
                <View>
                    <Image source={{ uri: image }} style={styles.eventImageStyle}></Image>
                </View>
                <View style={styles.eventInfoContainerStyle}>
                    <Text style={styles.eventTitleStyle}>{title}</Text>
                    <Text style={styles.eventDateStyle}>{getCompleteFormalDate(realizationDate)}</Text>
                    <LocationButton place={place} ellipsizeText={false} />
                </View>
                {
                    !!onPressCreateInvitation &&
                    <View style={styles.buttonView}>
                        <ButtonElements
                            backgroundColor={color.orange}
                            onPress={this.onInvitePress}
                            buttonStyle={styles.button}
                            title='CREAR INVITACIÓN'
                            fontSize={fontSize.text3} />
                    </View>
                }
                <View style={styles.dividerLineViewStyle} />
                <View style={styles.eventDetailContainerStyle}>
                    <Text style={styles.eventDetailHeaderStyle}>Detalles</Text>
                    <View>
                        <Text style={styles.eventDetailDescriptionStyle}>
                            {
                                (this.state.showMore)
                                    ? description
                                    : description.substring(0, 200) + '...'
                            }
                        </Text>
                        <Text
                            style={styles.eventDescriptionViewMoreStyle}
                            onPress={() => this.setState({ showMore: !this.state.showMore })}
                        >
                            {
                                (this.state.showMore)
                                    ? "Ver menos"
                                    : "Ver más"
                            }
                        </Text>
                    </View>
                </View>
                <View style={styles.eventMapViewContainerStyle}>
                    <Text style={styles.eventMapViewHeaderStyle}>Mapa</Text>
                    <Text style={styles.eventMapViewPlaceStyle}>{place}</Text>
                    <View pointerEvents="none">
                        <MapView
                            style={styles.eventMapViewComponentStyle}
                            initialRegion={{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: 0.004757,
                                longitudeDelta: 0.006866,
                            }}
                        >
                            <MapView.Marker
                                coordinate={{ latitude: latitude, longitude: longitude }}
                                title={place}
                            />
                        </MapView>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default connect(null, {})(EventDetail);