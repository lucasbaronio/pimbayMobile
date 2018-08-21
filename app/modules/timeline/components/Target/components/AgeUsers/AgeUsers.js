import React from 'react';
import { 
    View, Text, 
    Picker,
} from 'react-native';
import { Badge } from 'react-native-elements';
// import { FontAwesome } from '@expo/vector-icons';

import { targetUsers } from '../../../../../shared/constants';
import styles, { color } from "./styles";

class AgeUsers extends React.Component {

    state = {
        rankAges: [],
        minAge: null,
        minAge: null,
    };

    // componentWillMount() {

    // }

    componentDidMount() {
        var ages = ['18-22','23-27','28-32','33-37','+38'];
        var rankAges = [];
        for (i = 0; i < ages.length; i++) {
            const item = {
                key: i,
                value: ages[i],
                selected: false,
                minAge: (ages[i].includes('+')) ? ages[i].split("+")[1] : ages[i].split("-")[0],
                maxAge: (ages[i].includes('+')) ? ages[i].split("+")[1] : ages[i].split("-")[1]
            };
            rankAges.push(item);
        }
        this.setState({rankAges: rankAges});
    }

    onChangeItemSelected = (key) => {
        const { rankAges } = this.state;
        var rankAgesCopy = rankAges;
        if (rankAgesCopy[key].selected) {
            for(i = key; i < rankAgesCopy.length; i++) {
                rankAgesCopy[i].selected = false;
            }
        } else {
            rankAgesCopy[key].selected = true;
            var isFalse = false;
            for (i = key+1; i < rankAgesCopy.length; i++) {
                if (isFalse || !rankAges[i].selected) {
                    isFalse = true;
                    rankAgesCopy[i].selected = false;
                }
            }
            isFalse = false;
            for (i = key-1; i >= 0; i--) {
                if (isFalse || !rankAges[i].selected) {
                    isFalse = true;
                    rankAgesCopy[i].selected = false;
                }
            }
        }
        var minAge = this.calculateMinAge(rankAgesCopy);
        var maxAge = this.calculateMaxAge(rankAgesCopy);
        this.setState({
            rankAges: rankAgesCopy,
            minAge,
            maxAge,
        }, () => this.props.onChangeRankAges({minAge, maxAge}));
    }

    calculateMinAge = (rankAgesCopy) => {
        for(i = 0; i < rankAgesCopy.length; i++) {
            if (rankAgesCopy[i].selected) {
                return rankAgesCopy[i].minAge;
            }
        }
        return null;
    }

    calculateMaxAge = (rankAgesCopy) => {
        for(i = rankAgesCopy.length-1; i >= 0; i--) {
            if (rankAgesCopy[i].selected) {
                return rankAgesCopy[i].maxAge;
            }
        }
    }

    renderItem = ({key, value, selected}) => {
        return (
            <Badge 
                key={key}
                containerStyle={{ 
                    backgroundColor: selected ? color.orange : color.white,
                    marginHorizontal: 1,
                    marginVertical: 5
                }}
                textStyle={{ color: selected ? color.white : color.black}}
                value={value}
                onPress={() => this.onChangeItemSelected(key)} />
        );
    }

    render() {
        const { rankAges } = this.state;
        return(
            <View style={styles.container}>
                {
                    rankAges.map((item) => (
                        this.renderItem({
                            key: item.key, 
                            value: item.value,
                            selected: item.selected
                        })
                    ))
                }
            </View>
        )
    }
}

export default AgeUsers;