import React from 'react';
import { Text } from 'react-native';

class Time extends React.Component {
	render() {
		return (
			<Text style={{
				fontSize: 10,
				position: 'absolute',
                color: (this.props.direction === 'in') 
                        ? 'rgba(0, 0, 0, 0.63)' 
                        :'rgba(255, 255, 255, 0.80)',
				right: 2,
				bottom: 2 }} >
				{this.props.time.toLocaleString()}
			</Text>
		)
	}
}

export default Time;