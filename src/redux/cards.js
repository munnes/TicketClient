
import * as ActionTypes from './ActionTypes'

export const Cards = (state = {   isLoading: true,
    errMess: null,
    cards: [] }, action) => {
    switch (action.type) {
        case ActionTypes.CARD_LOADING:
            return { ...state ,isLoading: true, errMess: null, cards: [] }
        case ActionTypes.CARD_FAILD:
            return { ...state, isLoading: false, errMess: action.payload, cards: [] }
        case ActionTypes.ADD_CARD:
            return { ...state, isLoading: false, errMess: null, cards: action.payload }
        default:
            return state;
    }

}