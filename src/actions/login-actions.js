export const updateEmail = email => {
    return {
        type: 'LOGIN_UPDATE_EMAIL',
        payload: {
            email
        }
    };
};

export const updatePassword = password => {
    return {
        type: 'LOGIN_UPDATE_PASSWORD',
        payload: {
            password
        }
    };
};

export const resetLoginData = () => {
    return {
        type: 'LOGIN_RESET_DATA',
        payload: {}
    };
};
