import React from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../actions";

class SurveyList extends React.Component {
  componentDidMount() {
    // updates survey status
    this.props.fetchSurveys();
  }
  renderSurveys() {
    if (this.props.surveys) {
      return this.props.surveys.reverse().map(survey => (
        <div key={survey._id} className="card teal lighten-2 white-text">
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent on: {new Date(survey.dataSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action ">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      ));
    } else if (this.props.surveys && this.props.surveys.length === 0)
      return "No Surveys to display, Please add a Survey";
    else {
      return "Loading";
    }
  }
  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}
const mapStateToProps = ({ surveys }) => {
  return { surveys };
};
export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
