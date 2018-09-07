import React, { Component } from 'react';
import { View, ActivityIndicator, Text, ScrollView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MapView } from 'expo';
import { actions as eventDetailActions } from "../index";
const { getEvent } = eventDetailActions;

import { connect } from 'react-redux';
import styles from './styles';
import { theme } from "../../index";
const { fontSize, color, windowWidth, windowHeight } = theme;
import LocationButton from "../../shared/Event/components/LocationButton";
const ASPECT_RATIO = windowWidth / windowHeight;

class EventDetail extends Component {

    componentWillMount() {
        console.log(this.props);
    }

    render() {
        const latitude = -34.9076753;
        const longitude = -56.2011147;
        const { title, realizationDate, place, image, categories, description } = this.props.item;
        return (
            <ScrollView style={{ bakgroundColor: color.white }}>
                <View>
                    <Image source={{ uri: image }} style={{ height: 200, width: windowWidth, alignSelf: 'stretch' }}></Image>
                </View>
                <View style={{ bakgroundColor: color.white, padding: 10 }}>
                    <Text style={{ fontSize: theme.fontSize.text1, fontFamily: theme.fontFamily.bold, marginBottom: 5 }}>{title}</Text>
                    <Text style={{ fontSize: theme.fontSize.text4, fontFamily: theme.fontFamily.regular, marginBottom: 5 }}>{realizationDate}</Text>
                    <LocationButton place={place} ellipsizeText={false}/>
                </View>
                <View style={{ height: 1, bakgroundColor: color.grey }} />
                <View>
                    <Text>Detalles</Text>
                    <Text>{description}</Text>
                </View>
                <View style={{ height: 1, bakgroundColor: color.grey }} />
                <View>
                    <Text>Mapa</Text>
                    <Text>{place}</Text>
                    <View pointerEvents="none">
                        <MapView

                            style={{ margin: 20, height: 250, width: (windowWidth - 40) }}
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
function mapStateToProps(state, props) {
    return {
        isLoadingEvent: state.eventDetailReducer.isLoadingEvent,
        event: state.eventDetailReducer.event
    }
}

export default connect(mapStateToProps, { getEvent })(EventDetail);