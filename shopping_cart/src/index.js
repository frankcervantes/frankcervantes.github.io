import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import StockView from './containers/StockView';
import PurseView from './containers/PurseView';


const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
    	<div className="page-container">
    		
        	<StockView />
        	<PurseView />
    	</div>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

