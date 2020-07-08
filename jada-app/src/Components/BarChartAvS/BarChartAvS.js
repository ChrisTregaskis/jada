import React from "react";
import './barChartAvS.css'
import BarChartAvSConstructor from "./BarChartAvSConstructor/BarChartAvSConstructor";

class BarChartAvS extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {

            }
        }
    }

    render() {
        return (
            <div className="col-8 barChartAvS">
                <BarChartAvSConstructor
                    data={this.state.data}
                />
            </div>
        )
    }
}

export default BarChartAvS;