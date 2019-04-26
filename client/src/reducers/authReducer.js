import { FETCH_USER } from "../actions/type";

// 로딩중일때는 null, 끝나고 값이있으면 user, 값이없으면 false줄거임
export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};
