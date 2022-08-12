import {Container, Navbar as NavbarComp, NavDropdown} from "react-bootstrap"
import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import Icon from "../Asset/Icon.png"
import PictureUser from "../Asset/PictureUser.png"
import IconUser from "../Asset/IconUser.png"
import IconList from "../Asset/IconList.png"
import IconLogOut from "../Asset/IconLogOut.png"
import ChatComplain from "../Asset/ChatComplain.png"

export default function NavbarUSer(){
    const [state, dispatch] = useContext(UserContext)
    let navigate = useNavigate()

    const logout = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        navigate("/landing")
    }

    const goProfile = () => {
        navigate("/profile")
    }

    const goList = () => {
        navigate("/mylist")
    }

    const goHome = () => {
        navigate("/")
    }

    const goComplain = () => {
        navigate("/complain-user")
    }

    return(
        <NavbarComp expand="sm" className="navbar" bg="dark">
            <Container>
                <NavbarComp.Brand onClick={goHome}>
                    <img src={Icon} className="img-fluid"  />
                </NavbarComp.Brand>
                <NavbarComp.Toggle aria-controls="basic-navbar-nav" />
                <NavbarComp.Collapse id="basic-navbar-nav" >
                    <NavDropdown title={
                        <img src={PictureUser} alt="imgUser"  style={{width: "50px", height:"50px"}} />
                    } id="navbarScrollingDropdown" className="ms-auto dropdown-toggle pull-left" >
                    <NavDropdown.Item onClick={goProfile}>
                        <img src={IconUser} alt="imgUser" style={{width: "20px", height:"20px"}} /> Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={goList}>
                        <img src={IconList} alt="imgList" style={{width:"20px", height:"20px"}}/> My List Film
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={goComplain}>
                        <img src={ChatComplain} alt="imgList" style={{width:"20px", height:"20px"}}/> Complain
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>
                        <img src={IconLogOut} alt="IconLog" style={{width:"20px", height:"20px"}}  /> Log Out
                    </NavDropdown.Item>
                    </NavDropdown>
                </NavbarComp.Collapse>
            </Container>
        </NavbarComp>
    )
}