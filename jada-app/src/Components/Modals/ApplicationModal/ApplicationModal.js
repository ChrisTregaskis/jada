import React from "react";
import './applicationModal.css';
import ButtonMainToggle from "../../Buttons/ButtonMainToggle/ButtonMainToggle";

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

    handleClick = () => {
        if (this.state.modalActive) {
            this.setState({ modalClass: 'displayed' })
        } else {
            this.setState({ modalClass: 'hidden' })
        }
    }

    render() {
        let modalClass = this.state.modalClass + ' applicationsModal'
        return (
            <div className={modalClass}>
                <h1 className="title d-flex justify-content-end">JADA</h1>
                <ul>
                    <li>Job title:</li>
                    <li>Applied on:</li>
                    <li>Applied at:</li>
                    <li>TotalJobs id:</li>
                    <li>Job reference:</li>
                    <li>Applied:</li>
                    <li>Interested:</li>
                    <li>Salary:</li>
                    <li>Job type:</li>
                    <li>Job posted:</li>
                    <li>Job contact:</li>
                    <li>Job url:</li>
                    <li>DKW found:</li>
                    <li>UDKW found:</li>
                    <li>Top24 found:</li>
                </ul>
                <div className="modalButtonBox d-flex justify-content-center">
                    <ButtonMainToggle
                        buttonText="DONE"
                        handleClick={this.handleClick}
                    />
                </div>
            </div>
        );
    }
}

export default ApplicationModal;