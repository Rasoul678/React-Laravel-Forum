import React from 'react';
import { useQuery, useMutation, queryCache } from 'react-query';
import Axios from "axios";

const Test = (props) =>{
    const token = localStorage.getItem('access_token');
    const headers = {Authorization: `Bearer ${token}`};

    // Queries
    const threadsQuery = useQuery('threads', () =>
        Axios.get('/api/threads')
            .then(response=>response.data)
    )

    const postThread = (thread) =>{
        Axios.post("/api/threads", thread, {headers})
            .then(response => {
                return response;
                });
    }

    // Mutations
    const [addThread] = useMutation(postThread, {
        onSuccess: () => {
            // Query Invalidations
            queryCache.invalidateQueries('threads')
        },
    })

    console.log(threadsQuery);

    return (
        <div>
            <h1>React Query Test: {threadsQuery.status}</h1>
            {threadsQuery.data?.map(thread=>{
                return (
                    <h2 key={thread.id}>{thread.title}</h2>
                )
            })}
            <button
                className="btn btn-primary"
                onClick={() =>
                    addThread({
                        title: 'React Query1',
                        body: 'react query1',
                        user_id: 1,
                        channel_id:  1
                    })
                }
            >
                Add Thread
            </button>
        </div>
    )
}

export default Test;
