/* @flow */

import React, { Component, PropTypes } from 'react';
import Connect from '../../../modules/store/Connect';
import ChatMessages from '../views/ChatMessages';
import type { SubscriptionRange } from '../../../modules/store/ConnectTypes';

export default class ChatMessagesContainer extends Component<void, any, SubscriptionRange> {
	state: SubscriptionRange = {
		start: Infinity,
		before: 20,
		after: 0,
	};

	_loadMore: Function = (count: number) => {
		this.setState({
			before: count + 20,
		});
	};

	render() {
		const {
			start,
			before,
			after
		} = this.state;

		return (
			<Connect
				mapSubscriptionToProps={{
					user: {
						key: {
							type: 'state',
							path: 'user'
						},
					},
					texts: {
						key: {
							slice: {
								type: 'text',
								filter: {
									parent_cts: [ this.props.thread ]
								},
								order: 'createTime'
							},
							range: {
								start,
								before,
								after
							}
						},
					}
				}}
				passProps={{ ...this.props, loadMore: this._loadMore }}
				component={ChatMessages}
			/>
		);
	}
}

ChatMessagesContainer.propTypes = {
	thread: PropTypes.string.isRequired
};
