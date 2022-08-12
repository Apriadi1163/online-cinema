import NavbarAuth from "../Navbar/NavbarAuth";
import LandingPicture from "../Asset/LandingPicture.png"
import {Container, Col, Row, Card, Carousel } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import { useState, useEffect} from "react"
import { API } from "../config/api"
// import ListFilm from "../FakeData/ListFilm"

export default function LandingPage(){
    const [film, setFilm] = useState([])

    const getFilms = async () => {
        try{
            const response = await API.get("/film");
            setFilm(response.data.data)
            console.log(response.data.data)
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        getFilms();
    }, [])
    return(
        <div>
            <NavbarAuth />
            <Container>
            <Carousel style={{marginTop:"2em"}}>
                {film?.map((item, index) => (
                <Carousel.Item key={index} 
                style={{width:"1081px", height:"437px"}} >
                    <Card.Img src={item.image} alt="Card image" className="img-fluid" />
                    <Card.ImgOverlay>
                        <div style={{ height:"50px", marginTop:"130px", marginLeft: "60px", color: "red"}}><h2>{item.title}</h2></div>
                        <div style={{marginLeft: "60px"}}>{item.price}</div>
                        <Card.Text style={{marginLeft:"60px"}}>
                        This is a wider card with supporting text below as a natural lead-in
                        to additional content. This content is a little bit longer.
                        </Card.Text>
                        {/* <Card.Text style={{marginLeft:"60px"}}>Last updated 3 mins ago</Card.Text> */}
                    </Card.ImgOverlay>
                </Carousel.Item>
                ))}
            </Carousel>
                
                
                    <Container> 
                    <h3 style={{marginTop: "1.5em"}}>List Film</h3>
                        <Row>
                            {film?.map((item, index) => (
                            <Col className="card-product" key={index} >
                            <img src={item.image} alt="item.name" style={{width: "120px", height: "150px", marginLeft: "3px" }} />
                            </Col>
                            ))}
                        </Row>
                        
                    </Container>
                
                
            </Container>
        </div>
    )
}