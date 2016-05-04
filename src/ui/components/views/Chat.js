/* @flow */

import React, { Component } from 'react';
import Radium from 'radium';
//import Colors from '../../Colors';

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
    console.log(this.props.data);
		return (
			<div>
				{/*{this.props.items.map(data => (
					<div key={data.id}>
						<img src={data.creator.meta.picture} style={styles.avatar} />
						<b>{data.creator.id}: </b> {data.body} <br /> [{data.createtime}]
					</div>
				))}*/}
			</div>
		);
	}
}

export default Radium(Chat);
