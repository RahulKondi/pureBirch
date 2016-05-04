/* @flow */

import React, { Component } from 'react';
import Radium from 'radium';
import AvatarContainer from '../containers/AvatarContainer';


class AvatarRound extends Component {
  render() {
    console.log("props in AvatarRound: ", this.props);
					 return (
             <AvatarContainer {...this.props}   />
           );
         }
       }

export default Radium(AvatarRound);
