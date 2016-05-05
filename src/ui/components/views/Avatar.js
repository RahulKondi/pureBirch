/* @flow */

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

type Props = {
	uri: ?string;
}

const styles = {
  avatar : {
        height : 24,
        width : 24,
        borderRadius: "50%"
      }
};


class Avatar extends Component<void, Props, void> {
	static propTypes = {
		uri: PropTypes.string
	};



	render() {
		if (this.props.uri) {
			return <img {...this.props} source={{ uri: this.props.uri }} style={[ this.props.style, styles.avatar]} />;
		} else {
			return null;
		}
	}
}

export default Radium(Avatar);
