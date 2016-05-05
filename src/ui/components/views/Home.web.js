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
			<ChatContainer room='dee91d4e-e43e-4f5e-9bd5-8824e48cb186' thread='2d729cd5-6173-44f5-8005-acc2e9ce097c' />
			);
	}
}

export default Radium(Home);
