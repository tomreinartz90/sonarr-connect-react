import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { createStore } from 'redux';
import { rootReducers } from "./reducers/index";

const store = createStore( rootReducers );
ReactDOM.render(
    <App store={store}/>,
    document.getElementById( 'root' ) as HTMLElement
);

registerServiceWorker();
