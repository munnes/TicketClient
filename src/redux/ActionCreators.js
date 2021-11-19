
import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl'

//****Location */
export const postLocations = (location) => (dispatch) => {
   
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'locations', {
        method: 'POST',
        body: JSON.stringify(location),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(locations => { console.log('Location Added', locations); dispatch(addLocations(locations)); })
        .catch(error => dispatch(locationsFailed(error.message)));
}


export const fetchLocations = () => (dispatch) => {
    dispatch(locationsLoading(true));
    return fetch(baseUrl + 'locations')
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            //if server not response no hear any thing from server
            error => {
                var errmess = new Error(error.message);
                throw errmess
            })
        .then(response => response.json())
        .then(locations => dispatch(addLocations(locations)))
        .catch(error => dispatch(locationsFailed(error.message)));

}

export const locationsLoading = () => ({
    type: ActionTypes.LOCATIONS_LOADING
})

export const locationsFailed = (errmess) => ({
    type: ActionTypes.LOCATIONS_FAILD,
    payload: errmess
})

export const addLocations = (location) => ({
    type: ActionTypes.ADD_LOCATION,
    payload: location
})

//**************Cards */
export const postCards = (card) => (dispatch) => {
   
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'cards', {
        method: 'POST',
        body: JSON.stringify(card),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(fetchCards()))
        .catch(error => {
            console.log('Post card ', error.message);
            alert('Your card could not be posted\nError: ' + error.message);
        })
}


export const fetchCards = () => (dispatch) => {
    dispatch(cardsLoading(true));
    return fetch(baseUrl + 'cards')
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            //if server not response no hear any thing from server
            error => {
                var errmess = new Error(error.message);
                throw errmess
            })
        .then(response => response.json())
        .then(cards => dispatch(addCards(cards)))
        .catch(error => dispatch(cardsFailed(error.message)));

}

export const cardsLoading = () => ({
    type: ActionTypes.CARD_LOADING
})

export const cardsFailed = (errmess) => ({
    type: ActionTypes.CARD_FAILD,
    payload: errmess
})

export const addCards = (card) => ({
    type: ActionTypes.ADD_CARD,
    payload: card
})

//************Tickets */
export const postTickets = (ticket) => (dispatch) => {
   
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'tickets', {
        method: 'POST',
        body: JSON.stringify(ticket),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(fetchTickets()))
        .catch(error => {
            console.log('Post tickets ', error.message);
            alert('Your ticket could not be posted\nError: ' + error.message);
        })
}

export const fetchTickets = () => (dispatch) => {
    dispatch(ticketsLoading(true));
    return fetch(baseUrl + 'tickets')
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            //if server not response no hear any thing from server
            error => {
                var errmess = new Error(error.message);
                throw errmess
            })
        .then(response => response.json())
        .then(tickets => dispatch(addTickets(tickets)))
        .catch(error => dispatch(ticketsFailed(error.message)));

}

export const ticketsLoading = () => ({
    type: ActionTypes.TICKETS_LOADING
});

export const ticketsFailed = (errmess) => ({
    type: ActionTypes.TICKETS_FAILD,
    payload: errmess
});

export const addTickets = (ticket) => ({
    type: ActionTypes.ADD_TICKETS,
    payload: ticket
});

//*********************User */

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    };
}

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {


    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {  'Content-Type': 'application/json'},
        body: JSON.stringify(creds)
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', response.token);
                localStorage.setItem('creds', JSON.stringify(creds));
                // Dispatch the success action
                //dispatch(fetchFavorites());
                dispatch(receiveLogin(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(loginError(error.message)))
};

///********Logout********** */
export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');

    dispatch(receiveLogout())
}
//********************imge upload */

export const imageUpload = (file) => (dispatch) => {
   
    const bearer = 'Bearer ' + localStorage.getItem('token');
    const formData = new FormData();
   
    formData.append('imageFile', file);//imageFile : name used in server
    return fetch(baseUrl + 'imageUpload', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .catch(error => {
            console.log('Upload Image ', error.message);
            alert('Your image could not be upload\nError: ' + error.message);
        })
}