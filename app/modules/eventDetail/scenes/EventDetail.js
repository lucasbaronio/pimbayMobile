import React, { Component } from 'react';
import { View, ActivityIndicator, Text, ScrollView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MapView } from 'expo';
import { actions as eventDetailActions } from "../index";
const { getEvent } = eventDetailActions;

import { connect } from 'react-redux';
import styles from './styles';
import { theme } from "../../index";
const { fontSize, color, windowWidth } = theme;

class EventDetail extends Component {

    componentWillMount() {
        console.log(this.props);
    }

    render() {
        const { title, realizationDate, place, image, categories, description } = this.props.item;
        return (
            <ScrollView style={{ bakgroundColor: color.white }}>
                <View>
                    <Image source={{ uri: image }} style={{ height: 200, width: windowWidth, alignSelf: 'stretch' }}></Image>
                </View>
                <View style={{ bakgroundColor: color.white }}>
                    <Text style={{ bakgroundColor: color.white }}>{title}</Text>
                    <Text style={{ bakgroundColor: color.white }}>{realizationDate}</Text>
                    <Text style={{ bakgroundColor: color.white }}>{place}</Text>
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
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        />
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