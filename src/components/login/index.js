import { connect } from 'react-redux';
import { swal } from 'promise-alert';
import { browserHistory } from 'react-router';

import { batchUpdateUserData } from '../../actions/app-actions';
import { updateEmail, updatePassword, resetLoginData } from '../../actions/login-actions';

import Login from './login';

const LoginContainer = connect(
    ({ loginState }) => {
        return {
            email: loginState.email,
            password: loginState.password
        };
    },
    (dispatch, props) => {
        return {
            emailChanged: str => dispatch(updateEmail(str)),
            passwordChanged: str => dispatch(updatePassword(str)),
            formSubmitted: (email, password) => {
                // const { api } = window;
                if(!email || !password) {
                    swal('Empty Fields', 'You must fill in all fields.', 'warning');
                    return;
                } else if(!/.+@.+\..+/.test(email)) {
                    swal('Email Format', 'You must enter a valid email address.', 'warning');
                    return;
                }
                props.api.authenticate({
                    type: 'local',
                    'email': email,
                    'password': password
                }).then(({ data }) => {
                    dispatch(resetLoginData());
                    dispatch(batchUpdateUserData({...data}));
                    browserHistory.push('/');
                }).catch(err => {
                    console.error(err);
                    swal('Oops!', 'Invalid email or password', 'error');
                });
            }
        };
    }
)(Login);

export default LoginContainer;
