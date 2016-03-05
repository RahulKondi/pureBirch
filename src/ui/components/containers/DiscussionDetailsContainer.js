/* @flow */

import React, { PropTypes } from 'react';
import Connect from '../../../modules/store/Connect';
import DiscussionDetails from '../views/DiscussionDetails';

const DiscussionDetailsContainer = (props: any) => (
	<Connect
		mapSubscriptionToProps={{
			thread: {
				key: {
					type: 'entity',
					id: props.thread
				}
			}
		}}
		passProps={props}
		component={DiscussionDetails}
	/>
);

DiscussionDetailsContainer.propTypes = {
	thread: PropTypes.string.isRequired
};

export default DiscussionDetailsContainer;
