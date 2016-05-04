/* @flow */

import React, { PropTypes, Component } from 'react';
import HomeContainer from '../../containers/HomeContainer';

export default class Onboard extends Component<void, Object, void> {
	static propTypes = {
		page: PropTypes.string,
	};

	render() {
		const { props } = this;
		
		switch (props.page) {
		case 'PAGE_HOME':
		case 'PAGE_PLACES':
			return <HomeContainer {...props} />;
		default:
			return null;
		}
	}
}
