import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';

import { actions as home } from "../../index";
// const { getEventsOrInvitations } = home;

import styles from "./styles";
// import Quote from "../../components/Quote";

class Timeline extends React.Component {
    constructor() {
        super();
        this.state = {}

        // this.renderItem = this.renderItem.bind(this);
    }

    // componentDidMount() {
    //     this.props.getEventsOrInvitations((error) => alert(error.message))
    // }

    // renderItem({item, index}) {
    //     return <Quote index={index}/>
    // }

    render() {
        // if (this.props.isLoading){
        //     return(
        //         <View style={styles.activityIndicator}>
        //             <ActivityIndicator animating={true}/>
        //         </View>
        //     )
        // }else{
            return (
                <View style={styles.container}>
                    <Text>Vacio</Text>
                    {/* <FlatList
                        ref='listRef'
                        data={this.props.eventsOrInvitations}
                        renderItem={this.renderItem}
                        initialNumToRender={5}
                        keyExtractor={(item, index) => index.toString()}/> */}
                </View>
            );
        // }
    }
}

// function mapStateToProps(state, props) {
//     return {
//         isLoading: state.timelineReducer.isLoading,
//         eventsOrInvitations: state.timelineReducer.eventsOrInvitations
//     }
// }

// export default connect(mapStateToProps, { getEventsOrInvitations })(Timeline);
export default connect(null, { })(Timeline);