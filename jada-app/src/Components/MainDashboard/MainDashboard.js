import React from "react";
import './mainDashboard.css';
import PageHeader from "../PageHeader/PageHeader";

class MainDashboard extends React.Component {
    render() {
        return(
            <div className="container">
                <PageHeader/>
            </div>
        )
    }
}

export default MainDashboard;