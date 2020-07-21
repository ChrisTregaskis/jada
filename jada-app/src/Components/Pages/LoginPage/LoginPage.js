import React from "react";
import './loginPage.css';
import LoginBox from "../../StandAloneComponents/LoginBox/LoginBox";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeForm: 'LogIn'
        }
    }

    toggleForm = () => {
        if (this.state.activeForm === 'LogIn') {
            this.setState({ activeForm: 'SignUp' })
        } else if (this.state.activeForm === 'SignUp') {
            this.setState({ activeForm: 'LogIn' })
        }
    }

    render() {
        return (
            <div className="container-fluid loginPage">
                <LoginBox
                    toggleForm={this.toggleForm}
                />
            </div>
        );
    }
}

export default LoginPage;