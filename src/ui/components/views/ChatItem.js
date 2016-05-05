import React, { Component } from 'react';
import Radium from 'radium';
import AvatarRound from './AvatarRound';
import ChatInput from './ChatInput';


const styles = {
    container: {
        margin: 16,
        fontFamily: 'lato',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#443b5d'
    },
      avatar : {
        height : 56,
        width : 56,
        borderRadius: "50%",
        padding: 15
      }
};

class ChatItem extends Component {
  render() {
    const { data } = this.props;
    console.log("props: ", this.props);
    if (data.text.type !== 'loading') {
					 return (
             <div>
                <AvatarRound user={data.creator} size={24} style={styles.avatar}  />
						    <b>{data.text.creator}: </b> {data.text.body} <br /><br /> [{new Date(data.text.createTime).toUTCString()}]
                <div>
                  <ChatInput />
                </div>
					    </div>
           );
         }
          else return null;
				}
      }

export default Radium(ChatItem);
