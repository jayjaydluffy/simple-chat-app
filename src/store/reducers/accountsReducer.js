import * as actions from '../actions/actionTypes';

const initState = {
    fetching: false,
    fetched: false,
    error: null,
    data: null
}

const accountsReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.GET_ACCOUNTS_START:
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: null,
                data: null
            }
        case actions.GET_ACCOUNTS_SUCCESS:
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.accounts,
                error: null,
            }
        case actions.GET_ACCOUNTS_FAIL:
            return {
                ...state,
                fetching: false,
                fetched: false,
                data: null,
                error: action.error.message,
            }
        default:
            return state;
    }
}

export default accountsReducer