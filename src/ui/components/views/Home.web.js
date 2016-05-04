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
			<ChatContainer room="f4f56f3d-1a1c-43ee-b60d-3e9a4560c693" thread="28f8150d-1c14-4a8f-b656-7578fcba8e00"/>
			);
	}
}

export default Radium(Home);
