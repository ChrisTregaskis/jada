import React from "react";
import './keyWordsConstructor.css';

class KeyWordsConstructor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: localStorage.getItem('user_id'),
            bearerToken: localStorage.getItem('bearerToken'),
            keyWordsHTML: []
        }
    }

    componentDidMount() {
        let kWHTML = this.displayKW(this.props.dbProperty, this.props.keyWordsList)
        this.setState({ keyWordsHTML: kWHTML })
    }

    updateKeyWordsHTML = () => {
        let kWHTML = this.displayKW(this.props.dbProperty, this.props.keyWordsList)
        this.setState({ keyWordsHTML: kWHTML })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.keyWordsList !== this.props.keyWordsList) {
            this.updateKeyWordsHTML()
        }
    }

    displayKW = (dbProperty, keyWords) => {
        let keyWordsHTML = []
        keyWords.forEach(kw => {
            keyWordsHTML.push(
                <form key={kw} onSubmit={this.handleDelete}>
                    <button className="defaultClearBtn mr-4 mb-4 deleteIcon" data-kw_group={dbProperty}>{kw}</button>
                </form>
            )
        })
        return keyWordsHTML
    }

    handleDelete = async (e) => {
        e.preventDefault();
        let kwGroup = e.target.childNodes[0].dataset.kw_group;
        let kw = e.target.childNodes[0].textContent;
        let updatePackage;
        if (kwGroup === 'dkw') {
            updatePackage = { "dkw": kw }
        } else if (kwGroup === 'udkw') {
            updatePackage = { "udkw": kw }
        } else if (kwGroup === 'ikw') {
            updatePackage = { "ikw": kw }
        }

        let keyWordListUpdated = await this.removeKeyWordFromList(updatePackage);
        if (keyWordListUpdated) {
            await this.props.updateStateKeyWords();
            await this.updateKeyWordsHTML()
        }
    }

    removeKeyWordFromList = async (keyWord) => {
        let reqData = JSON.stringify(keyWord);
        let url = `http://localhost:8080/user/preferences/keyWords/${this.state.user_id}`;
        const res = await fetch(url, {
            method: 'PUT',
            body: reqData,
            headers: {
                "Content-Type" : "application/json",
                "Authorization": "Bearer " + this.state.bearerToken
            }
        })
        let response = await res.json();
        return response.success
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let updateKW = this.props.stateValue
        let dbProperty = this.props.dbProperty
        let updatePackage;
        if (dbProperty === 'dkw') {
            updatePackage = { "dkw": updateKW }
        } else if (dbProperty === 'udkw') {
            updatePackage = { "udkw": updateKW }
        } else if (dbProperty === 'ikw') {
            updatePackage = { "ikw": updateKW }
        }

        let keyWordListUpdated = await this.updateKeyWordList(updatePackage);
        if (keyWordListUpdated) {
            await this.props.updateStateKeyWords();
            await this.updateKeyWordsHTML()
        }
        this.props.clearStateKW(this.props.stateProperty)
    }

    updateKeyWordList = async (newKeyWord) => {
        let reqData = JSON.stringify(newKeyWord);
        let url = `http://localhost:8080/user/preferences/${this.state.user_id}`;
        const res = await fetch(url, {
            method: 'PUT',
            body: reqData,
            headers: {
                "Content-Type" : "application/json",
                "Authorization": "Bearer " + this.state.bearerToken
            }
        })
        let response = await res.json();
        return response.success
    }

    render() {
        return (
            <div className="keyWordsBox">
                <form className="mb-4" autoComplete="on" onSubmit={this.handleSubmit}>
                    <p className="preferenceTitle">{this.props.preferenceTitle}</p>
                    <div className="keyWordFormInput">
                        <div className="floating-label mr-4">
                            <input placeholder={this.props.placeHolder} type="text" name="keyWord" id={this.props.id}
                                   onChange={(e) => this.props.handleChange(e, `${this.props.stateProperty}`)}
                                   autoComplete="off" value={this.props.stateValue} required/>
                            <label htmlFor={this.props.id}>{this.props.preferenceTitle}</label>
                        </div>
                        <button className="defaultBtn kwAddBtn">ADD</button>
                    </div>
                </form>
                <div className="keyWords">
                    {this.state.keyWordsHTML}
                </div>
            </div>
        );
    }
}

export default KeyWordsConstructor;