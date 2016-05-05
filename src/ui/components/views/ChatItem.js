import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
    container: {
        margin: 8,
        fontFamily: 'Lato',
        fontSize: 16,
        color: '#443b5d'
    },
    message: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'row',
    },
    author: {
      whiteSpace: 'nowrap',
      fontWeight: 'bold',
      padding: 8,
    },
    text: {
      flexGrow: 1,
      padding: 8,
    },
    timestamp:{
      fontSize: 12,
      opacity: 0.5,
      float: 'right',
    }
};

class ChatItem extends Component {
  render() {
    const { data } = this.props;

    if (data.text.type !== 'loading') {
					 return (
             <div style={styles.container}>
              <div style={styles.message}>
                <div style={styles.author}>{data.text.creator} :</div>
                <div style={styles.text}>{data.text.body}</div>
              </div>
              <div style={styles.timestamp}>
                {new Date(data.text.createTime).toUTCString()}
              </div>
					  </div>
           );
         }
          else return null;
				}
      }

export default Radium(ChatItem);
