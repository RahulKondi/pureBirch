/* @flow */

import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import shallowEqual from 'shallowequal';
import Colors from '../../Colors';
import CloseButton from './CloseButton';
import ImageUploadButton from './ImageUploadButton';

const {
	StyleSheet,
	View,
	Image
} = ReactNative;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		padding: 8
	},
	thumbnailContainer: {
		elevation: 4
	},
	thumbnailStyle: {
		alignItems: 'flex-end',
		justifyContent: 'flex-end'
	},
	iconIdle: {
		color: Colors.fadedBlack,
		marginRight: 13,
		marginLeft: 19
	},
	iconError: {
		marginTop: 14,
		marginBottom: 18
	},
	closeButton: {
		position: 'absolute',
		top: -8,
		left: -8
	}
});

type Props = {
	photo: {
		name: string;
		uri: string;
		height: number;
		width: number;
		size: number;
	};
	status: 'loading' | 'idle' | 'error';
	startUpload: Function;
	cancelUpload: Function;
	closeUpload: Function;
	style?: any;
}

export default class ImageUploadChat extends Component {
	static propTypes = {
		photo: PropTypes.shape({
			name: PropTypes.string.isRequired,
			uri: PropTypes.string.isRequired,
			height: PropTypes.number.isRequired,
			width: PropTypes.number.isRequired,
			size: PropTypes.number.isRequired
		}).isRequired,
		status: PropTypes.string.isRequired,
		startUpload: PropTypes.func.isRequired,
		cancelUpload: PropTypes.func.isRequired,
		closeUpload: PropTypes.func.isRequired,
		style: View.propTypes.style,
	};

	shouldComponentUpdate(nextProps: Props): boolean {
		return !shallowEqual(this.props, nextProps);
	}

	_onClose: Function = () => {
		this.props.closeUpload();
	};

	_handlePress: Function = () => {
		switch (this.props.status) {
		case 'idle':
		case 'error':
			this.props.startUpload();
			break;
		case 'loading':
			this.props.cancelUpload();
			break;
		}
	};

	render() {
		const {
			uri,
			height,
			width
		} = this.props.photo;

		return (
			<View {...this.props} style={[ styles.container, this.props.style ]}>
				<View style={styles.thumbnailContainer}>
					<Image source={{ uri, height: (height / width) * 160, width: 160 }} style={styles.thumbnailStyle}>
						<ImageUploadButton
							onPress={this._handlePress}
							status={this.props.status}
							idleIcon='send'
							closeIcon='close'
							doneIcon='done'
							errorIcon='warning'
							idleIconStyle={styles.iconIdle}
							errorIconStyle={styles.iconError}
						/>
					</Image>
				</View>

				<CloseButton onPress={this._onClose} style={styles.closeButton} />
			</View>
		);
	}
}
