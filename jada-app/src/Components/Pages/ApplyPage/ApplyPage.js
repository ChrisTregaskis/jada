import React from "react";
import './applyPage.css';
import PageHeader from "../../StandAloneComponents/PageHeader/PageHeader";
import ApplyForm from "../../StandAloneComponents/ApplyForm/ApplyForm";

class ApplyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jobTitle: '',
            location: '',
            radius: '0'
        }
    }

    handleChange = (e, stateProperty) => {
        let updatedData = {};
        updatedData[stateProperty] = e.target.value;
        this.setState(updatedData)
    }

    handleApply = (e) => {
        e.preventDefault();
        console.log(this.state)
        this.setState({
            jobTitle: '',
            location: ''
        })
    }

    render() {
        return(
            <div className="container">
                <PageHeader/>
                <ApplyForm
                    handleApply={this.handleApply}
                    handleChange={this.handleChange}
                    jobTitle={this.state.jobTitle}
                    location={this.state.location}
                />
            </div>
        )
    }
}

export default ApplyPage;