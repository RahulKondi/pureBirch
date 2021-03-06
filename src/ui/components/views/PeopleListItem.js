/* @flow */

import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import shallowEqual from 'shallowequal';
import Colors from '../../Colors';
import AppText from './AppText';
import AvatarRound from './AvatarRound';
import TouchFeedback from './TouchFeedback';
import type { User } from '../../../lib/schemaTypes';

const {
	StyleSheet,
	PixelRatio,
	View
} = ReactNative;

const styles = StyleSheet.create({
	item: {
		backgroundColor: Colors.white,
		borderColor: Colors.separator,
		borderBottomWidth: 1 / PixelRatio.get()
	},
	person: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		marginHorizontal: 16,
		marginVertical: 12
	},
	nick: {
		flex: 1
	},
	nickText: {
		color: Colors.darkGrey
	},
	status: {
		fontSize: 12,
		lineHeight: 18,
		marginHorizontal: 16,
		paddingHorizontal: 4,
		color: Colors.darkGrey
	},
	online: {
		color: Colors.success,
		fontWeight: 'bold'
	},
	offline: {
		opacity: 0.5
	}
});

type Props = {
	user: User;
	status: 'online' | 'offline';
}

export default class PeopleListItem extends Component<void, Props, void> {
	static propTypes = {
		user: PropTypes.shape({
			id: PropTypes.string.isRequired
		}),
		status: PropTypes.string
	};

	shouldComponentUpdate(nextProps: Props): boolean {
		return !shallowEqual(this.props, nextProps);
	}

	render() {
		const {
			user,
			status
		} = this.props;

		return (
			<View style={styles.item}>
				<TouchFeedback>
					<View style={styles.person}>
						<AvatarRound
							style={styles.avatar}
							size={36}
							user={user.id}
						/>
						<View style={styles.nick}>
							<AppText style={[ styles.nickText, status !== 'online' ? styles.offline : null ]}>
								{user.id}
							</AppText>
						</View>
						<View>
							<AppText style={[ styles.status, status === 'online' ? styles.online : styles.offline ]}>
								{status.toUpperCase()}
							</AppText>
						</View>
					</View>
				</TouchFeedback>
			</View>
		);
	}
}
