/* @flow */

import React, { Component } from 'react';
import Radium from 'radium';
//import Colors from '../../Colors';
import ChatContainer from "../containers/ChatContainer";

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

class Home extends Component {
  render() {
		return (
			<ChatContainer room="0e3f09e5-be6a-4b9c-ac79-502efa820078" thread="9b058e23-1725-4f69-9f8f-faf179a8bd4e"/>
			);
	}
}

export default Radium(Home);
