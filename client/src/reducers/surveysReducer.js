import {
  FETCH_SURVEYS,
  FETCH_OLDEST,
  FETCH_LATEST,
  FETCH_ATOZ,
  FETCH_MOST
} from "../actions/type";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_OLDEST:
      state = [
        ...state.sort((a, b) => {
          const dateA = new Date(a.dataSent);
          const dateB = new Date(b.dataSent);
          return dateA - dateB;
        })
      ];
      return state;
    case FETCH_LATEST:
      state = [
        ...state.sort((a, b) => {
          const dateA = new Date(a.dataSent);
          const dateB = new Date(b.dataSent);
          return dateB - dateA;
        })
      ];
      return state;
    case FETCH_MOST:
      state = [
        ...state.sort((a, b) => {
          const sumA = a.yes + a.no;
          const sumB = b.yes + b.no;
          return sumB - sumA;
        })
      ];
      return state;
    case FETCH_ATOZ:
      state = [
        ...state.sort((a, b) => {
          const textA = a.title.toLowerCase();
          const textB = b.title.toLowerCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        })
      ];
      return state;
    case FETCH_SURVEYS:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
