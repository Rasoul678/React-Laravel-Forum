import React, { Component } from "react";
import 'trix';

class Wysiwyg extends Component {
    constructor(props) {
        super(props);
        this.trixInput = React.createRef();
    }

    componentDidMount() {
        console.log(this.props);
        this.trixInput.current.addEventListener("trix-change", event => {
            console.log("trix change event fired");
            this.props.onChange(event.target.innerHTML);
        });
    }

    render() {
        return (
            <div>
                <input
                    type="hidden"
                    id={ this.props.trixId }
                    defaultValue={this.props.defaultValue}
                />
                <trix-editor input={ this.props.trixId } ref={this.trixInput} placeholder='Have something to say?'/>
            </div>
        );
    }
}

export default Wysiwyg;
