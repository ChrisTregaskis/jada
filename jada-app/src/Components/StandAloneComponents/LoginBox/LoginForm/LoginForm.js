import React from "react";

class LoginForm extends React.Component {
    render() {
        return (
            <div>
                <form className="log-in" autoComplete="off" onSubmit={this.props.handleLogIn}>
                    <h4>Welcome</h4>
                    <p>Welcome back! Log in to your account to view your JADA results:</p>
                    <div className="floating-label">
                        <input placeholder="Email" type="text" name="email" id="email"
                               onChange={(e) => this.props.handleChange(e, 'email')}
                               autoComplete="off" value={this.props.email} required/>
                        <label htmlFor="email">Email:</label>
                    </div>
                    <div className="floating-label">
                        <input placeholder="Password" type="password" name="password" id="password"
                               onChange={(e) => this.props.handleChange(e, 'password')}
                               autoComplete="off" value={this.props.password} required/>
                        <label htmlFor="password">Password:</label>
                    </div>
                    <div className="d-flex justify-content-between loginBoxBtns">
                        <div className="signUpBtn" onClick={this.props.toggleForm}>Sign up</div>
                        <button>Log in</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm;