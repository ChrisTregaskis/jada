import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainDashboard from "./Components/Pages/MainDashboard/MainDashboard";
import TablesPage from "./Components/Pages/TablesPage/TablesPage";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

class Routing extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={ MainDashboard } />
                        <Route path="/tables" component={ TablesPage } />
                    </Switch>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Routing />
    </React.StrictMode>,
    document.getElementById('root')
);
