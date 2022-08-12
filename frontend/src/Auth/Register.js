import {Modal, Button, Form, Alert} from "react-bootstrap"
import { useMutation } from "react-query"
import Login from "./Login"
import { API } from "../config/api"
import React, {useState} from "react"

export default function Register({show, handleClose}){
    const [logShow, setLogShow] = useState(false);
    const handleLogClose = () => setLogShow(false);
    const handleLogShow = () => setLogShow(true);

    const handleLogin = () => {
        handleLogShow()
    }

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const {name, email, password} = form;
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try{
            e.preventDefault();

            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            }

            const body = JSON.stringify(form);

            const response = await API.post("/register", body, config);

            //notification
        }catch(error){
            console.log(error)
        }
    })
    return(
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-dark"></Modal.Header>
            <Modal.Body className="bg-dark">
                <h2 style={{color:"red"}}>Register</h2>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <div>
                        <input 
                            style={{width: "100%"}}
                            type="text"
                            placeholder="Email"
                            value={email}
                            name="email"
                            onChange={handleChange}
                            className="mb-3 px-2 py-2"
                        />
                        <input 
                            style={{width: "100%"}}
                            type="password"
                            placeholder="Password"
                            value={password}
                            name="password"
                            onChange={handleChange}
                            className="mb-3 px-2 py-2"
                        />
                        <input 
                            style={{width: "100%"}}
                            type="name"
                            placeholder="Full name"
                            value={name}
                            name="name"
                            onChange={handleChange}
                            className="mb-3 px-2 py-2"
                        />
                    </div>
                    <div>
                        <Button type="submit" className="btn btn-login" style={{width: "100%"}} variant="danger">
                            Register
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
                <p>Alredy have an account? klik 
                    <a style={{fontWeight: "bold"}} onClick={handleLogin} >here</a>
                </p>
            </Modal.Footer>
            <Login
                show={logShow}
                handleClose={handleLogClose}
            />
        </Modal>
    )
}