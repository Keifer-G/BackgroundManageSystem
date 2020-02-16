import React from 'react';
import App from './app'
import reactDom from 'react-dom';
import {Provider}from 'react-redux';
import store from './redux/store';
import './assets/css/reset.min.css';

reactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>
,document.getElementById('root'));

