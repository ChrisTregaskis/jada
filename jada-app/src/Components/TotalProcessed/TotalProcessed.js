import React from "react";
import './totalProcessed.css';

class TotalProcessed extends React.Component {

    render() {
        return (
            <div className="totalProcessedBox">
                <p className="totalProcessedTitle">TOTAL</p>
                <p className="totalProcessedTitle">PROCESSED:</p>
                <p className="totalProcessedFigure">307</p>
            </div>
        )
    }
}

export default TotalProcessed;