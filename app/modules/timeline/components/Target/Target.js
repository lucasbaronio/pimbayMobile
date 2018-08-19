import React from 'react';
import { 
    View, Text, 
    Picker,
} from 'react-native';
import { Badge } from 'react-native-elements';
// import { FontAwesome } from '@expo/vector-icons';

import { targetUsers } from '../../../shared/constants';
import styles, { color } from "./styles";

class Target extends React.Component {

    state = {
        target: null,
        minAge: 18,
        maxAge: 55,
        rankAges: [],
        rankAgesReverse: [],
    };

    componentWillMount() {
        this.onChangeTargetUsers(targetUsers.BOTH);
    }

    componentDidMount() {
        const { minAge, maxAge } = this.state;
        var rankAges = [];
        for(i = minAge; i <= maxAge; i++) {
            rankAges.push(i.toString());
        }
        this.setState({rankAges: rankAges});
        this.setState({rankAgesReverse: [].concat(rankAges).reverse()});
    }

    onChangeTargetUsers = (target) => {
        this.setState({
            target
        }, () => this.props.onChangeTargetUsers({...this.state}));
    }

    onChangeMinAge = (itemValue) => {
        const { maxAge } = this.state;
        if (itemValue <= maxAge) {
            this.setState({
                minAge: itemValue
            }, () => this.props.onChangeTargetUsers({...this.state}));
        }
        // (itemValue <= maxAge) && this.setState({minAge: itemValue})
    }

    onChangeMaxAge = (itemValue) => {
        const { minAge } = this.state;
        if (itemValue >= minAge) {
            this.setState({
                maxAge: itemValue
            }, () => this.props.onChangeTargetUsers({...this.state}));
        }
        // (itemValue >= minAge) && this.setState({maxAge: itemValue})
    }

    render() {
        const { minAge, maxAge, target, rankAges, rankAgesReverse } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.genderUsers}>
                    <Text style={styles.title}>Público objetivo</Text>
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
                <View style={styles.ageUsers}>
                    <Text style={styles.title}>Edad</Text>
                    <View style={styles.ageUsersPicker}>

                        <Picker
                            selectedValue={minAge}
                            style={{flex: 1}}
                            onValueChange={(itemValue, itemIndex) => this.onChangeMinAge(itemValue)}>

                            {rankAges.map( (value) => {
                                return <Picker.Item key={value} value={value} label={value} />
                            })}

                        </Picker>
                        <Text>-</Text>
                        <Picker
                            selectedValue={maxAge}
                            style={{flex: 1}}
                            onValueChange={(itemValue, itemIndex) => this.onChangeMaxAge(itemValue)}>

                            {rankAgesReverse.map( (value) => {
                                return <Picker.Item key={value} value={value} label={value} />
                            })}

                        </Picker>
                    </View>
                </View>
            </View>
        )
    }
}

export default Target;