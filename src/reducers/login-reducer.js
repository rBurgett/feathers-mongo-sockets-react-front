const defaultData = {
    email: '',
    password: ''
};

export default (state = defaultData, action) => {

    const { type, payload } = action;

    switch(type) {
        case 'LOGIN_UPDATE_EMAIL':
            return {
                ...state,
                email: payload.email
            };
        case 'LOGIN_UPDATE_PASSWORD':
            return {
                ...state,
                password: payload.password
            };
        case 'LOGIN_RESET_DATA':
            return {
                ...state,
                email: '',
                password: ''
            };
        default:
            return {
                ...state
            };
    }

};
