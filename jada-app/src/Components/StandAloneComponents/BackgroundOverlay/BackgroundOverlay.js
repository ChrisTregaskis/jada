import React from "react";
import './backgroundOberlay.css';

class BackgroundOverlay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalActive: false,
            modalClass: 'hidden'
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.modalActive !== this.props.modalActive) {
            if (this.props.modalActive) {
                this.setState({ modalClass: 'displayed' })
            } else {
                this.setState({ modalClass: 'hidden' })
            }
        }
    }

    render() {
        let cssClass = 'backgroundOverlay ' + this.state.modalClass;
        return (
            <div className={cssClass}>

            </div>
        );
    }
}

export default BackgroundOverlay;