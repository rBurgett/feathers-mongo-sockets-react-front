export const batchUpdateUserData = (user) => {
    return {
        type: 'BATCH_UPDATE_USER_DATA',
        payload: {
            user: user
        }
    };
};
