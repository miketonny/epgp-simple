import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import App from './App';
import RootStore from './models/RootStore';
import './App.scss';

const store = new RootStore();

const firebaseConfig = {
  apiKey: 'AIzaSyBxDJP9E6D49x8OQ78SYKyrQiik79J8CqU',
  authDomain: 'pwc-epgp.firebaseapp.com',
  databaseURL: 'https://pwc-epgp.firebaseio.com',
  projectId: 'pwc-epgp',
  storageBucket: 'pwc-epgp.appspot.com',
  messagingSenderId: '1025716709700',
  appId: '1:1025716709700:web:7c696e7f4860cbdc354f11',
  measurementId: 'G-ZE8YSLD2T7'
};

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore(); // using firestore

ReactDOM.render(
  <Provider rootStore={store} db={database}>
    <App />
  </Provider>,
    document.getElementById('root')
);
