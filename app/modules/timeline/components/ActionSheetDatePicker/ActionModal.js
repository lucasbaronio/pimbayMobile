import React from 'react';
import { 
  Modal, 
  View, 
  StyleSheet, 
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Button from './Button';

const AnimatableTouchableWithoutFeedback = Animatable.createAnimatableComponent(TouchableWithoutFeedback);

class ActionModal extends React.Component {

  state = {
    visible: this.props.visible,
    animationType: this.props.animationType,
    overlayAnimationType: 'fadeIn'
  };

  componentWillReceiveProps (newProps) {
    this.setState({visible: newProps.visible, animationType: newProps.animationType});
  }

  _hideModal = () => {
    const {animationOutType, animationDuration, onClose} = this.props;
    this.setState({animationType: animationOutType, overlayAnimationType: animationOutType});
    let timer = setTimeout(() => {
      onClose();
      clearTimeout(timer);
      this.setState({overlayAnimationType: 'fadeIn'});
    }, animationDuration - 100);
  }

  _stopPropagation = (e) => e.stopPropagation()

  render() {
    return (
      <Modal
        transparent
        visible={this.props.modalVisible}
        onRequestClose={this._hideModal}
        animationType='slide'>
        <TouchableWithoutFeedback onPress={this._hideModal}>
          <Animatable.View animation={this.state.overlayAnimationType} duration={500} easing={null}
              style={[styles.modalContainer, {backgroundColor: 'rgba(0, 0, 0, 0.50)'}]} 
              useNativeDriver>
            <AnimatableTouchableWithoutFeedback animation={this.state.animationType} easing={null}
              duration={500} onPress={this._stopPropagation} useNativeDriver>
              <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.container} onPress={this.props.onCancel}></TouchableOpacity>
                {this.props.children}
                <Button onPress={this.props.onCancel} text={this.props.buttonText || "Cancel"} />
              </View>
            </AnimatableTouchableWithoutFeedback>
          </Animatable.View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalContainer: {
    flex: 1,
    padding: 8,
    paddingBottom: 0,
    justifyContent: "flex-end"
  }
});

export default ActionModal;