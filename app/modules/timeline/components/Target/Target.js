import React from 'react';
import { 
    View, Text, 
    Switch,
} from 'react-native';
import { Badge } from 'react-native-elements';
// import { FontAwesome } from '@expo/vector-icons';

import { targetUsers } from '../../../shared/constants';
import styles, { color } from "./styles";

class Target extends React.Component {

    state = {
        target: null,
    };

    componentWillMount() {
        this.onChangeTargetUsers(targetUsers.BOTH);
    }

    onChangeTargetUsers = (target) => {
        this.setState({
            target
        }, () => this.props.onChangeTargetUsers({target}));
    }

    render() {
        const { target } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.genderUsers}>
                    <Text style={styles.titleHasQuota}>Público objetivo</Text>
                    <View style={styles.genderUsersItems}>
                        <Badge 
                            containerStyle={{ 
                                backgroundColor: target === targetUsers.BOTH ? color.orange : color.white,
                                marginHorizontal: 5
                            }}
                            textStyle={{ color: target === targetUsers.BOTH ? color.white : color.black}}
                            value='Ambos'
                            onPress={() => this.onChangeTargetUsers(targetUsers.BOTH)} />
                        <Badge 
                            containerStyle={{ 
                                backgroundColor: target === targetUsers.MAN ? color.orange : color.white,
                                marginHorizontal: 5
                            }}
                            textStyle={{ color: target === targetUsers.MAN ? color.white : color.black}}
                            value='Hombres'
                            onPress={() => this.onChangeTargetUsers(targetUsers.MAN)} />
                        <Badge 
                            containerStyle={{ 
                                backgroundColor: target === targetUsers.WOMAN ? color.orange : color.white,
                                marginHorizontal: 5
                            }}
                            textStyle={{ color: target === targetUsers.WOMAN ? color.white : color.black}}
                            value='Mujeres'
                            onPress={() => this.onChangeTargetUsers(targetUsers.WOMAN)} />
                    </View>
                </View>
                {/* <View style={styles.bodyQuota}>
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
                </View> */}
            </View>
        )
    }
}

export default Target;