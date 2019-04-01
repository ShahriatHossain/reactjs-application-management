import * as actionTypes from "./actionTypes";

// all action creators here

// for candidates fetch success from server
export const fetchCandidatesSuccess = candidates => {
    return {
      type: actionTypes.FETCH_CANDIDATES_SUCCESS,
      candidates: candidates
    };
  };
  
  // if candidates fetch fail from server
  export const fetchCandidatesFail = error => {
    return {
      type: actionTypes.FETCH_CANDIDATES_FAIL,
      error: error
    };
  };
  
  // for candidates fetch start from server
  export const fetchCandidatesStart = () => {
    return {
      type: actionTypes.FETCH_CANDIDATES_START
    };
  };
  
  // for candidates data fetched from server
  export const fetchCandidates = (values) => {
    return {
      type: actionTypes.FETCH_CANDIDATES,
      values
    };
  };

  // to sort candidates asc or desc order by column name
  export const sortCandidates = (name, sortType) => {
    return {
      type: actionTypes.SORT_CANDIDATES,
      colName: name,
      sortType
    };
  };

  // to update url for sorting candidates asc or order by column name
  export const sortCandidatesUpdateUrl = (name, sortType, history) => {
    return {
      type: actionTypes.SORT_CANDIDATES_UPDATE_URL,
      colName: name,
      history,
      sortType
    };
  };

  // to filter candidates data by search text
  export const filterCandidates = (val) => {
    return {
      type: actionTypes.FILTER_CANDIDATES,
      val: val
    };
  };

  // to filter candidates data by search text
  export const filterCandidatesUpdateUrl = (val, history) => {
    return {
      type: actionTypes.FILTER_CANDIDATES_UPDATE_URL,
      val: val,
      history
    };
  };