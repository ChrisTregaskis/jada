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

    reformatKeyWords = (keyWords) => {
        let reformatedKeyWords = [];
        for (let i = 0; i < keyWords.length; i++) {
            let kw = keyWords[i];
            if (kw !== 'DEVELOPER' && kw !== 'SOFTWARE' &&
                kw !== 'ENGINEER' && kw !== 'ENGINEERING') {
                reformatedKeyWords.push(kw)
            }
        }
        this.removeDuplicates(reformatedKeyWords)
        return reformatedKeyWords.join(", ").toLowerCase();
    }

    removeDuplicates = (array) => {
        return array.reduce((unique, item) =>
            unique.includes(item) ? unique : [...unique, item],[]);
    }

    displayData = (application) => {
        let displayData = [];
        let date = this.reformatDate(application.session_date);
        let appliedTime = application.session_time.substring(0,5);
        let applied = application.apply_attempted.toString().toUpperCase();
        let interested = application.interested.toString().toUpperCase();
        let dkw = this.reformatKeyWords(application.found_dkw);
        let udkw = this.reformatKeyWords(application.found_udkw);
        let top24 = this.reformatKeyWords(application.found_top24);
        let key = application.totalJobs_id;
        let reference = application.totalJobs_ref;
        let salary = application.salary;
        let jobType = application.job_type;
        let jobPosted = application.job_posted;
        let jobContact = application.job_contact;

        if (application.apply_attempted) {
            displayData.push(
                <ul key={key}>
                    <li key={key + 1} className="d-flex justify-content-center jobTitle">{application.job_title}</li>
                    <li key={key + 2} className="d-flex justify-content-center jobUrl">{application.job_url}</li>
                    <li key={key + 3}><span className="applicationDetail">Processed on:</span> {date}</li>
                    <li key={key + 4}><span className="applicationDetail">Processed at:</span> {appliedTime}</li>
                    <li key={key + 5}><span className="applicationDetail">TotalJobs id:</span> {key}</li>
                    <li key={key + 6}><span className="applicationDetail">Job reference:</span> {reference}</li>
                    <li key={key + 7}><span className="applicationDetail">Applied:</span> {applied}</li>
                    <li key={key + 8}><span className="applicationDetail">Interested:</span> {interested}</li>
                    <li key={key + 9}><span className="applicationDetail">Salary:</span> {salary}</li>
                    <li key={key + 10}><span className="applicationDetail">Job type:</span> {jobType}</li>
                    <li key={key + 11}><span className="applicationDetail">Job posted:</span> {jobPosted}</li>
                    <li key={key + 12}><span className="applicationDetail">Job contact:</span> {jobContact}</li>
                    <li key={key + 13}><span className="applicationDetail">DKW found:</span> {dkw}</li>
                    <li key={key + 14}><span className="applicationDetail">UDKW found:</span> {udkw}</li>
                    <li key={key + 15}><span className="applicationDetail">Top24 found:</span> {top24}</li>
                </ul>
            )
        } else if (!application.apply_attempted && interested) {
            displayData.push(
                <ul key={key}>
                    <li key={key + 1} className="d-flex justify-content-center jobTitle">{application.job_title}</li>
                    <li key={key + 2} className="d-flex justify-content-center jobUrl">{application.job_url}</li>
                    <li key={key + 3}><span className="applicationDetail">Processed on:</span> {date}</li>
                    <li key={key + 4}><span className="applicationDetail">Processed at:</span> {appliedTime}</li>
                    <li key={key + 5}><span className="applicationDetail">TotalJobs id:</span> {key}</li>
                    <li key={key + 6}><span className="applicationDetail">Applied:</span> {applied}</li>
                    <li key={key + 7}><span className="applicationDetail">Interested:</span> {interested}</li>
                    <li key={key + 8}><span className="applicationDetail">DKW found:</span> {dkw}</li>
                    <li key={key + 9}><span className="applicationDetail">UDKW found:</span> {udkw}</li>
                    <li key={key + 10}><span className="applicationDetail">Top24 found:</span> {top24}</li>
                </ul>
            )
        } else {
            displayData.push(
                <ul key={key}>
                    <li key={key + 1} className="d-flex justify-content-center jobTitle">{application.job_title}</li>
                    <li key={key + 3}><span className="applicationDetail">Processed on:</span> {date}</li>
                    <li key={key + 4}><span className="applicationDetail">Processed at:</span> {appliedTime}</li>
                    <li key={key + 5}><span className="applicationDetail">TotalJobs id:</span> {key}</li>
                    <li key={key + 6}><span className="applicationDetail">Applied:</span> {applied}</li>
                    <li key={key + 7}><span className="applicationDetail">Interested:</span> {interested}</li>
                    <li key={key + 8}><span className="applicationDetail">DKW found:</span> {dkw}</li>
                    <li key={key + 9}><span className="applicationDetail">UDKW found:</span> {udkw}</li>
                    <li key={key + 10}><span className="applicationDetail">Top24 found:</span> {top24}</li>
                </ul>
            )
        }

        return displayData;
    }

    displayApplicationData = () => {
        let application = this.props.applicationData;
        let displayData = [];
        if (application !== undefined) {
            let applyAttempted = this.displayData(application)
            displayData.push(applyAttempted)
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