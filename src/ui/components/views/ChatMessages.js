/* @flow */

import React, { Component } from 'react';
import Radium from 'radium';
import ChatItem from './ChatItem';
// import Colors from '../../Colors';

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

class ChatMessages extends Component {
  render() {
    return (
			<div>
				{this.props.data.map(data => {
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
