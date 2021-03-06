import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import SocialApp from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <SocialApp />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

