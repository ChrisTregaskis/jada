import React from "react";
import './loginBox.css';
import LoginForm from "./LoginForm/LoginForm";

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        let token = '';
        let user_id = '';

        if (localStorage.getItem('bearerToken')) {
            token = localStorage.getItem('bearerToken')
        }

        if (localStorage.getItem('user_id')) {
            user_id = localStorage.getItem('user_id')
        }

        this.state = {
            email: '',
            password: '',
            bearerToken: token,
            user_id: user_id,
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

    updateUserId = (fetchedId) => {
        this.setState({ user_id: fetchedId })
        localStorage.setItem('user_id', fetchedId)
    }

    handleLogIn = async (e) => {
        e.preventDefault()
        let email = this.state.email
        let password = this.state.password

        // add email & password validation

        let logInPackage = {
            "email": email,
            "password": password
        }
        let response = await this.requestToken(
            'http://localhost:8080/user/login',
            'POST',
            logInPackage
        );

        this.setState({ email: '', password: '' })
        
        if (!response.success) {
            this.setState({ errorMessage: 'Credentials incorrect, please try again.' })
            setTimeout(() => {
                this.setState({ errorMessage: '' })
            }, 5000)
        } else if (response.success) {
            await this.updateToken(response.token)
            await this.updateUserId(response.user_id)
            window.location.replace('http://localhost:3000/dashboard')
        }

    }

    render() {
        return (
            <div className="loginBox">
                <h2 className="title d-flex justify-content-end">JADA</h2>
                <div>
                    <LoginForm
                        handleLogIn={this.handleLogIn}
                        handleChange={this.handleChange}
                        email={this.state.email}
                        password={this.state.password}
                        toggleForm={this.props.toggleForm}
                    />
                    <p>{this.state.errorMessage}</p>
                </div>
            </div>
        );
    }
}

export default LoginBox;