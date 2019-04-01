import { put } from "redux-saga/effects";
import queryString from 'query-string';
import { startCase, toLower } from 'lodash';
import moment from 'moment';

import axios from "../../axios-candidates";
import * as actions from "../actions";

export function* fetchCandidatesSaga(action) {
  // dispatch fetch candidate start action
  yield put(actions.fetchCandidatesStart());

  try {
    // retrieve data from server
    const response = yield axios.get("/api/v1/candidates");
    const results = response.data.data;
    const error = response.data.error;

    // checking error to throw an exception
    if (error) {
      throw error;
    }

    const fetchedCandidates = [];

    // add results formatting data
    for (let key in results) {
      fetchedCandidates.push({
        ...{
          id: results[key].id,
          name: results[key].name,
          email: results[key].email,
          birth_date: moment().diff(results[key].birth_date, 'years'),
          year_of_experience: results[key].year_of_experience,
          position_applied: results[key].position_applied,
          application_date: moment(results[key].application_date).format('DD/MM/YYYY'),
          status: startCase(toLower(results[key].status)),
        }
      });
    }

    // dispatch fetch candidates success action with payload
    yield put(actions.fetchCandidatesSuccess(fetchedCandidates));

    // parsing values from query string url
    const values = yield queryString.parse(action.values);

    if (values) {
      // dispatch filter candidates action with payload
      yield put(actions.filterCandidates(values.filter));

      // dispatch sort candidates actions by sort value from query string with payload
      yield put(actions.sortCandidates(values.sortBy, values.sort));
    }

  } catch (error) {
    // dispatch fetch candidates fail action with error payload
    yield put(actions.fetchCandidatesFail(error));
  }
}

export function* sortCandidatesSaga(action) {
  // dispatch sort candidate asc action
  yield put(actions.sortCandidates(action.colName, action.sortType));

  // update url
  yield action.history.push('/applications?sort=' + action.sortType + '&sortBy=' + action.colName)
}

export function* filterCandidatesSaga(action) {
  // dispatch fitler candidates action
  yield put(actions.filterCandidates(action.val));

  // update url
  yield action.history.push('/applications?filter=' + action.val)
}
