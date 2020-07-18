import React from "react";
import '../ButtonMain/buttonMain.css';
import './buttonMainToggle.css';

class ButtonMainToggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonText: this.props.buttonText
        }
    }

    render() {
        const cssClass = this.props.cssClass
        return (
            <div className={cssClass}>
                <div onClick={this.props.handleClick}
                     className="buttonMain buttonMainToggle">
                    <span className="text">{this.state.buttonText}</span>
                </div>
            </div>
        );
    }

}

export default ButtonMainToggle;