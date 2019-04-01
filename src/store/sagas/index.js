import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import * as sagas from "./candidate";

export function* watchCandidate() {
    yield all([
        takeEvery(actionTypes.FETCH_CANDIDATES, sagas.fetchCandidatesSaga),
        takeEvery(actionTypes.SORT_CANDIDATES_UPDATE_URL, sagas.sortCandidatesSaga),
        takeEvery(actionTypes.FILTER_CANDIDATES_UPDATE_URL, sagas.filterCandidatesSaga)
    ]);
}
