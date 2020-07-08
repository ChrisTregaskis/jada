import React from "react";
import './barChartAvS.css'
import BarChartAvSConstructor from "./BarChartAvSConstructor/BarChartAvSConstructor";

class BarChartAvS extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            avsData:[100, 90]
        }
    }

    

    render() {
        return (
            <div className="col-8 barChartAvS">
                <BarChartAvSConstructor
                    data={this.state.avsData}
                />
            </div>
        )
    }
}

export default BarChartAvS;