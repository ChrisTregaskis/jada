import React from "react";
import './signUpSuccessPrompt.css';

class SignupSuccessPrompt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cssClass: 'hidden'
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.displaySignUpSuccess !== this.props.displaySignUpSuccess) {
            if (this.props.displaySignUpSuccess) {
                this.setState({ cssClass: 'displayed' })
            } else if (!this.props.displaySignUpSuccess) {
                this.setState({ cssClass: 'hidden' })
            }
        }
    }

    handleClick = () => {
        this.props.toggleForm();
        this.setState({ cssClass: 'hidden' })
    }

    render() {
        return (
            <div className={this.state.cssClass}>
                <div className="successSignUpMessage">
                    <h4>Congratulations!</h4>
                    <p>You have successfully created a new account.</p>
                    <p>Please click the button below to go back to the log in page.</p>
                </div>
                <div className="btn d-flex justify-content-end">
                    <div className="signUpBtn" onClick={this.handleClick}>Log in</div>
                </div>
            </div>
        );
    }
}

export default SignupSuccessPrompt;