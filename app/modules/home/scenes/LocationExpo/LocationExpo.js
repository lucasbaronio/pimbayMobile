import React from 'react';
import { connect } from 'react-redux';

import { Platform, Text, View } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';

import styles from "./styles";

class LocationExpo extends React.Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    } else {
      return null;
    }

    // let latitude = this.state.location ? this.state.location.coords.latitude : 37.78825;
    // let longitude = this.state.location ? this.state.location.coords.longitude : -122.4324;

    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsMyLocationButton={true}
        showsUserLocation={true}
      >
        <MapView.Marker
            key={1}
            coordinate={{latitude: -34.9038862, longitude: -56.1906814}}
            title={"Universidad ORT"}
            description={"La ortttttt descripcion"}
        />;
      </MapView>
    );
  }
}

export default connect(null, {})(LocationExpo);