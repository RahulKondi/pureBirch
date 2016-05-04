/* @flow */

import React, { Component } from 'react';
import Radium from 'radium';
//import Colors from '../../Colors';
import ChatMessagesContainer from "../containers/ChatMessagesContainer";

// const styles = {
//     container: {
//         margin: 16,
//         fontFamily: 'lato',
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#443b5d'
//     },
//       avatar : {
//         height : 24,
//         width : 24,
//         borderRadius: "50%"
//       }
// };

class Chat extends Component {
  render() {
		return (
			<ChatMessagesContainer {...this.props} />
			);
	}
}

export default Radium(Chat);
