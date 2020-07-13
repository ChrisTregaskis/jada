import React from "react";
import './applicationModal.css';

class ApplicationModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            application: {},
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
        let modalClass = this.state.modalClass + ' applicationsModal'
        return (
            <div className={modalClass}>
                <h1 className="title d-flex justify-content-end">JADA</h1>
                <p>Job Title: Software Developer</p>

            </div>
        );
    }
}

export default ApplicationModal;