import React from "react";
import './appliedPercent.css';
import AppliedPercentConstructor from "./AppliedPercentConstructor/AppliedPercentConstructor";

class AppliedPercent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }


    render() {
        return (
            <div className="col-4 appliedPercentBox">
                <p className="boxTitle d-flex justify-content-center">APPLIED:</p>
                <AppliedPercentConstructor/>
            </div>
        )
    }
}

export default AppliedPercent;