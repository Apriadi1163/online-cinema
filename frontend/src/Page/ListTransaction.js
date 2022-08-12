import React, { useState, useEffect } from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import {Table} from "react-bootstrap"
import { API } from "../config/api"
import { useQuery } from "react-query"
import { Container } from "react-bootstrap"
// import { } from "react-icons"

export default function ListTransaction(){
    // let { data: transaction } = useQuery("transactionCache", async () => {
    //     const response = await API.get("/transaction");
    //     return response.data.data;
    //     console.log(response.data)
    // })

    const [transaction, setTransaction] = useState([])

    const getListsTrans = async () => {
        try{
            const response = await API.get("/transadmin");
            setTransaction(response.data.data)
            console.log(response.data.data)
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        getListsTrans();
    }, [])
    return(
        <div>
            <NavbarAdmin />
            <h2 style={{ marginLeft:"3.7em", marginTop: "1.5em", marginBottom:"1em"}}> Incoming Transaction</h2>
            <Container className="add-product">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>No</th>
                        <th>Users</th>
                        <th>Film</th>
                        <th>Number Account</th>
                        <th>status Payment</th>
                        {/* <th>Acction</th> */}
                        </tr>
                    </thead>
                        {transaction.map((item, index) => (
                        <tbody key={index}>
                            <tr>
                            <td>{index + 1}</td>
                            <td>{item.buyer.name}</td>
                            <td>{item.film.title}</td>
                            <td>{item.id}</td>
                            <td>{item.status}</td>
                            </tr>
                            
                        </tbody>
                        ))}
                </Table>
            </Container>
        </div>
    )
}