import axios from "axios";
import { FETCH_USER } from "./type";

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
