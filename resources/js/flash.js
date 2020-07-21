import React, {useState} from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

const Flash = ()=>{
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [level, setLevel] = useState('success');


    const showFlash = ()=>{
        setShow(true);
    }

    const hideFlash = ()=>{
        setTimeout(()=>{
            setShow(false);
        }, 3000)
    }

    document.querySelector('#flash').addEventListener('onFlash', (e)=>{
        setMessage(e.detail.message);
        setLevel(e.detail.level);
        showFlash();
        hideFlash();
    })

    return(
        <div>
            {
                show &&
                <div className='position-fixed' style={style}>
                    <div className={`alert alert-${level} d-inline h6`}>{message}</div>
                </div>
            }
        </div>
    )
}

const style = {
    bottom: '40px',
    right: '40px'
}

if (document.getElementById("flash")) {
    ReactDOM.render(
        <Provider store={store}>
            <Flash />
        </Provider>,
        document.getElementById("flash")
    );
}
