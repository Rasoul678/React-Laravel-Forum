import React from 'react';
import Reply from "./Reply";

const Replies = (props) => {

    return (
        <div>
            {
                props.replies?.map(reply=>{
                    return (
                        <Reply reply={reply} delete={props.delete} key={reply.id}/>
                    )
                })
            }
        </div>
    )
}

export default Replies;
