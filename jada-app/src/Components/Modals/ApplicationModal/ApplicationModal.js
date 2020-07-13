import React from "react";
import './applicationModal.css';
import ButtonMainToggle from "../../Buttons/ButtonMainToggle/ButtonMainToggle";

class ApplicationModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            application: {},
            modalClass: 'hidden'
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.modalActive !== this.props.modalActive) {
            if (this.props.modalActive) {
                this.setState({ modalClass: 'displayed' })
            } else {
                this.setState({ modalClass: 'hidden' })
            }
        }
    }

    handleClick = () => {
        this.props.toggleModalActive();
    }

    reformatDate = (date) => {
        let longDate = new Date(date).toString()
        let longDateArr = longDate.split(" ")
        let shortDateArr = [longDateArr[0], longDateArr[2], longDateArr[1], longDateArr[3]]
        return shortDateArr.join(" ")
    }

    displayApplicationData = () => {
        let application = this.props.applicationData;
        let displayData = [];

        if (application !== undefined) {
            let date = this.reformatDate(application.session_date);

            if (application.apply_attempted) {
                displayData.push(
                    <ul key={application.totalJobs_id}>
                        <li key={application.totalJobs_id + 1} className="d-flex justify-content-center jobTitle">
                            {application.job_title}
                        </li>
                        <li key={application.totalJobs_id + 2}>
                            <span className="applicationDetail">Applied on:</span> {date}
                        </li>
                        <li key={application.totalJobs_id + 3}>
                            <span className="applicationDetail">Applied at:</span> {application.session_time}
                        </li>
                        <li key={application.totalJobs_id + 4}>
                            <span className="applicationDetail">TotalJobs id:</span> {application.totalJobs_id}
                        </li>
                        <li key={application.totalJobs_id + 5}>
                            <span className="applicationDetail">Job reference:</span> {application.totalJobs_ref}
                        </li>
                        <li key={application.totalJobs_id + 6}>
                            <span className="applicationDetail">Applied:</span> {application.apply_attempted}
                        </li>
                        <li key={application.totalJobs_id + 7}>
                            <span className="applicationDetail">Interested:</span> {application.interested}
                        </li>
                        <li key={application.totalJobs_id + 8}>
                            <span className="applicationDetail">Salary:</span> {application.salary}
                        </li>
                        <li key={application.totalJobs_id + 9}>
                            <span className="applicationDetail">Job type:</span> {application.job_type}
                        </li>
                        <li key={application.totalJobs_id + 10}>
                            <span className="applicationDetail">Job posted:</span> {application.job_posted}
                        </li>
                        <li key={application.totalJobs_id + 11}>
                            <span className="applicationDetail">Job contact:</span> {application.job_contact}
                        </li>
                        <li key={application.totalJobs_id + 12}>
                            <span className="applicationDetail">Job url:</span> {application.job_url}
                        </li>
                        <li key={application.totalJobs_id + 13}>
                            <span className="applicationDetail">DKW found:</span> {application.found_dkw}
                        </li>
                        <li key={application.totalJobs_id + 14}>
                            <span className="applicationDetail">UDKW found:</span> {application.found_udkw}
                        </li>
                        <li key={application.totalJobs_id + 15}>
                            <span className="applicationDetail">Top24 found:</span> {application.found_top24}
                        </li>
                    </ul>
                )
            }
        }

        return displayData
    }

    render() {
        let modalClass = this.state.modalClass + ' applicationsModal'
        return (
            <div className={modalClass}>
                <h1 className="title d-flex justify-content-end">JADA</h1>

                {this.displayApplicationData()}

                <div className="modalButtonBox">
                    <ButtonMainToggle
                        buttonText="DONE"
                        handleClick={this.handleClick}
                    />
                </div>
            </div>
        );
    }
}

export default ApplicationModal;