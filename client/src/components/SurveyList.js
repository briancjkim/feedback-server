import React from "react";
import { connect } from "react-redux";
import { fetchSurveys, deleteSurvey, changeSort } from "../actions";

class SurveyList extends React.Component {
  componentDidMount() {
    // updates survey status
    this.props.fetchSurveys();
  }

  handleSortChange = e => {
    const value = e.target.value;
    this.props.changeSort(value);
  };
  renderButtons() {
    if (this.props.surveys && this.props.surveys.length > 0) {
      return (
        <select
          name="sort"
          id="sort"
          style={{ display: "block" }}
          onChange={this.handleSortChange}
        >
          <option value="oldest">Oldest</option>
          <option value="latest">Latest</option>
          <option value="most">Most feedback</option>
          <option value="aToZ">A to Z</option>
        </select>
      );
    }
  }
  renderSurveys() {
    if (this.props.surveys) {
      return this.props.surveys.map(survey => (
        <div key={survey._id} className="card teal lighten-2 white-text">
          <div className="card-content">
            <button
              className="right white-text waves-effect waves-light btn"
              onClick={() => this.props.deleteSurvey(survey._id)}
            >
              X
            </button>
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent on: {new Date(survey.dataSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action ">
            <span>Yes: {survey.yes} </span>
            <span>No: {survey.no}</span>
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
    return (
      <div>
        {this.renderButtons()}
        {this.renderSurveys()}
      </div>
    );
  }
}
const mapStateToProps = ({ surveys }) => {
  console.log(surveys);
  return { surveys };
};
export default connect(
  mapStateToProps,
  { fetchSurveys, deleteSurvey, changeSort }
)(SurveyList);
