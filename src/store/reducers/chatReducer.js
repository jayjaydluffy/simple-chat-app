import * as actions from '../actions/actionTypes';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

const initState = {
    user: null,
    convo: {
        fetching: false,
        fetched: false,
        error: null,
        messages: [],
        totalMsgs: 0
    },
    sendMessage: {
        sending: false,
        sent: false,
        error: null,
    }
}

const chatReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.SELECT_FRIEND:
            return {
                ...state,
                user: action.account
            }
        case actions.GET_CONVO_START:
            return {
                ...state,
                convo: {
                    ...state.convo,
                    fetching: true,
                    fetched: false
                }
            }
        case actions.GET_CONVO_SUCCESS:
            const sent = action.convo.sentMessages;
            const received = action.convo.receivedMessages;

            return {
                ...state,
                convo: {
                    ...state.convo,
                    fetching: false,
                    fetched: true,
                    messages: orderBy([
                        ...map(sent, msg => ({ ...msg, type: 'sent' })),
                        ...map(received, msg => ({ ...msg, type: 'received' })),
                    ], ['timestamp', 'asc']),
                    totalMsgs: sent.length + received.length
                }
            }
        case actions.GET_CONVO_FAIL:
            return {
                ...state,
                convo: {
                    ...state.convo,
                    fetching: false,
                    fetched: false,
                    error: action.error.message,
                }
            }
        case actions.SEND_MESSAGE_START:
            return {
                ...state,
                sendMessage: {
                    ...state.sendMessage,
                    sending: true,
                }
            }
        case actions.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                sendMessage: {
                    ...state.sendMessage,
                    sending: false,
                    sent: true,
                },
                convo: {
                    ...state.convo,
                    messages: [...state.convo.messages, action.newMsg],
                    totalMsgs: state.convo + 1
                }
            }
        case actions.SEND_MESSAGE_FAIL:
            return {
                ...state,
                sendMessage: {
                    ...state.sendMessage,
                    sending: false,
                    sent: false,
                    error: action.error.message,
                }
            }
        default:
            return state;
    }
}

export default chatReducer