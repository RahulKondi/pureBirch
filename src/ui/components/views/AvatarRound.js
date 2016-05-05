/* @flow */

import React, { Component } from 'react';
import Radium from 'radium';
import AvatarContainer from '../containers/AvatarContainer';


class AvatarRound extends Component {
  render() {
					 return (
             <AvatarContainer {...this.props}   />
           );
         }
       }

export default Radium(AvatarRound);
