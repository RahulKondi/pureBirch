/* @flow */

import React, { Component } from 'react';
import ReactNative from 'react-native';
import shallowEqual from 'shallowequal';
import Colors from '../../Colors';
import AppText from './AppText';
import Loading from './Loading';

const {
	StyleSheet,
	View,
	Image
} = ReactNative;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.primary
	},
	logo: {
		flex: 1,
		resizeMode: 'contain',
		marginTop: 180
	},
	loading: {
		height: 24,
		width: 24,
		marginHorizontal: 16,
		marginVertical: 32
	},
	attribution: {
		alignItems: 'center',
		alignSelf: 'stretch',
		margin: 16
	},
	by: {
		color: Colors.fadedWhite,
		paddingHorizontal: 4
	},
	scrollback: {
		resizeMode: 'contain'
	}
});

export default class Splash extends Component<void, any, void> {
	shouldComponentUpdate(nextProps: any): boolean {
		return !shallowEqual(this.props, nextProps);
	}

	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.logo} source={require('../../../../assets/logo.png')} />
				<Loading style={styles.loading} />
				<View style={styles.attribution}>
					<AppText style={styles.by}>by</AppText>
					<Image style={styles.scrollback} source={require('../../../../assets/scrollback_logo.png')} />
				</View>
			</View>
		);
	}
}
