/* @flow */

import React, { Component } from 'react';
import Radium from 'radium';
import uuid from 'node-uuid';

const styles = {
	input: {
		width: '100%',
		display: 'block',
		padding: 12,
		fontSize: 16,
	},
};

class ChatInput extends Component {
	state = {
		value: '',
	};

	_handleSubmit = (e) => {
		e.preventDefault();
		this.props.sendMessage(uuid.v4(), this.state.value);
		this.setState({
			value: '',
		});
	};

	_handleChange = (e) => {
		this.setState({
			value: e.target.value,
		});
	};

	render() {
		return (
			<form onSubmit={this._handleSubmit} style={this.props.style}>
				<input
					type='text'
					style={styles.input}
					placeholder='Type your message'
					value={this.state.value}
					onChange={this._handleChange}
				/>
			</form>
		);
	}
}

export default Radium(ChatInput);
