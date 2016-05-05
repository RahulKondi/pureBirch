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
			<ChatContainer room='39c8a8fc-5494-49b8-a8c1-5f9b09931b6e' thread='2abcdf70-ce40-4de8-92a4-01ba71059588' />
			);
	}
}

export default Radium(Home);
