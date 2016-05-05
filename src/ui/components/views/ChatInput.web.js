/* @flow */

import React, { Component } from 'react';
import Radium from 'radium';

// const styles = {
//
// };

class ChatInput extends Component {
  render() {
    return (
			<div>
      <form action={ bus.emit('changes', {
          entities: {
            id: new Text({
              id,
              body: "",
              creator: ""
            })
          }
        }); }>

        <input type="text" name="InputMessage" value="Type your message" />
        <input type="submit" value="Submit" />
        </form>
			</div>
		);
  }
}

export default Radium(ChatInput);
