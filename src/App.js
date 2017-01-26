import React from 'react';
import { connect } from 'react-redux';

import Header from './components/shared/header';
import Footer from './components/shared/footer';

const App = ({ api, children }) => {
    return (
        <div>
            <Header api={api} />
            { React.cloneElement(children, { api }) }
            <Footer />
        </div>
    );
};
App.propTypes = {
    api: React.PropTypes.object,
    children: React.PropTypes.element
};

const AppContainer = connect()(App);

export default AppContainer;
