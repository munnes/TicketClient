
import React, { useState } from "react";
import {
    Card, CardBody, CardHeader, Table, Form, FormGroup,
    Input, Label, Button, Breadcrumb, BreadcrumbItem
} from 'reactstrap'
import { Link } from 'react-router-dom';
import { Loading } from "./LoadingComponent";

function AddLocation({ postLocations }) {
    const [val, setVal] = useState('');
    return (<Card>
        <CardHeader>Locations</CardHeader>

        <Form className='container' onSubmit={() => postLocations({ name: val })}>
            <FormGroup>
                <Label htmlFor="location">Location</Label>
                <Input type='text' name='location' id='location'
                    onChange={e => setVal(e.target.value)} />
                <br />
            </FormGroup>
            <Button type="submit" value="submit" color="primary">Add Ticket</Button>
        </Form>
        <br />
    </Card>)
}

function RenderLocations({ item, isLoading, errMess }) {
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
            <Card>

                <CardBody>{item.map(loc => <div>{loc.name}</div>)}</CardBody>
            </Card>
        )
    }

}
function Settings(props) {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem  active>Locations</BreadcrumbItem>
                    <BreadcrumbItem><Link to="/cards">Cards</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/tickets">Tickets</Link></BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Locations</h3>
                    <hr />
                </div>
            </div>
            <AddLocation postLocations={props.postLocations} />
            <br />
            <RenderLocations item={props.locations}
                isLoading={props.locationsLoading}
                errMess={props.locationsErrMess} />
                <br/>
        </div>
    )
}
export default Settings;