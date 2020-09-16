import React from "react";
import './keyWordsConstructor.css';

class KeyWordsConstructor extends React.Component {
    displayKW = (keyWords) => {
        let keyWordsHTML = []
        keyWords.forEach(kw => {
            keyWordsHTML.push(<div className="defaultClearBtn mr-4 mb-4 deleteIcon">{kw}</div> )
        })
        return keyWordsHTML
    }

    render() {
        return (
            <div className="keyWordsBox">
                <form autoComplete="on" onSubmit={this.props.handleSubmit}>
                    <p className="preferenceTitle">{this.props.preferenceTitle}</p>
                    <div className="keyWordFormInput">
                        <div className="floating-label mr-4">
                            <input placeholder={this.props.placeHolder} type="text" name="keyWord" id={this.props.id}
                                   onChange={(e) => this.props.handleChange(e, `${this.props.stateProperty}`)}
                                   autoComplete="on" value={this.props.stateValue} required/>
                            <label htmlFor={this.props.id}>{this.props.preferenceTitle}</label>
                        </div>
                        <button className="defaultBtn kwAddBtn">ADD</button>
                    </div>
                </form>
                <div className="keyWords">
                    {this.displayKW(this.props.keyWordsList)}
                </div>
            </div>
        );
    }
}

export default KeyWordsConstructor;