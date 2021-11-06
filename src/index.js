import React from 'react';
import ReactDOM from 'react-dom';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// Global css file
import './index.css';
import ContextStore from './Diary/ContextProvider';
import App from './Diary/App';

ReactDOM.render(
	<ContextStore>
		<App />
	</ContextStore>,
	document.getElementById('root')
);
