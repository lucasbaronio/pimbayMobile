import React from 'react';
import { 
  Modal, 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text
} from 'react-native';

import Button from './Button';
// import FadeInView from './FadeInView';
// import { BlurView } from 'expo';
// import Overlay from 'react-native-modal-overlay';


class ActionModal extends React.Component {

  state = {
    toggleVisible: false
  }

  componentWillMount() {
    const { modalVisible } = this.props;
    this.setState({toggleVisible: modalVisible});
  }

  render() {
    return (
      <FadeInView visible={this.props.modalVisible}>
      {/* <Overlay visible={this.state.toggleVisible}
        closeOnTouchOutside={true} animationType="zoomIn"
        onClose={() => this.setState({toggleVisible: false}, this.props.onCancel())}
        containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
        childrenWrapperStyle={{backgroundColor: "transparent"}}
        animationDuration={500}> */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={this.props.onCancel}>
          <View 
            style={styles.modalContainer}
            >
            <TouchableOpacity style={styles.container} onPress={this.props.onCancel}></TouchableOpacity>
            {this.props.children}
            <Button onPress={this.props.onCancel} text={this.props.buttonText || "Cancel"} />
          </View>
        </Modal>
      {/* </Overlay> */}
      </FadeInView>
      
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