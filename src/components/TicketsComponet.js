
import React, { Component } from "react";
import { Card, CardBody, CardHeader, Table, Form, FormGroup, 
    Label, Input, Button ,Breadcrumb,BreadcrumbItem} from 'reactstrap'
import { Loading } from "./LoadingComponent";
import { Link } from 'react-router-dom';
class AddTicket extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fromValue: '',
            toValue: ''
        }
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
    }
    handleFromChange(event) {
        this.setState({ fromValue: this.From.value })
        event.preventDefault();
    }
    handleToChange(event) {
        this.setState({ toValue: this.To.value })
        event.preventDefault();
    }
    handelSubmit(event) {
   
        this.props.postTickets({ from: this.From.value , to: this.To.value , price: this.price.value });
        alert({ from: this.From.value , to: this.To.value , price: this.price.value })
        event.preventDefault();

    }
    render() {

        return (
            <Card>
                <CardHeader>Tickets</CardHeader>
                <Form className='container' onSubmit={this.handelSubmit}>
                    <FormGroup>
                        <Label htmlFor="From">From</Label>
                        <Input type="select" name="From" id="From"
                           onChange={this.handleFromChange}
                            innerRef={(input) => this.From = input}>
                            <option value='Select'>Select</option>
                            {this.props.locations.map((tkt) =>
                                <option value={tkt._id}>{tkt.name}</option>)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="To">To</Label>
                        <Input type="select" name="To" id="To"
                         onChange={this.handleToChange}
                            innerRef={(input) => this.To = input}>
                            <option value='Select'>Select</option>
                            {this.props.locations.map((tkt) => {
                                return (tkt._id != this.state.fromValue ?
                                    <option value={tkt._id}>{tkt.name}</option>
                                    : null)
                            })}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="price">Price</Label>
                        <Input type='number' name='price' id='price'
                            innerRef={(input) => this.price = input} />
                        <br />
                    </FormGroup>
                    <Button type="submit" value="submit" color="primary">Add Ticket</Button>
                </Form>
                <br />
            </Card>
        )
    }
}


function RenderTickets({ item, isLoading, errMess }) {
    if (isLoading) {
        return <Loading />
    }
    else if (errMess) {
        return (
            <h4>{errMess}</h4>
        )
    }
    else {
        return (
            <Table striped bordered hover className="mt-5" variant="dark">
                <thead>
                    <tr>
                        <th>From </th>
                        <th>To </th>
                        <th>Charge </th>
                    </tr>
                </thead>
                <tbody>
                    {item.map((tkt) => {
                        return (<tr key={tkt._id}>
                            <td>{tkt.from.name}</td>
                            <td>{tkt.to.name}</td>
                            <td>{tkt.price}</td>
                        </tr>)
                    }
                    )}
                </tbody>
            </Table>
        )
    }
}

function Tickets(props) {
    return (

        <div className="container">
             <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem ><Link to="/settings">Locations</Link></BreadcrumbItem>
                    <BreadcrumbItem ><Link to="/cards">Cards</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Tickets</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Locations</h3>
                    <hr />
                </div>
            </div>
            <div>
                <AddTicket locations={props.locations} 
                postTickets={props.postTickets}/>
            </div>
            <RenderTickets item={props.tickets}
                isLoading={props.ticketsLoading}
                errMess={props.ticketsErrMess} />
        </div>
    )
}
export default Tickets;