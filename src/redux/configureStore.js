
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Locations } from './locations';
import { Cards } from './cards';
import { Tickets } from './tickets';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers(
            {
                locations: Locations,
                cards: Cards,
                tickets: Tickets,
                auth:Auth

            }),
        applyMiddleware(thunk, logger)
    );
    return store;
}