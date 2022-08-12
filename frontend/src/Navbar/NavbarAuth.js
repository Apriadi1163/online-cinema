import {Container, Navbar as NavbarComp, Button} from "react-bootstrap"
import Login from "../Auth/Login"
import {Link, useNavigate} from "react-router-dom"
import Register from "../Auth/Register"
import React,{useState} from "react"
import Icon from "../Asset/Icon.png"

export default function NavbarAuth(){

    const [logShow, setLogShow] = useState(false);
    const [regShow, setRegShow] = useState(false);
    const handleLogClose = () => setLogShow(false);
    const handleRegClose = () => setRegShow(false);
    const handleLogShow = () => setLogShow(true);
    const handleRegShow = () => setRegShow(true);

    const handleLogin = () => {
        handleLogShow();
    };

    const handleRegister = () => {
        handleRegShow();
    };

    return(
        <NavbarComp expand="sm" className="navbar" bg="dark">
            <Container>
                <NavbarComp.Brand >
                    <img src={Icon} className="img-fluid" />
                </NavbarComp.Brand>
                <NavbarComp.Toggle aria-controls="basic-navbar-nav" />
                <NavbarComp.Collapse id="basic-navbar-nav">
                    <div className='ms-auto'>
                        <Button 
                            className= 'px-4 mx-2' 
                            variant="dark"
                            onClick={handleLogin}
                            style={{color:"white"}}
                        >
                            Login
                        </Button>
                        <Button 
                            className= 'px-4 mx-2' 
                            variant="danger"
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </div>
                </NavbarComp.Collapse>
            </Container>
            <Login
                show={logShow}
                handleClose={handleLogClose}
            />
            <Register
                show={regShow}
                handleClose={handleRegClose}
            />
        </NavbarComp>
    )
}