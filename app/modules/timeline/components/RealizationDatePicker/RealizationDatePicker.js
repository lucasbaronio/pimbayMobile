import React from 'react';
import { 
    View, Text, 
    DatePickerIOS, 
    DatePickerAndroid, 
    TimePickerAndroid, 
    Platform, 
    TouchableOpacity,
    Button, Image,
    Alert, Switch
} from 'react-native';

import { formatDateFromDate, formatTimeFromDate } from '../../../shared/utils/date';

import styles, { color } from "./styles";
import ActionModal from '../ActionSheetDatePicker/ActionModal';
import moment from 'moment';
import { getFormalDate } from '../../../shared/utils/date';
import DividerOpenInvitation from '../../../../assets/dividerOpenInvitation.png';

class RealizationDatePicker extends React.Component {

    state = {
        realizationDate: new Date(),
        toggleDatePickerVisible: false,
        switchToEventDate: true,
    };

    componentWillMount() {
        const { eventDate } = this.props;
        if (eventDate) {
            var eventDateConverted = new Date(moment(eventDate).format());
            this.setState({realizationDate: eventDateConverted});
            this.props.onChangeRealizationDate(eventDateConverted);
        } else {
            var realizationDate = this.state.realizationDate;
            realizationDate.setHours(realizationDate.getHours() + 3);
            this.setState({realizationDate: realizationDate});
            this.props.onChangeRealizationDate(realizationDate);
        }
    }

    renderDatePicker = () => {
        return (Platform.OS === 'ios')
        ? this.renderDatePickerIOS()
        : this.renderButtonAndroid() 
    }

    renderDatePickerIOS = () => {
        const { toggleDatePickerVisible } = this.state;
        return (
            <View>
                <ActionModal 
                    modalVisible={Platform.OS === 'ios' && toggleDatePickerVisible} 
                    onCancel={this.onPressRealizationDatePicker}
                    buttonText="Aceptar"
                >
                    <View style={styles.datePickerIOSContainer}>
                        <Text style={styles.datePickerIOSTitle}>
                            Cuando se hace?
                        </Text>
                        <DatePickerIOS 
                            date={this.state.realizationDate} 
                            onDateChange={(newDate) => {
                                this.setState({
                                    realizationDate: newDate 
                                }, this.props.onChangeRealizationDate(newDate))
                            }}
                            minimumDate={new Date()}
                            minuteInterval={15}
                        />
                    </View>
                </ActionModal>
            </View>
        );
    }

    renderButtonAndroid = () => {
        return (
            <View style={styles.buttonAndroid}>
                <View style={{flex: 1, margin: 5}}>
                    <Button
                        onPress={this.renderDatePickerAndroid}
                        title={formatDateFromDate(this.state.realizationDate)}
                        color={color.orange}
                    />
                </View>
                <View style={{flex: 1, margin: 5}}>
                    <Button
                        onPress={this.renderTimePickerAndroid}
                        title={formatTimeFromDate(this.state.realizationDate)}
                        color={color.orange}
                    />
                </View>
            </View>
        );
    }

    renderDatePickerAndroid = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Month 0 is January.
                date: this.state.realizationDate,
                minDate: new Date(),
                mode: 'spinner'
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                const { realizationDate } = this.state;
                const hours = realizationDate.getHours();
                const mins = realizationDate.getMinutes();
                var newRealizationDate = new Date(year, month, day, hours, mins);
                this.setState({
                    realizationDate: newRealizationDate 
                }, this.props.onChangeRealizationDate(newRealizationDate));
            }
        } catch ({code, message}) {
            console.warn('No podemos abrir el DatePicker', message);
        }
    }

    renderTimePickerAndroid = async () => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: this.state.realizationDate.getHours(),
                minute: this.state.realizationDate.getMinutes(),
                is24Hour: true,
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                // Selected hour (0-23), minute (0-59)
                const { realizationDate } = this.state;
                const year = realizationDate.getFullYear();
                const month = realizationDate.getMonth();
                const day = realizationDate.getDate();
                var newRealizationDate = new Date(year, month, day, hour, minute);
                if (newRealizationDate > realizationDate) {
                    this.setState({
                        realizationDate: newRealizationDate 
                    }, this.props.onChangeRealizationDate(newRealizationDate))
                } else {
                    Alert.alert(
                        'Fecha de realización',
                        'La fecha de realización no puede ser anterior a la actual.',
                    )
                }
            }
        } catch ({code, message}) {
            console.warn('No podemos abrir el TimePicker', message);
        }
    }

    onPressRealizationDatePicker = () => {
        this.setState({
            toggleDatePickerVisible: !this.state.toggleDatePickerVisible
        })
    }

    onSwitchToEventDate = () => {
        const { realizationDate } = this.state;
        const { eventDate } = this.props;
        this.setState({
            switchToEventDate: !this.state.switchToEventDate
        }, () => this.props.onChangeRealizationDate(
                this.state.switchToEventDate 
                ? new Date(moment(eventDate).format())
                : realizationDate
            )
        );
    }

    renderRealizationDate = () => {
        const { toggleDatePickerVisible, realizationDate } = this.state;
        return (
            <View>
                <TouchableOpacity 
                    style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                    onPress={this.onPressRealizationDatePicker}>
                    <Text style={styles.text}>Seleccione una fecha: </Text>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={styles.realizationDate}>
                            {
                                getFormalDate(realizationDate)
                            }
                        </Text>
                    </View>
                </TouchableOpacity>
                {
                    !!toggleDatePickerVisible && 
                    this.renderDatePicker()
                }
            </View>
        )
    }

    render() {
        const { eventDate } = this.props;
        return(
            <View style={styles.container}>
                <Text style={styles.titleRealizationDate}>Cuando se hace?</Text>
                {
                    !!eventDate 
                    ? <View>
                        <View style={styles.toEventDate}>
                            <View>
                                <Text style={[
                                    styles.text, 
                                    !this.state.switchToEventDate && styles.textDisable
                                ]}>
                                    Misma fecha del evento ({getFormalDate(eventDate)})
                                </Text>
                            </View>
                            <View>
                                <Switch
                                    onValueChange={this.onSwitchToEventDate}
                                    value={this.state.switchToEventDate}/>
                            </View>
                        </View>
                        {
                            !this.state.switchToEventDate &&
                            <View>
                                <View>
                                    <Image
                                        style={styles.dividerImageStyle}
                                        source={DividerOpenInvitation} />
                                </View>
                                {this.renderRealizationDate()}
                            </View>
                        }
                    </View>
                    : this.renderRealizationDate()
                }
            </View>
        )
    }
}

export default RealizationDatePicker;