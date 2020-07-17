import React from "react";
import './loginPage.css';
import LoginBox from "../../StandAloneComponents/LoginBox/LoginBox";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="container-fluid loginPage">
                <LoginBox />
            </div>
        );
    }
}

export default LoginPage;