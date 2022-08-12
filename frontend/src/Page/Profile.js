import React, {useContext, useEffect, useState} from "react";
import {Container, Col, Row} from "react-bootstrap"
import NavbarUSer from "../Navbar/NavbarUser";
import { UserContext } from "../context/userContext"
// import ProfilePic from "../Asset/ProfilePic.png"
import BlankProf from "../Asset/blank-profile.png"
import { useQuery } from "react-query"
import { API } from "../config/api"

export default function Profile(){
    const [state] = useContext(UserContext);
    const [transaction, setTransaction] = useState([])

    let { data: profile} = useQuery("profileCache", async () => {
        const response = await API.get("/profile");
        return response.data.data;
    })


    const getTransactions = async () => {
        const response = await API.get("/transaction");
        setTransaction(response.data.data);
    }

    console.log(transaction)
    useEffect(() => {
        getTransactions();
    },[])
    return(
        <div>
            <NavbarUSer />
            <Container>
               <Col md="12">
                <Row>
                    <h2 style={{marginTop: "1.5em"}}>My Profile</h2>
                    <Col className="d-flex flex-row mt-2">
                        
                        <Col md="4">
                            <img src={profile?.image ? profile.image : BlankProf} alt="imgProfile" />
                        </Col>
                        <Col md="4" style={{marginLeft: "8em"}}>
                            <div style={{color:"red"}}>Full Name</div>
                            <div style={{marginBottom: "1em"}}>{state.user.name}</div>
                            <div style={{color:"red"}}>Email</div>
                            <div>{state.user.email}</div>
                        </Col>
                       
                    </Col>
                    <Col md="4">
                        <div>
                            <h2>History Transaction</h2>
                        </div>
                        {transaction.length != 0 ? (
                            <>
                                {transaction.map((item, index) => (
                                    <div style={{ background: "#303030" }} className="p-2 mb-1" key={index}>
                                        <Container>
                                            <Row>
                                                <Col>
                                                    <img
                                                        src={item.film.image}
                                                        alt=""
                                                        style={{
                                                                height: "100px",
                                                                width: "80px",
                                                                // objectFit: "cover",
                                                            }}
                                                        />
                                                </Col>
                                                    <Col>
                                                        <div style={{
                                                            fontSize: "18px",
                                                            color: "#F74D4D",
                                                            fontWeight: "500",
                                                            lineHeight: "19px",
                                                        }}>{item.film.title}</div>
                                                            
                                                        <div style={{
                                                            fontSize: "14px",
                                                            color: "blue",
                                                            fontWeight: "300",
                                                            color:"blue",
                                                        }}>{item.price} </div>
                                                        
                                                            
                                                    </Col>
                                                    <Col>
                                                        {/* <img 
                                                            src={Frame}
                                                            alt=""
                                                        /> */}
                                                        <div className={`status-transaction-${item.status} rounded-md p-2 font-bold text-center text-white basis-1/4`}>
                                                            {item.status}
                                                        </div>
                                                    </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="no-data-transaction">No transaction</div>
                        )}

                        
                    </Col>
                </Row>
                </Col>
            </Container>
        </div>
    )
}