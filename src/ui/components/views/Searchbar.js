/* @flow */

import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import Colors from '../../Colors';
import AppTextInput from './AppTextInput';
import AppbarSecondary from './AppbarSecondary';
import AppbarTouchable from './AppbarTouchable';
import AppbarIcon from './AppbarIcon';

const {
	StyleSheet
} = ReactNative;

const styles = StyleSheet.create({
	input: {
		flex: 1,
		fontSize: 16,
		lineHeight: 24,
		color: Colors.black,
		backgroundColor: 'transparent'
	},
	icon: {
		color: Colors.fadedBlack
	}
});

type Props = {
	onBack: Function;
	onChangeSearch: Function;
	onFocus?: Function;
	onBlur?: Function;
	placeholder?: string;
	autoFocus?: boolean;
}

type State = {
	query: string;
}

export default class SearchBar extends Component<void, Props, State> {
	static propTypes = {
		onBack: PropTypes.func.isRequired,
		onChangeSearch: PropTypes.func.isRequired,
		onFocus: PropTypes.func,
		onBlur: PropTypes.func,
		placeholder: PropTypes.string,
		autoFocus: PropTypes.bool
	};

	state: State = {
		query: '',
	};

	_handleChange: Function = query => {
		this.setState({
			query
		});

		this.props.onChangeSearch(query);
	};

	_handleClearInput: Function = () => {
		this.setState({
			query: ''
		});

		this.props.onChangeSearch('');
	};

	render() {
		return (
			<AppbarSecondary {...this.props}>
				{this.props.onBack ?
					<AppbarTouchable type='secondary' onPress={this.props.onBack}>
						<AppbarIcon name='arrow-back' style={styles.icon} />
					</AppbarTouchable> :
					<AppbarIcon name='search' style={styles.icon} />
				}

				<AppTextInput
					value={this.state.query}
					autoFocus={this.props.autoFocus}
					onChangeText={this._handleChange}
					placeholder={this.props.placeholder}
					placeholderTextColor='rgba(0, 0, 0, 0.5)'
					onFocus={this.props.onFocus}
					onBlur={this.props.onBlur}
					style={styles.input}
				/>

				{this.state.query ?
					<AppbarTouchable type='secondary' onPress={this._handleClearInput}>
						<AppbarIcon name='close' style={styles.icon} />
					</AppbarTouchable> :
					null
				}
			</AppbarSecondary>
		);
	}
}
