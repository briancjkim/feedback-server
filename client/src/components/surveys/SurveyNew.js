// SurveyNew shows SurveyForm and SurveyFormReview
import React from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from "redux-form";

class SurveyNew extends React.Component {
  state = {
    showFormReview: false
  };

  // SurveyForm에서 내용을입력하고 버튼누르면 shjowFormReview:true가되서 SurveyFormReview폼을보여준다.
  renderComponent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }
  render() {
    return <div className="container">{this.renderComponent()}</div>;
  }
}

// surveyform에서 reviewform으로 왔다갔다할때는 form에 내용을 그대로두고싶지만
// 다른 링크로 가거나 surveynew에서 cancel버튼 누르고 다시왔을때는 form의내용을
// 싹다 비우고 싶다. 그러기위해서는 surveyNew에서 벗어났을시에
// destroyOnUnMount:true가 default인 설정을 이용해서 surveyNew에서 벗어나면 지워지고
// surveyForm에서 벗어나면 안지워지게한다.
export default reduxForm({ form: "surveyForm" })(SurveyNew);
