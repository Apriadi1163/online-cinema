import {Container, Navbar as NavbarComp, Button, NavDropdown} from "react-bootstrap"
import Login from "../Auth/Login"
import {Link, useNavigate} from "react-router-dom"
import Register from "../Auth/Register"
import React,{useState, useContext} from "react"
import { UserContext } from "../context/userContext"
import Icon from "../Asset/Icon.png"
import PictureUser from "../Asset/PictureUser.png"
import IconUser from "../Asset/IconUser.png"
import IconList from "../Asset/IconList.png"
import IconLogOut from "../Asset/IconLogOut.png"
import ChatComplain from "../Asset/ChatComplain.png"

export default function NavbarAdmin(){
    const [state, dispatch] = useContext(UserContext)
    let navigate = useNavigate()

    const logout = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        navigate("/landing")
    }

    const addFilm = () => {
        navigate("/add-film")
    }

    const goComplainAdmin = () => {
        navigate("/complain-admin")
    }

    const goList = () => {
        navigate("/list-transaction")
    }

    return(
        <NavbarComp expand="sm" className="navbar" bg="dark">
            <Container>
                <NavbarComp.Brand onClick={goList}>
                    <img src={Icon} className="img-fluid" />
                </NavbarComp.Brand>
                <NavbarComp.Toggle aria-controls="basic-navbar-nav" />
                <NavbarComp.Collapse id="basic-navbar-nav">
                    <NavDropdown title={
                        <img src={PictureUser} alt="imgUser"  style={{width: "50px", height:"50px", marginBottom: "0em"}} />
                    } id="navbarScrollingDropdown" className="ms-auto dropdown-toggle">
                    
                    <NavDropdown.Item onClick={addFilm}>
                        <img src={IconList} alt="imgList" style={{width:"20px", height:"20px"}}/> Add Film
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={goComplainAdmin} >
                        <img src={ChatComplain} alt="imgList" style={{width:"20px", height:"20px"}}/> Complain
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>
                        <img src={IconLogOut} alt="IconLog" style={{width:"20px", height:"20px"}}/> Log Out
                    </NavDropdown.Item>
                    </NavDropdown>
                </NavbarComp.Collapse>
            </Container>
        </NavbarComp>
    )
}