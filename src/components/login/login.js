import React from 'react';

class Login extends React.Component {

    componentDidMount() {
        this.emailInput.focus();
    }

    render() {
        const {
            email,
            password,
            emailChanged,
            passwordChanged,
            formSubmitted
        } = this.props;
        const styles = {
            header: {
                textAlign: 'center'
            },
            form: {
                paddingTop: 0
            },
            headerImage: {
                width: '100%',
                height: 'auto'
            },
            mainDiv: {}
        };

        const onChange = (e, property) => {
            e.preventDefault();
            switch(property) {
                case 'email':
                return emailChanged(e.target.value);
                case 'password':
                return passwordChanged(e.target.value);
                default:
                return;
            }
        };
        const onSubmit = e => {
            e.preventDefault();
            formSubmitted(email, password);
        };

        return (
            <div className="container-fluid">
                <div style={styles.mainDiv}>
                    <form style={styles.form} onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
                                <h1 className="text-center">User Login</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
                                <div className="form-group">
                                    <label>{'Email'}</label>
                                    <input ref={node => this.emailInput = node} value={email} type="text" className="form-control" required={true} onChange={e => onChange(e, 'email')}></input>
                                </div>
                                <div className="form-group">
                                    <label>{'Password'}</label>
                                    <input value={password} type="password" className="form-control" required={true} onChange={e => onChange(e, 'password')}></input>
                                </div>
                                <div className="form-group">
                                    <button style={{width: '100%'}} type="submit" className="btn btn-primary"><i className="fa fa-paper-plane"></i>{' Login'}</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    email: React.PropTypes.string,
    password: React.PropTypes.string,
    usernameChanged: React.PropTypes.func,
    emailChanged: React.PropTypes.func,
    passwordChanged: React.PropTypes.func,
    formSubmitted: React.PropTypes.func,
    api: React.PropTypes.object
};

export default Login;
