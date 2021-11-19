import React, { Component } from "react";

import Footer from "./FooterComponent";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Cards from "./CardsComponent";
import Settings from './SettingsComponent'
import Tickets from "./TicketsComponet"
import Passenger from "./PassengerComponent";
import { fetchLocations, fetchCards, fetchTickets, loginUser,
     logoutUser, postTickets,imageUpload,postCards,postLocations } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';



const mapStateToProps = state => {
    return {
        locations: state.locations,
        cards: state.cards,
        tickets: state.tickets,
        auth: state.auth
    }
}
const mapDispatchToProps = (dispatch) => ({
    fetchLocations: () => { dispatch(fetchLocations()) },
    fetchCards: () => { dispatch(fetchCards()) },
    fetchTickets: () => { dispatch(fetchTickets()) },
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    postTickets: (ticket) => dispatch(postTickets(ticket)),
    imageUpload:(file)=>dispatch(imageUpload(file)),
    postCards:(card)=>dispatch(postCards(card)),
    postLocations:(location)=>dispatch(postLocations(location))
})


//********************* */

class Main extends Component {


    componentDidMount() {

        this.props.fetchLocations();
        this.props.fetchCards();
        this.props.fetchTickets();

        // alert('mount')

    }

    render() {

        const HomePage = () => {
            return (
                <Home
                tickets={this.props.tickets.tickets}
                ticketsLoading={this.props.tickets.isLoading}
                ticketsErrMess={this.props.tickets.errMess}
                />
            );
        }
        const SettingsPage = () => {
            return (
                <Settings
                    locations={this.props.locations.locations}
                    locationsLoading={this.props.locations.isLoading}
                    locationsErrMess={this.props.locations.errMess}
                    postLocations={this.props.postLocations}
                />
            );
        }

        const CardPage = () => {
            return (
                <Cards
                    cards={this.props.cards.cards}
                    cardsLoading={this.props.cards.isLoading}
                    cardsErrMess={this.props.cards.errMess}
                    imageUpload={this.props.imageUpload}
                    postCards={this.props.postCards}
                />
            );
        }
        const TicketPage = () => {
            return (
                <Tickets
                    tickets={this.props.tickets.tickets}
                    locations={this.props.locations.locations}
                    ticketsLoading={this.props.tickets.isLoading}
                    ticketsErrMess={this.props.tickets.errMess}
                    postTickets={this.props.postTickets}
                />
            );
        }
        return (
            <>
                <Header auth={this.props.auth}
                    loginUser={this.props.loginUser}
                    logoutUser={this.props.logoutUser}
                />
                <Switch>
                    <Route path='/home' component={HomePage}/>
                    <Route path='/passenger' component={()=><Passenger/>}/>
                    <Route path='/settings' component={SettingsPage} />
                    <Route path='/cards' component={CardPage} />
                    <Route path='/tickets' component={TicketPage} />

                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));