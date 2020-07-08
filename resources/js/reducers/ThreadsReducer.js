import { ADD_THREAD } from "../constants";

const initialState = {
    threads: [],
};

const threadsReducer =  (state = initialState, action) => {
    switch (action.type) {
        case ADD_THREAD:
            return Object.assign({}, state, {
                threads: [...state.threads, action.thread],
              });
            default:
                return state;
    }
};

export default threadsReducer;
