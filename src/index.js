import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware,compose } from 'redux';

const initialState = {};
const middleware = [thunk];
const store = createStore(rootReducer,initialState,
                        compose(applyMiddleware(...middleware)
                        )
                    );

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
