
import React, { Component } from "react";
import {
    Card, CardBody, CardHeader, Label, Input, Form,
    FormGroup, Button, Table, Breadcrumb, BreadcrumbItem
} from 'reactstrap'
import { Link } from 'react-router-dom';
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';

class AddCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
            fileName: ''
        }
        this.handelSubmit = this.handelSubmit.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }
    handelSubmit(event) {
        //alert(this.state.selectedFile.name)
        this.props.imageUpload(this.state.selectedFile)
        this.props.postCards({ amount: this.Amount.value, image: 'images/' + this.state.fileName })
        event.preventDefault();
    }
    changeHandler = (event) => {
        //  alert(event.target.files[0].name)

        this.setState({
            selectedFile: event.target.files[0],
            fileName: event.target.files[0].name
        });
        event.preventDefault();
    };

    render() {
        return (
            <Card>
                <CardHeader>Cards</CardHeader>
                <Form className="container" onSubmit={this.handelSubmit}>
                    <FormGroup>
                        <Label htmlFor="Amount">Amount</Label>
                        <Input type='text' name='Amount' id="Amount"
                            innerRef={(input) => this.Amount = input} />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Input type='file' name='file'
                            onChange={this.changeHandler} />
                    </FormGroup>
                    <br />
                    <Button type='submit' value="submit" color="primary"> Add Card</Button>

                </Form>
                <br />
            </Card>
        )
    }

}

function RenderCards({ item, isLoading, errMess }) {
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
                        <th>Amount </th>
                        <th>Image </th>
                    </tr>
                </thead>
                <tbody>
                    {item.map((crd) => {
                        return (<tr key={crd._id}>
                            <td>{crd.amount}</td>
                            <td><img src={baseUrl + crd.image} alt='crd' /></td>

                        </tr>)
                    }
                    )}
                </tbody>
            </Table>


        )
    }

}
function Cards(props) {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem ><Link to="/settings">Locations</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Cards</BreadcrumbItem>
                    <BreadcrumbItem><Link to="/tickets">Tickets</Link></BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Locations</h3>
                    <hr />
                </div>
            </div>
            <AddCard imageUpload={props.imageUpload}
                postCards={props.postCards} />
            <RenderCards item={props.cards}
                isLoading={props.cardsLoading}
                errMess={props.cardsErrMess} />
        </div>
    )
}
export default Cards;