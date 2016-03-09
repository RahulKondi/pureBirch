/* @flow */

import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import shallowEqual from 'shallowequal';
import oembed from '../../../modules/oembed/oembed';
import EmbedThumbnail from './EmbedThumbnail';
import EmbedTitle from './EmbedTitle';
import EmbedSummary from './EmbedSummary';

const {
	Linking,
	TouchableOpacity,
	View
} = ReactNative;

type DefaultProps = {
	openOnPress: boolean;
}

type EmbedData = {
	title?: string;
	description?: string;
	height?: number;
	width?: number;
	thumbnail_height?: number;
	thumbnail_width?: number;
	thumbnail_url?: string;
	type: string;
}

type Props = {
	url?: string;
	data?: EmbedData;
	showThumbnail?: boolean;
	showTitle?: boolean;
	showSummary?: boolean;
	openOnPress?: boolean;
	containerStyle?: any;
	thumbnailStyle?: any;
	titleStyle?: any;
	summaryStyle?: any;
}

type State = {
	embed: ?EmbedData;
}

export default class Embed extends Component<DefaultProps, Props, State> {
	static propTypes = {
		data: PropTypes.object,
		url: PropTypes.string.isRequired,
		showThumbnail: PropTypes.bool,
		showTitle: PropTypes.bool,
		showSummary: PropTypes.bool,
		openOnPress: PropTypes.bool,
		containerStyle: View.propTypes.style,
		thumbnailStyle: EmbedThumbnail.propTypes.style,
		titleStyle: EmbedTitle.propTypes.style,
		summaryStyle: EmbedSummary.propTypes.style
	};

	static defaultProps = {
		openOnPress: true
	};

	state: State = {
		embed: null
	};

	componentWillMount() {
		this._fetchData();
	}

	componentDidMount() {
		this._mounted = true;
	}

	shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
		return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	_mounted: boolean;

	_handlePress: Function = () => {
		Linking.openURL(this.props.url);
	};

	_fetchData: Function = () => {
		if (this.props.data) {
			this.setState({
				embed: this.props.data
			});
		} else {
			this._fetchEmbedData(this.props.url);
		}
	};

	_fetchEmbedData: Function = async url => {
		try {
			const embed = await oembed(url);

			if (this._mounted) {
				this.setState({
					embed
				});
			}
		} catch (e) {
			// Ignore
		}
	};

	render() {
		const { embed } = this.state;

		if (typeof embed === 'object' && embed !== null) {
			const {
				showThumbnail,
				showTitle,
				showSummary,
				openOnPress,
				thumbnailStyle,
				titleStyle,
				summaryStyle
			} = this.props;

			const items = [];

			if (showThumbnail !== false && embed.thumbnail_url) {
				items.push(
					<EmbedThumbnail
						key='thumbnail'
						embed={embed}
						style={thumbnailStyle}
					/>
				);
			}

			if (showTitle !== false && embed.title) {
				items.push(
					<EmbedTitle
						key='title'
						title={embed.title}
						style={titleStyle}
					/>
				);
			}

			if (showSummary !== false && embed.description) {
				items.push(
					<EmbedSummary
						key='summary'
						summary={embed.description}
						style={summaryStyle}
					/>
				);
			}

			if (openOnPress === false) {
				return (
					<View {...this.props}>
						{items}
					</View>
				);
			} else {
				return (
					<TouchableOpacity {...this.props} onPress={this._handlePress}>
						<View>{items}</View>
					</TouchableOpacity>
				);
			}
		} else {
			return null;
		}
	}
}
