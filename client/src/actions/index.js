import axios from "axios";
import {
  FETCH_USER,
  FETCH_SURVEYS,
  FETCH_LATEST,
  FETCH_OLDEST,
  FETCH_ATOZ,
  FETCH_MOST
} from "./type";

// reudx-thunk를 사용하면 dispatch에 직접 접근할 수 있도록 해줌.
// action 을 return하지않고 함수 자체를 리턴할수있게해줌.
export const fetchUser = () => async dispatch => {
  const user = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: user.data
  });
};

export const handleToken = token => async dispatch => {
  // 이것을 호출하면 서버에서는 유저에 크레딧을변경한후 유저를 리턴해주면되겟지
  const res = await axios.post("/api/stripe", token);
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const sendMail = (formValues, history) => async dispatch => {
  const res = await axios.post("/api/surveys", formValues);
  // SurveyFormReview에서 보내져온 history오브젝(react-router-dom)
  // /surveys로 보낸다.
  history.push("/surveys");

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");
  dispatch({
    type: FETCH_SURVEYS,
    payload: res.data
  });
};

export const deleteSurvey = surveyId => async dispatch => {
  const res = await axios.get(`/api/surveys/delete/${surveyId}`);
  console.log("button");
  dispatch({
    type: FETCH_SURVEYS,
    payload: res.data
  });
};

export const changeSort = sortType => async dispatch => {
  if (sortType === "oldest") {
    dispatch({
      type: FETCH_OLDEST,
      payload: null
    });
  } else if (sortType === "latest") {
    dispatch({
      type: FETCH_LATEST,
      payload: null
    });
  } else if (sortType === "most") {
    dispatch({
      type: FETCH_MOST,
      payload: null
    });
  } else if (sortType === "aToZ") {
    dispatch({
      type: FETCH_ATOZ,
      payload: null
    });
  }
};
