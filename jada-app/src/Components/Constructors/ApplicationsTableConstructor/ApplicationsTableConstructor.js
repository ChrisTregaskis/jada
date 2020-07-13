import React from "react";
import './applicationsTableConstructor.css';
import ApplicationModal from "../../Modals/ApplicationModal/ApplicationModal";
import BackgroundOverlay from "../../StandAloneComponents/BackgroundOverlay/BackgroundOverlay";

class ApplicationsTableConstructor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableData: {
                headers: [],
                datasets: [],
                modalActive: false,
                applicationId: ''
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tableData !== this.state.tableData) {
            this.setState({ tableData: this.props.tableData })
        }
    }

    generateHeader = () => {
        let headers = [];
        let headerData = this.props.tableData.headers;
        for (let i=0; i < headerData.length; i++) {
            headers.push(<th key={headerData[i]}>{headerData[i]}</th>)
        }
        return headers
    }

    generateTDForRows = (headerData, tableRowObj) => {
        let tdData = [];
        for (let i=0; i < headerData.length; i++) {
            let data = tableRowObj[headerData[i]];

            if (typeof(data) === "undefined") {
                data = "Not Set In Application Data"
                tdData.push(<td key={data}>{data}</td>)
            } else if (typeof(data) === "boolean") {
                if (data) {
                    data = "True"
                    tdData.push(<td key={data}>{data}</td>)
                } else {
                    data = "False"
                    tdData.push(<td key={data}>{data}</td>)
                }
            } else {
                tdData.push(<td key={data}>{data}</td>)
            }

        }
        return tdData
    }

    // For dynamic data, must include headers and
    // dataset obj must include _id as well as headers
    generateRows = () => {
        let tableRows = [];
        let tableRowsData = this.props.tableData.datasets;
        let headerData = this.props.tableData.headers;

        for (let i=0; i < tableRowsData.length; i++) {
            let tdData = this.generateTDForRows(headerData, tableRowsData[i])
            tableRows.push(
                <tr key={i} id={tableRowsData[i]._id} onClick={this.openModal} className="applicationsTableRow">
                    {tdData}
                </tr>
            )
        }

        return tableRows
    }

    toggleModalActive = () => {
        this.setState({ modalActive: !this.state.modalActive })
    }

    openModal = (e) => {
        e.persist()
        let objId = e.target.parentNode.id
        this.setState({ applicationId: objId })
        this.toggleModalActive()
    }

    render() {
        return (
            <div className="col-xl-12">
                <BackgroundOverlay
                    modalActive={this.state.modalActive}
                />
                <ApplicationModal
                    modalActive={this.state.modalActive}
                    applicationId={this.state.applicationId}
                    toggleModalActive={this.toggleModalActive}
                />
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            {this.generateHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateRows()}
                    </tbody>
                </table>
            </div>
        );
    }


}

export default ApplicationsTableConstructor;