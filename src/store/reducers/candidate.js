import { orderBy, isEmpty } from 'lodash';

import * as actionTypes from '../actions/actionTypes';
import { updateObject, getFilterdResult } from '../../shared/utility';

const initialState = {
    candidates: [],
    loading: false,
    tmpCandidates: []
};

// all reducers here

// fetch candidate start from server
const fetchCandidatesStart = (state, action) => {
    return updateObject(state, { loading: true });
};

// when fetch candidates success from server
const fetchCandidatesSuccess = (state, action) => {
    return updateObject(state, {
        candidates: action.candidates,
        tmpCandidates: action.candidates,
        loading: false
    });
};

// when fail to fetch candidates from server
const fetchCandidatesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

// to sort candidates as asc order
const sortCandidates = (state, action) => {
    let candidates = state.candidates;
    candidates = orderBy(candidates, [action.colName], [action.sortType]); // Use Lodash to sort array by property

    return updateObject(state, {
        candidates: candidates
    });
};

// to filter candidates data
const filterCandidates = (state, action) => {
    let candidates = { ...state.tmpCandidates };
    candidates = getFilterdResult(candidates, action.val)

    candidates = isEmpty(action.val) ?
        state.tmpCandidates : candidates;

    return updateObject(state, {
        candidates: candidates
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CANDIDATES_START: return fetchCandidatesStart(state, action);
        case actionTypes.FETCH_CANDIDATES_SUCCESS: return fetchCandidatesSuccess(state, action);
        case actionTypes.FETCH_CANDIDATES_FAIL: return fetchCandidatesFail(state, action);
        case actionTypes.SORT_CANDIDATES: return sortCandidates(state, action);
        case actionTypes.FILTER_CANDIDATES: return filterCandidates(state, action);
        default: return state;
    }
};

export default reducer;