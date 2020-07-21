import React from "react";
import '../loginBox.css';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cssClass: 'hidden'
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeForm !== this.props.activeForm) {
            if (this.props.activeForm === 'LogIn') {
                this.setState({ cssClass: 'hidden' })
            } else if (this.props.activeForm === 'SignUp') {
                this.setState({ cssClass: 'displayed' })
            }
        }
    }

    render() {
        return (
            <div className={this.state.cssClass}>
                <form className="sign-up" autoComplete="off" onSubmit={this.props.handleSignUp}>
                    <h4>Welcome</h4>
                    <p>Complete the following to create an account with JADA.</p>
                    <div className="floating-label">
                        <input placeholder="First name" type="text" name="firstName" id="firstName"
                               onChange={(e) => this.props.handleChange(e, 'firstName')}
                               autoComplete="off" value={this.props.firstName} required/>
                        <label htmlFor="firstName">First name:</label>
                    </div>
                    <div className="floating-label">
                        <input placeholder="Last name" type="text" name="lastName" id="lastName"
                               onChange={(e) => this.props.handleChange(e, 'lastName')}
                               autoComplete="off" value={this.props.lastName} required/>
                        <label htmlFor="lastName">Last name:</label>
                    </div>
                    <div className="floating-label">
                        <input placeholder="Email" type="text" name="signUpEmail" id="signUpEmail"
                               onChange={(e) => this.props.handleChange(e, 'email')}
                               autoComplete="off" value={this.props.email} required/>
                        <label htmlFor="signUpEmail">Email:</label>
                    </div>
                    <div className="floating-label">
                        <input placeholder="Password" type="password" name="signUpPassword" id="signUpPassword"
                               onChange={(e) => this.props.handleChange(e, 'password')}
                               autoComplete="off" value={this.props.password} required/>
                        <label htmlFor="signUpPassword">Password:</label>
                    </div>
                    <div className="floating-label">
                        <input placeholder="Retyped password" type="password" name="retypedPassword" id="retypedPassword"
                               onChange={(e) => this.props.handleChange(e, 'retypedPassword')}
                               autoComplete="off" value={this.props.password} required/>
                        <label htmlFor="retypedPassword">Password:</label>
                    </div>
                    <div className="d-flex justify-content-between loginBoxBtns">
                        <div className="signUpBtn" onClick={this.props.toggleForm}>User log in</div>
                        <button>Register account</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignupForm;