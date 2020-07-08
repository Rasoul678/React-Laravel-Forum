const initialState = {
    isAuthenticated: !!localStorage.getItem('access_token'),
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOG_OUT":
            return {
                ...state,
                isAuthenticated: false
            };
        case "LOG_IN":
            return {
                ...state,
                isAuthenticated: true
            };
        default:
            return state;
    }
};

export default authReducer;
