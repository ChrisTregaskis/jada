import React from "react";
import './loginBox.css';
import LoginForm from "./LoginForm/LoginForm";
import SignupForm from "./SignupForm/SignupForm";
import SignupSuccessPrompt from "./SignupSuccessPrompt/SignupSuccessPrompt";

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
            retypedPassword: '',
            bearerToken: token,
            user_id: user_id,
            errorMessage: '',
            firstName: '',
            lastName: ''
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

    clearEmailAndPassword = () => {
        this.setState({ email: '', password: '' })
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

        this.clearEmailAndPassword();
        
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

    postNewUser = async (newUser) => {
        let reqData = JSON.stringify(newUser)
        let url = 'http://localhost:8080/user/signup'
        const response = await fetch(url, {
            method: 'POST',
            body: reqData,
            headers: {
                "Content-Type" : "application/json"
            }
        })
        return response.json();
    }

    handleSignUp = async (e) => {
        e.preventDefault()
        let firstName = this.state.firstName
        let lastName = this.state.lastName
        let email = this.state.email
        let password = this.state.password
        let retypedPass = this.state.retypedPassword

        if (password !== retypedPass) {
            this.setState({ errorMessage: 'Passwords do not match, please try again.' })
            setTimeout(() => {
                this.setState({ errorMessage: '' })
            }, 5000)
            return
        }

        let signUpPackage = {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "password": password
        }

        let response = await this.postNewUser(signUpPackage)
        if (!response.success) {
            if (response.status === 422) {
                this.setState({ errorMessage: response.message })
            } else {
                this.setState({ errorMessage: 'Unable to create a new account.' })
            }
            setTimeout(() => {
                this.setState({ errorMessage: '' })
            }, 5000)
        } else if (response.success) {
            console.log('user account created successfully!!')
            this.props.toggleDisplaySignUpSuccess()
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
                        activeForm={this.props.activeForm}
                        displaySignUpSuccess={this.props.displaySignUpSuccess}
                    />
                    <SignupForm
                        handleSignUp={this.handleSignUp}
                        handleChange={this.handleChange}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        password={this.state.password}
                        retypedPassword={this.state.retypedPassword}
                        toggleForm={this.props.toggleForm}
                        activeForm={this.props.activeForm}
                        displaySignUpSuccess={this.props.displaySignUpSuccess}
                    />
                    <SignupSuccessPrompt
                        toggleForm={this.props.toggleForm}
                        activeForm={this.props.activeForm}
                        displaySignUpSuccess={this.props.displaySignUpSuccess}
                        toggleDisplaySignUpSuccess={this.props.toggleDisplaySignUpSuccess}
                    />
                    <p className="errMsg">{this.state.errorMessage}</p>
                </div>
            </div>
        );
    }
}

export default LoginBox;