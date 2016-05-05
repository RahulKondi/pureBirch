/* @flow */

import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import shallowEqual from 'shallowequal';
import Colors from '../../Colors';
import AvatarContainer from '../containers/AvatarContainer';

const {
	StyleSheet,
	View
} = ReactNative;

const styles = StyleSheet.create({
	avatar: {
		backgroundColor: Colors.placeholder
	},
	image: {
		flex: 1,
		resizeMode: 'cover'
	}
});

type Props = {
	user: string;
	size: number;
	style?: any;
}

export default class AvatarRound extends Component<void, Props, void> {
	static propTypes = {
		size: PropTypes.number.isRequired,
		user: PropTypes.string.isRequired,
		style: View.propTypes.style
	};

	shouldComponentUpdate(nextProps: Props): boolean {
		return !shallowEqual(this.props, nextProps);
	}

	render() {
		const { size } = this.props;

		return (
			<View {...this.props} style={[ styles.avatar, { height: size, width: size, borderRadius: size / 2 }, this.props.style ]}>
				<AvatarContainer
					size={this.props.size}
					user={this.props.user}
					style={[ styles.image, { borderRadius: size / 2 } ]}
				/>
			</View>
		);
	}
}
