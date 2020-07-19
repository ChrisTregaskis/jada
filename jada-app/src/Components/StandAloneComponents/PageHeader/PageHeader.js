import React from "react";
import './pageHeader.css';

class PageHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTime: '',
            greetingMsg: 'Hello ',
            user_id: localStorage.getItem('user_id'),
            bearerToken: localStorage.getItem('bearerToken'),
            userName: ''
        }
    }

    componentDidMount() {
        this.updateUserName();
        this.getTime();
    }

    fetchUserData = async () => {
        let url = `http://localhost:8080/user/${this.state.user_id}`
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + this.state.bearerToken
            }
        })
        data = await data.json();
        if (data.status !== 200) {
            return { success: false }
        } else {
            return  data
        }
    }

    updateUserName = async () => {
        let userData = await this.fetchUserData()

        if (userData.status === 200) {
            let first_name = userData.user.first_name;
            this.setState({ userName: first_name })
        }

    }

    getTime = () => {
        let today = new Date();
        let hh = today.getHours();

        if (hh <= 11) {
            this.setState({ greetingMsg: 'Good Morning ' })
        } else if (hh >= 11 && hh <= 18) {
            this.setState({ greetingMsg: 'Good Afternoon '})
        } else if (hh >= 17) {
            this.setState({ greetingMsg: 'Good Evening '})
        } else {
            this.setState({ greetingMsg: 'Yo '})
        }

    }

    render() {
        let greeting = this.state.greetingMsg + this.state.userName;
        return (
            <div>
                <div className="col-xl-12 pageHeader d-flex justify-content-between">
                    <p className="greeting d-flex align-items-center">{greeting}</p>
                    <h1 className="title">JADA</h1>
                </div>
            </div>
        )
    }
}

export default PageHeader;