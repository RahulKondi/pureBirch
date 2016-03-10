/* @flow */

import React, { PropTypes } from 'react';
import Connect from '../../../modules/store/Connect';
import NotificationBadge from '../views/NotificationBadge';

const NotificationBadgeContainer = (props: any) => (
	<Connect
		passProps={props}
		component={NotificationBadge}
	/>
);

NotificationBadgeContainer.propTypes = {
	user: PropTypes.string.isRequired
};

const mapSubscriptionToProps = {
	user: {
		key: {
			type: 'state',
			path: 'user'
		},
	},
};

const NotificationBadgeContainerOuter = (props: any) => (
	<Connect
		mapSubscriptionToProps={mapSubscriptionToProps}
		passProps={props}
		component={NotificationBadgeContainer}
	/>
);

export default NotificationBadgeContainerOuter;
