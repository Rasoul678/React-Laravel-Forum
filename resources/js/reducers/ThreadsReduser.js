import { ADD_THREAD } from "../Constants";

const initialState = {
    threads: []
};

const threadsReduser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_THREAD:
            return Object.assign({}, state, {
                threads: [...state.threads, action.thread]
              });
        default:
            return state;
    }
};

export default threadsReduser;
