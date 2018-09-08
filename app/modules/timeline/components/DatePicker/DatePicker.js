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

import styles from "./styles";
import ActionModal from '../ActionSheetDatePicker/ActionModal';
import moment from 'moment';
import { getFormalDate } from '../../../shared/utils/date';
import DividerOpenInvitation from '../../../../assets/dividerOpenInvitation.png';

class DatePicker extends React.Component {

    state = {
        dueDate: new Date(),
        toggleDatePickerVisible: false,
        dayTimerDueDate: 0,
        hoursTimerDueDate: 1,
        minsTimerDueDate: 0,
        switchToEventDate: true,
    };

    componentWillMount() {
        const { eventDate } = this.props;
        if (eventDate) {
            var eventDateConverted = new Date(moment(eventDate).format());
            this.setState({dueDate: eventDateConverted});
            this.props.onChangeDueDate(eventDateConverted);
        } else {
            var dueDate = this.state.dueDate;
            dueDate.setHours(dueDate.getHours() + 1);
            this.setState({dueDate: dueDate});
            this.props.onChangeDueDate(dueDate);
        }
    }

    calculateTimerDueDate = () => {
        const { dueDate } = this.state;
        var seconds = Math.floor((dueDate - (new Date()))/1000);
        var minutes = Math.floor(seconds/60);
        var hours = Math.floor(minutes/60);
        var days = Math.floor(hours/24);

        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

        if (days >= 0) {
            this.setState({
                dayTimerDueDate: days,
                hoursTimerDueDate: hours,
                minsTimerDueDate: minutes,
            });
            this.props.onChangeDueDate(dueDate);
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
                    onCancel={this.onPressTimerDueDate}
                    buttonText="Aceptar"
                >
                    <View style={styles.datePickerIOSContainer}>
                        <Text style={styles.datePickerIOSTitle}>
                            Fecha de vencimiento:
                        </Text>
                        <DatePickerIOS 
                            date={this.state.dueDate} 
                            onDateChange={(newDate) => {
                                this.setState({
                                    dueDate: newDate
                                }, () => this.calculateTimerDueDate())
                            }}
                            minimumDate={new Date()}
                            minuteInterval={10}
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
                        title={formatDateFromDate(this.state.dueDate)}
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <View style={{flex: 1, margin: 5}}>
                    <Button
                        onPress={this.renderTimePickerAndroid}
                        title={formatTimeFromDate(this.state.dueDate)}
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>
        );
    }

    renderDatePickerAndroid = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Month 0 is January.
                date: this.state.dueDate,
                minDate: new Date(),
                mode: 'spinner'
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                const { dueDate } = this.state;
                const hours = dueDate.getHours();
                const mins = dueDate.getMinutes();
                var newDueDate = new Date(year, month, day, hours, mins);
                this.setState({
                    dueDate: newDueDate
                }, () => this.calculateTimerDueDate());
            }
        } catch ({code, message}) {
            console.warn('No podemos abrir el DatePicker', message);
        }
    }

    renderTimePickerAndroid = async () => {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: this.state.dueDate.getHours(),
                minute: this.state.dueDate.getMinutes(),
                is24Hour: true,
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                // Selected hour (0-23), minute (0-59)
                const { dueDate } = this.state;
                const year = dueDate.getFullYear();
                const month = dueDate.getMonth();
                const day = dueDate.getDate();
                var newDueDate = new Date(year, month, day, hour, minute);
                if (newDueDate > dueDate) {
                    this.setState({
                        dueDate: newDueDate
                    }, () => this.calculateTimerDueDate());
                } else {
                    Alert.alert(
                        'Fecha de vencimiento',
                        'La fecha de vencimiento no puede ser anterior a la actual.',
                    )
                }
            }
        } catch ({code, message}) {
            console.warn('No podemos abrir el TimePicker', message);
        }
    }

    onPressTimerDueDate = () => {
        this.setState({
            toggleDatePickerVisible: !this.state.toggleDatePickerVisible
        })
    }

    onSwitchToEventDate = () => {
        const { dueDate } = this.state;
        const { eventDate } = this.props;
        this.setState({
            switchToEventDate: !this.state.switchToEventDate
        }, () => this.props.onChangeDueDate(
                this.state.switchToEventDate 
                ? new Date(moment(eventDate).format())
                : dueDate
            )
        );
    }

    renderDueDate = () => {
        const { toggleDatePickerVisible, dayTimerDueDate, hoursTimerDueDate, minsTimerDueDate } = this.state;
        return (
            <View>
                <TouchableOpacity 
                    style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                    onPress={this.onPressTimerDueDate}>
                    <Text style={styles.text}>Luego de: </Text>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={styles.timerDueDate}>
                            {(dayTimerDueDate > 0) && `${dayTimerDueDate} días, `}
                            {(hoursTimerDueDate > 0) && `${hoursTimerDueDate} hrs, `}
                            {minsTimerDueDate} mins
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
                <Text style={styles.titleTimerDueDate}>Cuando se vence?</Text>
                {
                    !!eventDate 
                    ? <View>
                        <View style={styles.toEventDate}>
                            <View>
                                <Text style={[
                                    styles.text, 
                                    !this.state.switchToEventDate && styles.textDisable
                                ]}>
                                    El mismo día del evento ({getFormalDate(eventDate)})
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
                                {this.renderDueDate()}
                            </View>
                        }
                    </View>
                    : this.renderDueDate()
                }
            </View>
        )
    }
}

export default DatePicker;