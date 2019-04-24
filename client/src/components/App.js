import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Header from "./Header";

const Dashboard = () => <h2>Dashboard</h2>;
const Landing = () => <h2>Landing</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path={"/"} exact component={Landing} />
          <Route path={"/surveys"} exact component={Dashboard} />
          <Route path={"/surveys/new"} component={SurveyNew} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
