/* @flow */

import React, { Component, PropTypes } from 'react';
import shallowEqual from 'shallowequal';
import OnboardContainer from '../containers/OnboardContainer';

type Props = {
	connection: 'connecting' | 'online' | 'offline';
	session: string;
	user: string;
}

export default class App extends Component<void, Props, void> {
	static propTypes = {
		connection: PropTypes.oneOf([ 'connecting', 'online', 'offline' ]),
		session: PropTypes.string,
		user: PropTypes.string
	};

	shouldComponentUpdate(nextProps: Props): boolean {
		return !shallowEqual(this.props, nextProps);
	}

	render() {
		const {
			session,
			user
		} = this.props;

		const loading = session === '@@loading' || session && !user;

		if (loading) {
			return null;
		} else {
			return <OnboardContainer {...this.props} />;
		}
	}
}
