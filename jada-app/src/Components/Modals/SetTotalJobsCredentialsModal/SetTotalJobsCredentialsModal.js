import React from "react";
import './setTotalJobsCredentialsModal.css';

class SetTotalJobsCredentialsModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: localStorage.getItem('user_id'),
            bearerToken: localStorage.getItem('bearerToken'),
            modalClass: 'hidden',
            updatedEmail: '',
            changePass1: '',
            changePass2: '',
            updatedPass: '',
            errorMessage: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.setCredentialsModalActive !== this.props.setCredentialsModalActive) {
            if (this.props.setCredentialsModalActive) {
                this.setState({ modalClass: 'displayed' })
            } else if (!this.props.setCredentialsModalActive) {
                this.setState({ modalClass: 'hidden' })
            }
        }
    }

    handleChange = (e, stateProperty) => {
        let updatedData = {};
        updatedData[stateProperty] = e.target.value;
        this.setState(updatedData)
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let updatedEmail = this.state.updatedEmail;
        let pass1 = this.state.changePass1;
        let pass2 = this.state.changePass2;

        if (updatedEmail === '' && pass1 === '') {
            this.setState({ errorMessage: 'Email and password not set.' })
            setTimeout(() => {
                this.setState({ errorMessage: '' })
            }, 5000)
            return
        }

        if (pass1 !== '') {
            if (pass1 !== pass2) {
                this.setState({
                    errorMessage: 'Passwords do not match, please try again.',
                    changePass1: '',
                    changePass2: ''
                })
                setTimeout(() => {
                    this.setState({ errorMessage: '' })
                }, 5000)
                return
            }
        }

        let updatePackage = {}

        if (updatedEmail !== '') {
            if (!this.validateEmail(updatedEmail)) {
                this.setState({ errorMessage: 'Invalid email, please try again' })
                setTimeout(() => {
                    this.setState({ errorMessage: '' })
                }, 5000)
                return
            } else if (this.validateEmail(updatedEmail)) {
                if (pass1 !== '') {
                    updatePackage = {
                        "email": updatedEmail,
                        "pass": pass1
                    }
                } else {
                    updatePackage = {
                        "email": updatedEmail
                    }
                }
            }
        } else if (updatedEmail === '' && pass1 !== '') {
            updatePackage = {
                "pass": pass1
            }
        }

        let credentialsUpdated = await this.updateCredentials(updatePackage)

        if (!credentialsUpdated) {
            this.setState({ errorMessage: 'Unfortunately, unable to update credentials.' })
            setTimeout(() => {
                this.setState({ errorMessage: '' })
            }, 5000)
            return
        } else if (credentialsUpdated) {
            alert('successfully updated credentials')
            this.props.toggleCredentialsModal();
        }
    }

    updateCredentials = async (credentials) => {
        let reqData = JSON.stringify(credentials);
        let url = `http://localhost:8080/user/preferences/totalJobs/${this.state.userId}`;
        const res = await fetch(url, {
            method: 'PUT',
            body: reqData,
            headers: {
                "Content-Type" : "application/json",
                "Authorization": "Bearer " + this.state.bearerToken
            }
        })
        let response = res.json();
        return response.success
    }

    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    closeModal = () => {
        this.props.toggleCredentialsModal();
    }

    render() {
        let modalClass = this.state.modalClass + ' setTJCredentialsModal'
        return (
            <div className={modalClass}>
                <form autoComplete="on" onSubmit={this.handleSubmit}>
                    <h4 className="mb-4">Update Total Jobs Email Credentials</h4>
                    <p>By entering your totaljobs log in credentials, you acknowledge JADA will log in on your behalf. Passwords are encrypted however it is highly recommended your totaljobs password is strong and unique.</p>
                    <p className="font-weight-bold">Make sure this password is the one you use to log into your totaljobs account.</p>
                    <p className="font-italic mb-4">Please note, this does not update or change your totaljobs password associated with your totaljobs account. This must simply match the already set password.</p>
                    <div className="form-group row">
                        <label htmlFor="updatedEmail" className="col-sm-5 col-form-label preferenceTitle">Change Email:</label>
                        <div className="col-sm-7 d-flex">
                            <input placeholder={this.props.tJUserEmail} type="text" name="updateEmail" id="updateEmail"
                                   onChange={(e) => this.handleChange(e, 'updatedEmail')}
                                   autoComplete="on" value={this.state.updatedEmail} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="changePass1" className="col-sm-5 col-form-label preferenceTitle">Change password:</label>
                        <div className="col-sm-7 d-flex">
                            <input placeholder="Enter password" type="password" name="changePass1" id="changePass1"
                                   onChange={(e) => this.handleChange(e, 'changePass1')}
                                   autoComplete="off" value={this.state.changePass1} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="changePass2" className="col-sm-5 col-form-label preferenceTitle">Re-type password:</label>
                        <div className="col-sm-7 d-flex">
                            <input placeholder="Re-type password" type="password" name="changePass2" id="changePass2"
                                   onChange={(e) => this.handleChange(e, 'changePass2')}
                                   autoComplete="off" value={this.state.changePass2} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <button className="defaultBtn">SAVE</button>
                        <div className="defaultClearBtn" onClick={this.closeModal}>CANCEL</div>
                    </div>
                </form>
                <p className="errMsg text-danger text-center">{this.state.errorMessage}</p>
            </div>
        );
    }
}

export default SetTotalJobsCredentialsModal;