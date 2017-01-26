import React from 'react';
import { Link, IndexLink } from 'react-router';
import co from 'co';
import { promiseAlert, swal } from 'promise-alert';
import { connect } from 'react-redux';

const Header = ({ userId, logout }) => {

    const onLogoutClick = e => {
        e.preventDefault();
        logout();
    };

    const collapseNavbar = () => {
        const navbar = window.$('#js-collapsible-navbar');
        if(navbar.hasClass('in')) {
            navbar.removeClass('in');
        }
    };

    return (
        <div>
            <nav className="navbar navbar-inverse" style={{borderRadius: 0}}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#js-collapsible-navbar" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">
                            <span>feathers-mongo-sockets-react-front</span>
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="js-collapsible-navbar" onClick={collapseNavbar}>
                        <ul className="nav navbar-nav">
                            <li><IndexLink to={'/'} title="Home" activeClassName="active"><i className="fa fa-home"></i> Home</IndexLink></li>
                            <li><Link to={'/about'} title="CLAware Registrations" activeClassName="active"><i className="fa fa-question-circle"></i> About</Link></li>
                            { userId ?
                                <li><a href="#" title="Log Out" onClick={onLogoutClick}><i className="fa fa-sign-out"></i> Log Out</a></li>
                                :
                                <li><Link to={'/login'} title="CLAware Registrations"><i className="fa fa-sign-in"></i> Login</Link></li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};
Header.propTypes = {
    userId: React.PropTypes.string,
    logout: React.PropTypes.func
};

const HeaderContainer = connect(
    ({ appState }) => {
        return {
            userId: appState.user._id
        };
    },
    (dispatch, props) => {
        return {
            logout() {
                const { api } = props;
                co(function* () {
                    try {

                        const confirmed = yield promiseAlert({
                            title: 'Are you sure?',
                            text: 'Are you sure that you want to log out?',
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Yes, logout.'
                        });

                        if(!confirmed) {
                            swal.close();
                            return;
                        }

                        yield api.logout();

                        window.location = '/';

                    } catch(err) {
                        console.error(err);
                    }
                });
            }
        };
    }
)(Header);

export default HeaderContainer;
