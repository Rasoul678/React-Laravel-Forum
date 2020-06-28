import Axios from "axios";
import { ADD_THREAD } from "../Constants";

export const addThread = (thread, dispatch, history) => {
    return () => {
        Axios.post("/api/threads", thread)
            .then(response => {
                dispatch({
                    type: ADD_THREAD,
                    thread: response.data
                });

                history.push("/threads");
                
            })
            .catch(error => {
                console.log(error.response.data.errors);
                setErrors(error.response.data.errors);
            });
    };
};
