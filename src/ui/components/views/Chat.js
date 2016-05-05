/* @flow */

import React, { Component } from 'react';
import Radium from 'radium';
import ChatMessagesContainer from '../containers/ChatMessagesContainer';
import ChatInput from './ChatInput';

const styles = {
	container: {
    height: '100%',
	},
  messages: {
    marginBottom: 56,
  },
	input: {
		position: 'fixed',
		bottom: 0,
		left: 0,
		width: '100%',
    height: 44,
	},
};

class Chat extends Component {
	render() {
		return (
			<div style={styles.container}>
				<ChatMessagesContainer {...this.props} style={styles.messages} />
				<ChatInput {...this.props} style={[ styles.input, this.props.style ]} />
			</div>
		);
	}
}

export default Radium(Chat);
