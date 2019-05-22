import * as actions from './actionTypes';
import axios from 'axios';


export const selectFriend = account => {
    return dispatch => {
        dispatch({
            type: actions.SELECT_FRIEND,
            account
        });
    }
}

const getConvoStart = () => ({
    type: actions.GET_CONVO_START,
});

const getConvoSuccess = convo => ({
    type: actions.GET_CONVO_SUCCESS,
    convo
});

const getConvoFail = error => ({
    type: actions.GET_CONVO_SUCCESS,
    error
});

export const getConvo = ({
    user,
    friend
}) => {
    return dispatch => {
        dispatch(getConvoStart());
        axios.get(`https://messenger.wappia.tech/conversations/from/${user}/to/${friend}`)
            .then(sentResponse => {
                const sentMessages = sentResponse.data.messages
                axios.get(`https://messenger.wappia.tech/conversations/from/${friend}/to/${user}`)
                    .then(receivedResponse => {
                        const receivedMessages = receivedResponse.data.messages
                        dispatch(getConvoSuccess({
                            sentMessages,
                            receivedMessages
                        }))
                    })
                    .catch(err => {
                        dispatch(getConvoFail(err))
                    })
            })
            .catch(err => {
                dispatch(getConvoFail(err))
            })
    }
}

const sendMessageStart = () => ({
    type: actions.SEND_MESSAGE_START,
});

const sendMessageSuccess = newMsg => ({
    type: actions.SEND_MESSAGE_SUCCESS,
    newMsg
});

const sendMessageFail = error => ({
    type: actions.SEND_MESSAGE_FAIL,
    error
});

export const sendMessage = ({
    user,
    friend,
    message
}) => {
    return dispatch => {
        dispatch(sendMessageStart());
        axios.post(`https://messenger.wappia.tech/conversations/from/${user}/to/${friend}`, message)
            .then(response => {
                dispatch(sendMessageSuccess({...message, type: 'sent'}));
            })
            .catch(err => {
                dispatch(sendMessageFail(err))
            })
    }
}