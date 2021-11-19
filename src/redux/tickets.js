
import * as ActionTypes from './ActionTypes'

export const Tickets = (state = {   isLoading: true,
    errMess: null,
    tickets: [] }, action) => {
    switch (action.type) {
        case ActionTypes.TICKETS_LOADING:
            return { ...state ,isLoading: true, errMess: null, tickets: [] }
        case ActionTypes.TICKETS_FAILD:
            return { ...state, isLoading: false, errMess: action.payload, tickets: [] }
        case ActionTypes.ADD_TICKETS:
            return { ...state, isLoading: false, errMess: null, tickets: action.payload }
        default:
            return state;
    }

}