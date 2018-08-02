import React from 'react';
import { View, Text, DatePickerIOS, DatePickerAndroid, Platform, TouchableOpacity } from 'react-native';

import styles from "./styles";

class DatePicker extends React.Component {

    state = {
        dueDate: new Date(),
        toggleDatePickerVisible: false,
        dayTimerDueDate: 0,
        hoursTimerDueDate: 1,
        minsTimerDueDate: 0,
    };

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
        }
    }

    renderDatePicker = () => {
        return (Platform.OS === 'ios')
        ? this.renderDatePickerIOS()
        : this.renderDatePickerAndroid() 
    }

    renderDatePickerIOS = () => {
        return (
            <View style={styles.datePickerIOS}>
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
        );
    }

    renderDatePickerAndroid = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Month 0 is January.
                date: new Date(),
                minDate: new Date(),
                mode: 'spinner'
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    onPressTimerDueDate = () => {
        this.setState({
            toggleDatePickerVisible: !this.state.toggleDatePickerVisible
        })
    }

    render() {
        const { toggleDatePickerVisible, dayTimerDueDate, hoursTimerDueDate, minsTimerDueDate } = this.state;
        return(
            <View style={styles.container}>
                <Text style={styles.titleTimerDueDate}>Invitación se vence en:</Text>
                <TouchableOpacity onPress={this.onPressTimerDueDate}>
                    <Text style={styles.timerDueDate}>
                        {(dayTimerDueDate > 0) && `${dayTimerDueDate} días, `}
                        {(hoursTimerDueDate > 0) && `${hoursTimerDueDate} hrs, `}
                        {minsTimerDueDate} mins
                    </Text>
                </TouchableOpacity>
                {!!toggleDatePickerVisible && this.renderDatePicker()}
            </View>
        )
    }
}

export default DatePicker;