import React from 'react';
import {
    View, Text,
    Switch,
    Image,
    TouchableOpacity,
    Picker
} from 'react-native';
import ActionModal from '../ActionSheetDatePicker/ActionModal';
import DividerOpenInvitation from '../../../../assets/dividerOpenInvitation.png';

import styles from "./styles";

class Quota extends React.Component {

    state = {
        switchHasQuota: false,
        toggleQuotaPickerVisible: false,
        quota: 10,
        possibleQuota: [],
        minimumValue: 1,
        maximumValue: 100,
    };

    componentWillMount() {
        this.loadPossibleQuota();
        const { quota, switchHasQuota } = this.state;
        this.props.onChangeQuota({ quota: switchHasQuota ? quota : null, hasQuota: switchHasQuota });
    }

    loadPossibleQuota = () => {
        const { minimumValue, maximumValue } = this.state;
        var possibleQuota = []
        for (var i = minimumValue; i <= maximumValue; i++) {
            possibleQuota.push(i);
        }
        this.setState({ possibleQuota });
    }

    onSwitchHasQuota = () => {
        const { quota } = this.state;
        this.setState({
            switchHasQuota: !this.state.switchHasQuota
        }, () => this.props.onChangeQuota({ quota: this.state.switchHasQuota ? quota : null, hasQuota: this.state.switchHasQuota }));
    }

    renderQuotaPicker = () => {
        const { toggleQuotaPickerVisible } = this.state;
        return (
            <View>
                <ActionModal
                    modalVisible={toggleQuotaPickerVisible}
                    onCancel={this.onPressTogglePicker}
                    buttonText="Aceptar"
                >
                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerTitle}>
                            Elija el cupo límite de la invitación:
                        </Text>
                        <Picker
                            // style={{width: 100}}
                            selectedValue={this.state.quota}
                            onValueChange={(quota) => this.setState({ quota },
                                this.props.onChangeQuota({
                                    quota: this.state.quota, hasQuota: true
                                })
                            )}
                        >
                            {
                                this.state.possibleQuota.map((item, index) => {
                                    return <Picker.Item label={item.toString()} value={item} key={index} />
                                })
                            }
                        </Picker>
                    </View>
                </ActionModal>
            </View>
        );
    }

    onPressTogglePicker = () => {
        this.setState({
            toggleQuotaPickerVisible: !this.state.toggleQuotaPickerVisible
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerQuota}>
                    <View>
                        <Text style={styles.text}>Límite de invitados</Text>
                    </View>
                    <View>
                        <Switch
                            onValueChange={this.onSwitchHasQuota}
                            value={this.state.switchHasQuota} />
                    </View>
                </View>
                {
                    !!this.state.switchHasQuota &&
                    <View>
                        <View>
                            <Image
                                style={styles.dividerImageStyle}
                                // resizeMode='center'
                                source={DividerOpenInvitation} />
                        </View>
                        <TouchableOpacity
                            onPress={this.onPressTogglePicker}
                            style={styles.chooseQuotaView}>

                            <Text style={styles.text}>Límite:</Text>
                            <Text style={styles.text}>{this.state.quota}</Text>
                        </TouchableOpacity>
                        {
                            !!this.state.toggleQuotaPickerVisible &&
                            this.renderQuotaPicker()
                        }
                    </View>
                }
            </View>
        )
    }
}

export default Quota;