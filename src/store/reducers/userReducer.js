import * as actions from '../actions/actionTypes';

const initState = {
    user: null
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.SELECT_ACCOUNT:
            return {
                ...state,
                user: action.account
            }
        default:
            return state;
    }
}

export default userReducer