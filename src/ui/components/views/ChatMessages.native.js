/* @flow */

import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import shallowEqual from 'shallowequal';
import ChatItemContainer from '../containers/ChatItemContainer';
import PageEmpty from './PageEmpty';
import PageLoading from './PageLoading';
import LoadingItem from './LoadingItem';
import type { Text } from '../../../lib/schemaTypes';

const {
	StyleSheet,
	ListView,
	View
} = ReactNative;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 4
	},
	inverted: {
		transform: [
			{ scaleY: -1 }
		]
	},
	item: {
		overflow: 'hidden'
	}
});

type Props = {
	data: Array<{
		text: Text;
		previousText: Text;
		isLast: boolean;
	} | { type: 'loading' } | { type: 'failed' }>;
	user: string;
	loadMore: (count: number) => void;
}

type State = {
	dataSource: ListView.DataSource
}

export default class ChatMessages extends Component {
	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.object).isRequired,
		user: PropTypes.string.isRequired,
		loadMore: PropTypes.func.isRequired,
		quoteMessage: PropTypes.func.isRequired,
		replyToMessage: PropTypes.func.isRequired,
		refreshData: PropTypes.func
	};

	state: State = {
		dataSource: new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})
	};

	componentWillMount() {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this.props.data)
		});
	}

	componentWillReceiveProps(nextProps: Props) {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
		});
	}

	shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
		return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
	}

	_loadMore: Function = () => {
		this.props.loadMore(this.props.data.length);
	};

	_renderRow: Function = item => {
		if (item && item.type === 'loading') {
			return <LoadingItem />;
		}

		const { text, previousText } = item;

		return (
			<ChatItemContainer
				key={text.id}
				text={text.id}
				isFirst={item.isFirst}
				isLast={item.isLast}
				previousText={previousText}
				replyToMessage={this.props.replyToMessage}
				quoteMessage={this.props.quoteMessage}
				user={this.props.user}
				style={[ styles.item, styles.inverted ]}
			/>
		);
	};

	render() {
		const { data } = this.props;

		let placeHolder;

		if (data.length === 0) {
			placeHolder = <PageEmpty label='No messages yet' image='sad' />;
		} else if (data.length === 1) {
			switch (data[0] && data[0].type) {
			case 'loading':
				placeHolder = <PageLoading />;
				break;
			case 'banned':
				placeHolder = <PageEmpty label="You're banned in this group" image='meh' />;
				break;
			case 'nonexistent':
				placeHolder = <PageEmpty label="This discussion doesn't exist" image='sad' />;
				break;
			case 'failed':
				placeHolder = <PageEmpty label='Failed to load messages' image='sad' />;
				break;
			}
		}

		return (
			<View {...this.props}>
				{placeHolder ? placeHolder :
					<ListView
						removeClippedSubviews
						keyboardShouldPersistTaps={false}
						style={styles.inverted}
						contentContainerStyle={styles.container}
						dataSource={this.state.dataSource}
						onEndReached={this._loadMore}
						renderRow={this._renderRow}
					/>
				}
			</View>
		);
	}
}
