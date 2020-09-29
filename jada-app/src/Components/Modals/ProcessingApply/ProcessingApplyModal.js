import React from "react";
import './processingApplyModal.css';

class ProcessingApplyModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            className: 'hidden',
            logInView: 'Logging into account...',
            enterSearchView: '',
            processResView: '',
            logOutView: '',
            logInClass: 'loading',
            enterSearchClass: '',
            processResClass: '',
            logOutClass: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.processingApply !== this.props.processingApply) {
            // console.log('change found processingApply')
            if (this.props.processingApply) {
                this.setState({ className: 'displayed' })
            } else if (!this.props.processingApply) {
                this.setState({
                    className: 'hidden',
                    logInView: 'Logging in...',
                    enterSearchView: '',
                    processResView: '',
                    logOutView: '',
                    logInClass: 'loading',
                    enterSearchClass: '',
                    processResClass: '',
                    logOutClass: ''
                })
            }
        } else if (prevProps.loggedIn !== this.props.loggedIn) {
            // console.log('change found logged in')
            if (this.props.loggedIn && !this.props.enteredSearch) {
                this.setState({
                    logInView: 'Logged in.',
                    logInClass: '',
                    enterSearchView: 'Entering your search...',
                    enterSearchClass: 'loading'
                })
            } else if (!this.props.loggedIn) {
                this.setState({
                    logInView: 'Logging into account...',
                    logInClass: 'loading'
                })
            }
        } else if (prevProps.enteredSearch !== this.props.enteredSearch) {
            // console.log('change found entered search')
            if (this.props.enteredSearch && !this.props.processedResults) {
                this.setState({
                    enterSearchView: 'Search entered, results found.',
                    enterSearchClass: '',
                    processResView: 'Processing results...',
                    processResClass: 'loading'
                })
            }
        } else if (prevProps.processedResults !== this.props.processedResults) {
            // console.log('change found processed results')
            if (this.props.processedResults && !this.props.loggedOut) {
                this.setState({
                    processResView: 'Processed results.',
                    processResClass: '',
                    logOutView: 'Logging out account...',
                    logOutClass: 'loading'
                })
            }
        } else if (prevProps.loggedOut !== this.props.loggedOut) {
            // console.log('change found logged out')
            if (this.props.loggedOut) {
                this.setState({
                    logOutView: 'Logged out.',
                    logOutClass: ''
                })
                setTimeout(() => {
                    this.setState({
                        className: 'hidden',
                        logInView: 'Logging in...',
                        enterSearchView: '',
                        processResView: '',
                        logOutView: '',
                        logInClass: 'loading',
                        enterSearchClass: '',
                        processResClass: '',
                        logOutClass: ''
                    })
                }, 3000)
            }
        }
    }


    render() {
        let className = this.state.className + ' processingApplyView'
        let logInClass = this.state.logInClass + ' '
        let enterSearchClass = this.state.enterSearchClass + ' '
        let processResClass = this.state.processResClass + ' '
        let logOutClass = this.state.logOutClass + ' '
        return (
            <div className={className}>
                <h4 className={logInClass}>{this.state.logInView}</h4>
                <h4 className={enterSearchClass}>{this.state.enterSearchView}</h4>
                <h4 className={processResClass}>{this.state.processResView}</h4>
                <h4 className={logOutClass}>{this.state.logOutView}</h4>
            </div>
        );
    }
}

export default ProcessingApplyModal;