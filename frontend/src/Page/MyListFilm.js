import React,{ useState, useEffect } from "react";
import NavbarUSer from "../Navbar/NavbarUser";
import {Container, Row, Col } from "react-bootstrap"
import { API } from "../config/api"
import { useNavigate, Link } from "react-router-dom"
import { useQuery } from "react-query"

export default function MyListFilm(){
    let navigate = useNavigate()

    const [list, setList] = useState([])

    const getLists = async () => {
        try{
            const response = await API.get("/mylist");
            setList(response.data.data)
            console.log(response.data.data)
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        getLists();
    }, [])
    return(
        <div>
            <NavbarUSer />
            <h2 style={{marginLeft:"2em", marginTop:"1.5em"}}>My List Film</h2>
            <Container>
            {list.length != 0 ? (
                <Row>
                {list.map((data, index) => (
                    <Col md="3" key={index}>
                        <Link to={`/detail-after/` + data.id}  >
                            <Col className="card-product" >
                                <img src={data.film.image} alt="item.name" style={{width: "120px", height: "150px", marginLeft: "3px" }} />
                            </Col>
                        </Link>
                    </Col>
                ))}
                </Row>
            ):(
                <div>No data</div>
            )}
            </Container>
        </div>
    )
}