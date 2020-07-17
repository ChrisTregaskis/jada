import React from "react";
import './loginBox.css';

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        let token = '';

        if (localStorage.getItem('bearerToken')) {
            token = localStorage.getItem('bearerToken')
        }

        this.state = {
            email: '',
            password: '',
            bearerToken: token,
            errorMessage: ''
        }
    }

    handleChange = (e, stateProperty) => {
        let updatedData = {};
        updatedData[stateProperty] = e.target.value;
        this.setState(updatedData)
    }

    requestToken = async (url, reqMethod, dataToSend) => {
        let reqData = JSON.stringify(dataToSend);
        const response = await fetch(url, {
            method: reqMethod.toUpperCase(),
            body: reqData,
            headers: {
                "Content-Type" : "application/json"
            }
        })
        return response.json();
    }

    updateToken = (fetchedToken) => {
        this.setState({ bearerToken: fetchedToken })
        localStorage.setItem('bearerToken', fetchedToken)
    };

    handleLogIn = async (e) => {
        e.preventDefault()
        let email = this.state.email
        let password = this.state.password
        let logInPackage = {
            "email": email,
            "password": password
        }
        // add email & password validation
        let response = await this.requestToken(
            'http://localhost:8080/user/login',
            'POST',
            logInPackage
        );

        this.setState({ email: '', password: '' })

        if (!response.success) {
            this.setState({ errorMessage: 'Email and password do not match' })
        } else if (response.success) {
            await this.updateToken(response.token)
            window.location.replace('http://localhost:3000/dashboard')
        }

    }

    render() {
        return (
            <div className="loginBox">
                <h2 className="title d-flex justify-content-end">JADA</h2>
                <div>
                    <form className="log-in" autoComplete="off" onSubmit={this.handleLogIn}>
                        <h4>Welcome</h4>
                        <p>Welcome back! Log in to your account to view your JADA results:</p>
                        <div className="floating-label">
                            <input placeholder="Email" type="text" name="email" id="email"
                                   onChange={(e) => this.handleChange(e, 'email')}
                                   autoComplete="off" value={this.state.email} required/>
                                <label htmlFor="email">Email:</label>
                        </div>
                        <div className="floating-label">
                            <input placeholder="Password" type="password" name="password" id="password"
                                   onChange={(e) => this.handleChange(e, 'password')}
                                   autoComplete="off" value={this.state.password} required/>
                                <label htmlFor="password">Password:</label>
                        </div>
                        <button>Log in</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginBox;