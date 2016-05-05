/* @flow */

import React, { Component } from 'react';
import Radium from 'radium';
import ChatItem from './ChatItem';

class ChatMessages extends Component {
	render() {
		return (
			<div {...this.props}>
				{this.props.data.reverse().map(data => {
					if (data && data.text) {
					 return (
						 <ChatItem key={data.text.id} data={data} />
					 );
				 }
				 else return null;
				})}
			</div>
		);
	}
}

export default Radium(ChatMessages);
