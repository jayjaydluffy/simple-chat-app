import * as actions from './actionTypes';

export const selectAccount = account => {
    return dispatch => {
        dispatch({
            type: actions.SELECT_ACCOUNT,
            account
        });
    }
}