import {Modal, Button, Form, Alert} from "react-bootstrap"
import Register from "./Register";
import { useMutation } from "react-query"
import { API } from "../config/api"
import React, {useContext, useState} from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"

export default function Login({show, handleClose}){
    const [regShow, setRegShow] = useState(false);
    const handleRegClose = () => setRegShow(false);
    const handleRegShow = () => setRegShow(true);

    const handleRegister = () => {
        handleRegShow()
    }

    let navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);
    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const {email, password} = form;

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
            };

            const body = JSON.stringify(form);

            const response = await API.post("/login", body, config);
            console.log(response);

            //notification
            if (response?.status === 200){
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data.data,
                });

                if (response.data.data.status === "admin"){
                    navigate("/list-transaction")
                }else{
                    navigate("/")
                }
            }
        }catch(error){
            console.log(error)
        }
    })
    return(
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-dark"></Modal.Header>
            <Modal.Body className="bg-dark">
                <h2 style={{color: "red"}}>Login</h2>
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
                    </div>
                    <div>
                        <Button type="submit" className="btn btn-login" style={{width: "100%"}} variant="danger">
                            Login
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
                <p>Don't have an account? klik 
                    <a style={{fontWeight: "bold"}} onClick={handleRegister}>here</a>
                </p>
            </Modal.Footer>
            <Register
                show={regShow}
                handleClose={handleRegClose}
            />
        </Modal>
    )
}