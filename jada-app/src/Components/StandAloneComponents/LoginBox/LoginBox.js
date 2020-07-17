import React from "react";
import './loginBox.css';

class LoginBox extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="loginBox">
                <h2 className="title d-flex justify-content-end">JADA</h2>
                <div>
                    <form action="" className="log-in" autoComplete="off">
                        <h4>Welcome</h4>
                        <p>Welcome back! Log in to your account to view JADA results:</p>
                        <div className="floating-label">
                            <input placeholder="Email" type="text" name="email" id="email" autoComplete="off"/>
                                <label htmlFor="email">Email:</label>
                        </div>
                        <div className="floating-label">
                            <input placeholder="Password" type="password" name="password" id="password"
                                   autoComplete="off"/>
                                <label htmlFor="password">Password:</label>
                        </div>
                        <button type="submit" onClick="return false;">Log in</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginBox;