import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyFormReview = ({ onCancel, formValues, sendMail, history }) => {
  const renderContent = () => {
    return formFields.map(({ label, name }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues[name]}</div>
        </div>
      );
    });
  };
  // action creator에 history를 보내준다.
  return (
    <div>
      <h5>Please confirm your details</h5>
      {renderContent()}
      <button className="btn-flat red  white-text" onClick={onCancel}>
        Cancel
      </button>
      <button
        className="teal white-text right btn-flat"
        onClick={() => sendMail(formValues, history)}
      >
        Send Email
        <i className="material-icons right">mail</i>
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  // surveyForm은 SurveyForm에서 reduxForm으로 formname만들어준이름.
  return { formValues: state.form.surveyForm.values };
};

// 이컴포넌트는 Link로 온것이아니라서 history,match,location을 쓸수없지만
// react-router-dom의 withRouter를 쓰면 쓸수있다.
export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
