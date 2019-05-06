// SurveyField contains logic to render a single
// label and text input

import React from "react";

const SurveyField = ({ input, label, meta: { error, touched } }) => {
  // customised 된거여도 redux-form이 prop에 onchange나 이러한함수다넣어줌
  // props안에 input안에잇는 모든함수들을 input엘리먼트안에 넣엇다.
  // touched 는 인풋을 클릭한적있으면 true값이된다. error는 validate함수에서 erorr가 있을시 프롭으로 전달된다.
  // touched 가 트루라면 error가있으면 표시 (즉 화면 첫번째랜터할떄 error를 표현하지않는다.)
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

export default SurveyField;
