import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import feathers from 'feathers-client';
import io from 'socket.io-client';

import '../node_modules/sweetalert/dist/sweetalert.css';
import './css/font-awesome.css';
import './css/main.css';

import appReducer from './reducers/app-reducer';
import loginReducer from './reducers/login-reducer';
import App from './App';
import Home from './components/home/';
import About from './components/about';
import Login from './components/login';
import { batchUpdateUserData } from './actions/app-actions';


/***** CONFIGURE REDUX *****/

const combinedReducers = combineReducers({
    appState: appReducer,
    loginState: loginReducer,
    routing: routerReducer
});

const store = createStore(combinedReducers);

store.subscribe(() => console.log('state', store.getState()));


/***** CONNECT TO DATA API *****/

const serverAddress = 'http://localhost:3030';
const socket = io(serverAddress);
const api = feathers()
    .configure(feathers.hooks())
    .configure(feathers.socketio(socket))
    .configure(feathers.authentication({ storage: window.localStorage }));

// check to see if user is already authenticated
const authenticated = api.authenticate();

// wrap app compnent to add data api prop
const AppContainer = ({ children }) => <App api={api} children={children} />;
AppContainer.propTypes = {
    children: React.PropTypes.element
};

/***** CONFIGURE ROUTING AND RENDER APPLICATION *****/

// const history = syncHistoryWithStore(hashHistory, store);
const history = syncHistoryWithStore(browserHistory, store);

const renderApplication = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={AppContainer}>
                    <IndexRoute component={Home}></IndexRoute>
                    <Route path="about" component={About}></Route>
                    <Route path="login" component={Login}></Route>
                </Route>
            </Router>
        </Provider>,
        document.getElementById('root')
    );
};

// handle authentication response
authenticated.then(
    // if user already authenticated, update store w/ user data
    res => {
        store.dispatch(batchUpdateUserData(res.data));
        renderApplication();
    },
    // if unsuccessful, catch error but don't do anything with it
    () => {
        // console.log('Not authenticated!');
        renderApplication();
    }
);
