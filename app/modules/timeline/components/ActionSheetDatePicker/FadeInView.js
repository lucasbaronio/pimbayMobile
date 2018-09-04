import React from 'react';
import { 
  Animated, 
  Dimensions, 
  StyleSheet,
} from 'react-native';
import { theme } from "../../index"
const { windowWidth, windowHeight } = theme;

// var window = Dimensions.get('window');

class FadeInView extends React.Component {

  state = {
    fadeAnim: new Animated.Value(0)
  }

  componentDidMount() {
    this._animate(this.props);
  }

  componentWillReceiveProps(newProps) {
    this._animate(newProps);
  }

  _animate(newProps){
    return Animated.timing(this.state.fadeAnim, {
      toValue: newProps.visible ? 0.7 : 0,
      duration: 300
    }).start();
  }
  
  render() {
    return (
      <Animated.View style={[styles.overlay,
          {opacity: this.state.fadeAnim},
          {backgroundColor: this.props.backgroundColor || 'black' }
        ]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({
  overlay: {
    flex: 1,
    top: -10,
    bottom: 0,
    left: 0,
    right: 0,
    height: windowHeight,
    width: windowWidth,
    position: 'absolute'
  }
  // overlay: {
  //   flex: 1,
  //   position: 'absolute',
  //   left: 0,
  //   top: 0,
  //   opacity: 0.5,
  //   backgroundColor: 'black',
  //   width: width
  // }  
});

export default FadeInView;