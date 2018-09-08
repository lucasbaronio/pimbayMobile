import React, { Component } from 'react';
import { View, ActivityIndicator, Text, ScrollView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MapView } from 'expo';
import { actions as eventDetailActions } from "../index";
const { getEvent } = eventDetailActions;
import { getCompleteFormalDate } from "../../shared/utils/date";

import { connect } from 'react-redux';
import styles from './styles';
import { theme } from "../../index";
const { fontSize, color, windowWidth, windowHeight } = theme;
import LocationButton from "../../shared/Event/components/LocationButton";
const ASPECT_RATIO = windowWidth / windowHeight;

class EventDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMore: false
        }
    }

    componentWillMount() {
        console.log(this.props);
    }

    render() {
        const latitude = -34.9076753;
        const longitude = -56.2011147;
        const { title, realizationDate, place, image, categories, description } = this.props.item;

        return (
            <ScrollView style={{ backgroundColor: color.white }}>
                <View>
                    <Image source={{ uri: image }} style={{ height: 200, width: windowWidth, alignSelf: 'stretch' }}></Image>
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: theme.fontSize.text1, fontFamily: theme.fontFamily.bold, marginBottom: 5 }}>{title}</Text>
                    <Text style={{ fontSize: theme.fontSize.text4, fontFamily: theme.fontFamily.regular, marginBottom: 5 }}>{getCompleteFormalDate(realizationDate)}</Text>
                    <LocationButton place={place} ellipsizeText={false} />
                </View>
                <View
                    style={{
                        marginTop: 5,
                        marginBottom: 5,
                        borderBottomColor: theme.color.grey,
                        borderBottomWidth: 0.25,
                    }}
                />
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: theme.fontSize.text4, fontFamily: theme.fontFamily.bold, marginBottom: 5 }}>Detalles</Text>
                    <View>
                        <Text style={{ fontSize: theme.fontSize.text4, fontFamily: theme.fontFamily.regular }}>
                            {
                                (this.state.showMore)
                                    ? description
                                    : description.substring(0, 200) + '...'
                            }
                        </Text>
                        <Text
                            style={{ fontSize: theme.fontSize.text4, fontFamily: theme.fontFamily.regular, color: color.grey }}
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
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: theme.fontSize.text4, fontFamily: theme.fontFamily.bold, marginBottom: 5 }}>Mapa</Text>
                    <Text style={{ fontSize: theme.fontSize.text4, fontFamily: theme.fontFamily.bold, marginLeft: 5, marginBottom: 5 }}>{place}</Text>
                    <View pointerEvents="none">
                        <MapView
                            style={{ marginHorizontal: 5, height: 250, width: (windowWidth - 30) }}
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