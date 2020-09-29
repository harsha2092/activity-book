import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import {Provider} from 'react-redux';
import {store} from './store/redux/store';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/common/scroll/scroll-to-top';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <ScrollToTop/>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
