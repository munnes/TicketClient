
import React,{useState } from "react";
import { Card, CardBody, CardHeader, Table, Form,FormGroup,Input,Label,Button } from 'reactstrap'
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';


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

function Home(props) {
    return (
        <div className="container">
          
            <br/>
            <div className="row">
                <div className="col-md-6">
            <RenderTickets item={props.tickets}
                isLoading={props.ticketsLoading}
                errMess={props.ticketsErrMess} />
                </div>
                <div className="col-md-6 mt-5">
                <img src={baseUrl + 'images/bus.jpg'} alt='crd' />
                    </div>
                </div>
        </div>
    )
}
export default Home;