import React from "react";
import '../ButtonMain/buttonMain.css';

class ButtonMainToggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonText: this.props.buttonText
        }
    }

    render() {
        return (
            <div>
                <div onClick={this.props.handleClick} className="buttonMain">
                    <span className="text">{this.state.buttonText}</span>
                </div>
            </div>
        );
    }

}

export default ButtonMainToggle;