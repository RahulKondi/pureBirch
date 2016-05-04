/* @flow */

import './Client-base';
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/containers/AppContainer';
import Provider from '../modules/store/Provider';
import * as store from '../modules/store/store';

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('root')
);
