import * as ActionTypes from './ActionTypes'

export const Locations = (state = {   isLoading: true,
    errMess: null,
    locations: [] }, action) => {
    switch (action.type) {
        case ActionTypes.LOCATIONS_LOADING:
            return { ...state ,isLoading: true, errMess: null, locations: [] }
        case ActionTypes.LOCATIONS_FAILD:
            return { ...state, isLoading: false, errMess: action.payload, locations: [] }
        case ActionTypes.ADD_LOCATION:
            return { ...state, isLoading: false, errMess: null, locations: action.payload }
        default:
            return state;
    }

}