const defaultAppData = {
    user: {
        id: '',
        email: ''
    }
};

export default (state = defaultAppData, action) => {

    const { type, payload } = action;

    switch(type) {
        case 'BATCH_UPDATE_USER_DATA':
            return {
                ...state,
                user: {...payload.user}
            };
        default:
            return state;
    }

};
