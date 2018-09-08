import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { Badge } from 'react-native-elements';

import { targetUsers } from '../../../shared/constants';
import styles, { color } from "./styles";
import AgeUsers from './components/AgeUsers';
import DividerOpenInvitation from '../../../../assets/dividerOpenInvitation.png';

class Target extends React.Component {

    state = {
        target: null,
        minAge: null,
        maxAge: null,
    };

    componentWillMount() {
        this.onChangeTargetUsers(targetUsers.BOTH);
    }

    onChangeTargetUsers = (target) => {
        this.setState({
            target
        }, () => this.props.onChangeTargetUsers({ ...this.state }));
    }

    onChangeRankAges = ({ minAge, maxAge }) => {
        this.setState({
            minAge,
            maxAge
        }, () => this.props.onChangeTargetUsers({ ...this.state }));
    }

    render() {
        const { target } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.genderUsers}>
                    <Text style={styles.title}>Público objetivo</Text>
                    <View style={styles.genderUsersItems}>
                        <Badge
                            containerStyle={{
                                backgroundColor: target === targetUsers.BOTH ? color.orange : color.white,
                                marginHorizontal: 5
                            }}
                            textStyle={{ color: target === targetUsers.BOTH ? color.white : color.black }}
                            value='Ambos'
                            onPress={() => this.onChangeTargetUsers(targetUsers.BOTH)} />
                        <Badge
                            containerStyle={{
                                backgroundColor: target === targetUsers.MAN ? color.orange : color.white,
                                marginHorizontal: 5
                            }}
                            textStyle={{ color: target === targetUsers.MAN ? color.white : color.black }}
                            value='Hombres'
                            onPress={() => this.onChangeTargetUsers(targetUsers.MAN)} />
                        <Badge
                            containerStyle={{
                                backgroundColor: target === targetUsers.WOMAN ? color.orange : color.white,
                                marginHorizontal: 5
                            }}
                            textStyle={{ color: target === targetUsers.WOMAN ? color.white : color.black }}
                            value='Mujeres'
                            onPress={() => this.onChangeTargetUsers(targetUsers.WOMAN)} />
                    </View>
                </View>
                <View>
                    <Image
                        style={styles.dividerImageStyle}
                        // resizeMode='center'
                        source={DividerOpenInvitation} />
                </View>
                <View style={styles.ageUsers}>
                    <Text style={styles.title}>Edad</Text>
                    <AgeUsers onChangeRankAges={this.onChangeRankAges} />
                </View>
            </View>
        )
    }
}

export default Target;