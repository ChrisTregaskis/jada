import React from "react";
import './pageHeader.css';

class PageHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTime: '',
            greetingMsg: 'Hello '
        }
    }

    componentDidMount() {
        this.getTime();
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
        let greeting = this.state.greetingMsg + 'Chris';
        return (
            <div>
                <div className="col-12 pageHeader d-flex justify-content-between">
                    <p className="greeting d-flex align-items-center">{greeting}</p>
                    <h1 className="title">JADA</h1>
                </div>
            </div>
        )
    }
}

export default PageHeader;