import React, {useState, useEffect} from "react";
import NavbarUSer from "../Navbar/NavbarUser";
import {Container, Row, Col, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { API } from "../config/api"

export default function DetailFilmAfter(){
    // const navigate = useNavigate();
    let { id } = useParams(); 

    const [list, setList] = useState([]);
    const getList = async () => {
        try{
            const response = await API.get("/mylist/" + id);
            setList(response.data.dataFilm);
            console.log(response.data.dataFilm);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        getList(id);
    }, []);
    return(
        <div>
             <NavbarUSer />
            <Container>
                <Row style={{marginTop: "2em"}}>
                    <Col md="3" style={{marginRight:"1.5em", marginTop:"3em"}}>
                        <img src={list.image} alt="imgList" style={{width: "300px", height:"350px"}}/>
                    </Col>
                    <Col md="8" >
                        <div className="d-flex flex-row mb-2">
                            <h2>{list.title}</h2>
                            {/* <Button variant="danger" style={{marginLeft:"28em"}} onClick={handleBuy}>Buy Now</Button> */}
                            
                        </div>
                        {/* <Button variant="danger" style={{marginLeft:"28em"}} onClick={handleMylist} >Add my Film</Button> */}
                        
                            
                            <iframe width="853" height="480" src={list.attache}>
                            </iframe>
                            
                        <div>
                            <p>
                            {list.desc}
                            </p>
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
}