import React from 'react';
import { 
    View, Text, 
    Switch,
} from 'react-native';
import { Slider } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons';

import styles from "./styles";

class Quota extends React.Component {

    state = {
        switchHasQuota: true,
        quota: 10,
        minimumValue: 1,
        maximumValue: 100,
    };

    onSwitchHasQuota = () => {
        this.setState({
            switchHasQuota: !this.state.switchHasQuota
        }, () => this.props.onChangeQuota({quota: null, hasQuota: false}));
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.headerQuota}>
                    <View style={styles.titleHasQuotaView}>
                        <Text style={styles.titleHasQuota}>Con cupo limite?</Text>
                    </View>
                    <View>
                        <Switch
                            style={styles.switchHasQuota}
                            onValueChange={this.onSwitchHasQuota}
                            value={this.state.switchHasQuota}/>
                    </View>
                </View>
                <View style={styles.bodyQuota}>
                    <View>
                        <FontAwesome name="user" size={32} 
                            color={this.state.switchHasQuota ? "black" : "grey"} />
                    </View>
                    <View style={styles.sliderView}>
                        <Slider
                            style={{ flex: 1, alignSelf: 'stretch' }}
                            disabled={!this.state.switchHasQuota}
                            maximumValue={this.state.maximumValue}
                            minimumValue={this.state.minimumValue}
                            thumbTintColor={(this.state.switchHasQuota) ? "#2196F3" : "#90CAF9" }
                            step={1}
                            value={this.state.quota}
                            onValueChange={(quota) => this.setState({quota})} 
                            onSlidingComplete={() => this.props.onChangeQuota({
                                quota: this.state.quota, hasQuota: true
                            })} />
                    </View>
                    <View>
                    <FontAwesome name="users" size={32} 
                            color={this.state.switchHasQuota ? "black" : "grey"} />
                    </View>
                </View>
                <View style={styles.textSliderView}>
                    <Text>{this.state.minimumValue}</Text>
                    {
                        !!this.state.switchHasQuota &&
                        <Text style={styles.colorCurrentQuota}>
                            {this.state.quota + ' personas'}
                        </Text>
                    }
                    <Text>{this.state.maximumValue}</Text>
                </View>
            </View>
        )
    }
}

export default Quota;