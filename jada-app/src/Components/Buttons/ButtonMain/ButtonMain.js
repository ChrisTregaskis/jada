import React from "react";
import './buttonMain.css';

class ButtonMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonText: this.props.buttonText,
            cssClass: this.props.cssClass,
            location: this.props.location
        }
    }

    handleClick = () => {
        window.location.replace(this.state.location)
    }

    render() {
        // let cssClass = this.state.cssClass;
        let cssClass = '';
        return (
            <div className={cssClass}>
                <div onClick={this.handleClick} className='horizontal'>
                    <span className="text">{this.state.buttonText}</span>
                </div>
            </div>
        );
    }

}

export default ButtonMain;