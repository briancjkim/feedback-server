// SurveyNew shows Form for user to input
import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import { validateEmails, validateEmail } from "../utils/validateEmails";
import formFields from "./formFields";

//코드의 반복을 줄이기위해 map을슨다
class SurveyForm extends React.Component {
  renderFields = () => {
    // array를 리턴해도 된다
    // component에는 input똗는 custom component를넣을수있다
    // Field는 reduxForm에서 제공되는 Field이다.
    // Field에 패스하는 props들은 다 custom component에 props로 전달된다.
    return formFields.map(({ label, name }) => (
      <Field
        key={name}
        component={SurveyField}
        type={"text"}
        label={label}
        name={name}
      />
    ));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className=" btn-flat red white-text">
            Cancle
          </Link>
          <button type="submit" className="teal right  btn-flat  white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// 이함수는 values에 form에서 작성한 모든 field값을 갖는 object를 argument로갖고
// error가 있을시에 error를 리턴한다
const validate = values => {
  const errors = {};
  // if (!values.title) {
  // field중에서 name=title인놈의 props.meta.error에 이내용이 추가가된다.
  //   errors.title = "you must provide a title";
  // }
  // from 항목의 이메일을 체크한다.
  errors.from = validateEmail(values.from || "");
  // 처음 렌더링할때는 values의 값들이 다 empty 이므로 || ''를해준다
  errors.recipients = validateEmails(values.recipients || "");
  formFields.forEach(({ name }) => {
    // object[key]=value이다.
    // property 부분에 variable이 들어가려면 []를통해 넣는게 좋다.
    if (!values[name]) {
      errors[name] = "you must provide a value";
    }
  });

  // errors를 리턴해서 없으면 굿 있으면 해당필드에 프로퍼티에 meta.error에추가.
  return errors;
};
// onHandleSubmit 은 제공된다.
// validate함수를 넣어주면 form이 submit될떄마다 이함수가 실행된다.
// 원래 destroyOnUnmount는 true로 설정되어있어서 SurveyForm컴포넌트가 언마운트(다른페이지로이동)하거나 할시에 form state안에 내용이 다사라진다.
// 근데 나는 formReview로갔다가 다시돌아왔을떄 input내용이 보존되어있어야하기때문에 false로한다.
// 근데 false로했을시 다른 컴포넌트로 아예 나갓다와도 계속 보존되는문제가발생 이는 surveyNew컴포넌트에서 destroyonmount설정을 기본으로해서 해결.
export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
