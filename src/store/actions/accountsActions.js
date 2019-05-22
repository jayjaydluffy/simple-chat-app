import * as actions from './actionTypes';
import axios from 'axios';

const getAccountsStart = () => ({
    type: actions.GET_ACCOUNTS_START,
});

const getAccountsSuccess = accounts => ({
    type: actions.GET_ACCOUNTS_SUCCESS,
    accounts
});

const getAccountsFail = error => ({
    type: actions.GET_ACCOUNTS_SUCCESS,
    error
});

export const getAccounts = () => {
    return dispatch => {
        dispatch(getAccountsStart());
        axios.get('https://messenger.wappia.tech/accounts')
            .then(response => {
                dispatch(getAccountsSuccess(response.data.accounts))
            })
            .catch(err => {
                dispatch(getAccountsFail(err))
            })
    }
}