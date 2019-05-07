import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "./SurveyList";
import { connect } from "react-redux";

const Dashboard = props => {
  // materialize icon 쓰려면 icon.html 을 사이트에서 검색해서 나오는 링크를 html에 넣어주어야한다.

  return (
    <div>
      Dashboard
      <SurveyList />
      <div className="fixed-action-btn">
        <Link
          to={
            props.auth && props.auth.credits === 0 ? "/surveys" : "/surveys/new"
          }
          className="btn-floating btn-large red"
          onClick={() => {
            if (props.auth && props.auth.credits === 0) {
              alert("Please charge Credit first");
            }
          }}
        >
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};
const mapStateToProps = ({ auth }) => {
  console.log(auth);
  return { auth };
};
export default connect(mapStateToProps)(Dashboard);
