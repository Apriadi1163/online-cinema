import React, { useState, useEffect } from "react";
import NavbarUSer from "../Navbar/NavbarUser";
import {Container, Row, Col, Button } from "react-bootstrap"
// import List3 from "../Asset/List3.png"
// import PicVideo from "../Asset/PicVideo.png"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation } from "react-query"
import { API } from "../config/api"
import Thumbnail from "../Asset/play.png"

export default function DetailFilm(){
    const navigate = useNavigate();
    let { id } = useParams();

    const [film, setFilm] = useState([]);
    const getFilm = async () => {
        try{
            const response = await API.get("/film/" + id);
            setFilm(response.data.data);
            console.log(response.data.data);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        getFilm(id);
    }, []);

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-ZFKbpuATFTKqgdiE";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
        document.body.removeChild(scriptTag);
        };
    },[])

    const handleBuy = async () => {
        try {
            const data = {
              idFilm: film.id,
              idSeller: film.user.id,
              price: film.price,
            };
            const body = JSON.stringify(data);
      
            //configuration
            const config = {
              headers: {
                Authorization: "Basic " + localStorage.token,
                "Content-type": "application/json",
              },
            };
            // Insert transaction data
            const response = await API.post("/transaction", body, config);
            console.log("Response Transaction: ", response.data.payment.token);
      
            // Create variabel for store token payment from response
            const token = response.data.payment.token;
      
            // Modify handle buy to display Snap payment page
            // //? dokumentasi midtrans
            window.snap.pay(token, {
              onSuccess: function (result) {
                /* You may add your own implementation here */
                console.log(result);
                navigate("/profile");
              },
              onPending: function (result) {
                /* You may add your own implementation here */
                console.log(result);
                navigate("/profile");
              },
              onError: function (result) {
                /* You may add your own implementation here */
                console.log(result);
              },
              onClose: function () {
                /* You may add your own implementation here */
                alert("you closed the popup without finishing the payment");
              },
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleMylist = async (e) => {
        try{
            e.preventDefault();

            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            }

            const data = {
                idUser: film.user.id,
                idFilm: film.id,
            }

            const body = JSON.stringify(data);

            const response = await API.post("/mylist", body, config);
            console.log(response)

            // navigate("/mylist")
        }catch(error){
            console.log(error);
        }
    }
    // function gotoMix() {
    //     handleMylist()
    //     handleBuy()
    // }

    // const gotoMix = async () => {
    //     handleBuy();
    //     handleMylist();
    // }

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

    console.log(transaction);

    // let data = transaction.find(item => item.idFilm === 2)

    let transactionSuccess = transaction.find((item) => item.idFilm === film.id)

    return(
        <div>
            <NavbarUSer />
            <Container>
                <Col md="12">
                <Row style={{marginTop: "2em"}}>
                    
                    <Col md="3" >
                        <img src={film.image} alt="imgList" style={{width: "300px", height:"350px", marginTop: "2em"}}/>
                    </Col>
                    <Col md="8" style={{marginLeft:"2em"}} >
                        <div className="d-flex flex-row mb-4">
                            <h2>{film.title}</h2>
                            {transactionSuccess ? 
                                "" :
                                <Button variant="danger" style={{marginLeft:"25em"}} onClick={() => {handleBuy(); }}>Buy Now</Button>
                            }
                            
                            
                        </div>

                        {transactionSuccess ?
                            <iframe width="800" height="480" src={film.attache}>
                            </iframe> 
                            :

                            <div style={{backgroundImage: `url(${film.image})` }} className="thumbnailCover" onClick={handleBuy}>
                                
                                <img src={Thumbnail} width="120" style={{cursor:'pointer'}}  />

                            </div>
                        }


                        <div>
                            <p>
                            {film.desc}
                            </p>
                        </div>

                        <Button variant="danger" style={{marginLeft:"35em"}} onClick={handleMylist} >Add my Film</Button>
                        
                    </Col>
                </Row>
                </Col>
            </Container>
        </div>
    )
}