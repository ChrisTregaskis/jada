import React from "react";
import './confirmApplyModal.css';

class ConfirmApplyModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalClass: 'hidden'
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.applyModalActive !== this.props.applyModalActive) {
            if (this.props.applyModalActive) {
                this.setState({ modalClass: 'displayed' })
            } else if (!this.props.applyModalActive) {
                this.setState({ modalClass: 'hidden' })
            }
        }
    }

    handleConfirmClick = () => {
        this.props.toggleConfirmedApply();
        this.props.toggleApplyModalActive();
        this.props.toggleModalActive();
    }

    closeModal = () => {
        this.props.toggleApplyModalActive();
        this.props.toggleModalActive();
    }

    render() {
        let modalClass = this.state.modalClass + ' confirmApplyModal'
        return (
            <div className={modalClass}>
                <h4>To continue, please click confirm.</h4>
                <p>By clicking confirm, you are allowing JADA to log into your total jobs account, process applications and apply on your behalf with the CV and cover letter you have set up on your totaljobs account.</p>
                <div className="d-flex justify-content-around mt-4">
                    <div className="defaultBtn" onClick={this.handleConfirmClick}>CONFIRM</div>
                    <div className="defaultClearBtn" onClick={this.closeModal}>CANCEL</div>
                </div>
            </div>
        );
    }
}

export default ConfirmApplyModal;