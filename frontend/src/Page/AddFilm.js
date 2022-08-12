import React, { useState, useEffect } from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { API } from "../config/api"
import IconPic from "../Asset/Thumbnail.png"
import {Container, InputGroup, Form, Button} from "react-bootstrap"

export default function AddFilm(){
    let navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState([]);
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({
        image: "",
        title: "",
        price: "",
        desc: "",
        attache: "",
    });

    const getCategories = async () => {
        try{
            const response = await API.get("/category");
            setCategories(response.data.data);
        }catch(error){
            console.log(error);
        }
    };

    const handleChangeCategoryId = (e) => {
        const id = e.target.value;
        const checked = e.target.checked;

        if (checked){
            setCategoryId([...categoryId, parseInt(id)]);
        }else{
            let newCategoryId = categoryId.filter((categoryIdItem) => {
                return categoryIdItem != id;
            });
            setCategoryId(newCategoryId);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });

        if (e.target.type === "file"){
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url)
        }
    };

    const handleSubmit = useMutation (async (e) => {
        try{
            e.preventDefault();

            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            };

            const formData = new FormData();
            formData.set("image", form.image[0], form.image[0].name);
            formData.set("title", form.title);
            formData.set("price", form.price);
            formData.set("desc", form.desc);
            formData.set("attache", form.attache);
            formData.set("categoryId", categoryId);

            console.log(form);

            const response = await API.post("/film", formData, config);
            console.log(response);
            navigate("/list-transaction")
        }catch(error){
            console.log(error);
        }
    });
    useEffect(() => {
        getCategories();
    }, [])
    return(
        <div>
            <NavbarAdmin />
            <h2 style={{marginLeft:"4em", marginTop:"0.5em", marginBottom:"1em"}}>Add Film</h2>
            <Container>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <div>
                        {preview && (
                            <div>
                            <img
                                src={preview}
                                style={{
                                maxWidth: '150px',
                                maxHeight: '150px',
                                objectFit: 'cover',
                                }}
                                alt={preview}
                            />
                            </div>
                        )}
                        <input
                            type="file"
                            id="upload"
                            name="image"
                            onChange={handleChange}
                            style={{marginLeft: "1.5em", marginBottom: "2em"}}
                            hidden
                        />
                        <label for="upload" className="label-form mt-2 ms-0.5">
                            Photo Film <img src={IconPic} alt=""/>
                        </label>
                    </div>
                        <InputGroup className="mb-3 mt-2">
                            <Form.Control
                                placeholder="Title"
                                aria-label="Title"
                                name="title"
                                onChange={handleChange}
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    
                    
                    <div className="card-form-input mt-1 px-2 py-1 pb-2">
                        <div
                        className="text-secondary mb-1"
                        style={{ fontSize: '15px' }}
                        >
                        Category
                        </div>
                        {categories.map((item, index) => (
                        <label className="checkbox-inline me-4" key={index}>
                            <input
                            type="checkbox"
                            value={item.id}
                            onClick={handleChangeCategoryId}
                            />{' '}
                            {item.name}
                        </label>
                        ))}
                    </div>

                    <InputGroup className="mb-3">
        
                        <Form.Control
                        placeholder="Price"
                        aria-label="Price"
                        name="price"
                        onChange={handleChange}
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
        
                        <Form.Control
                        placeholder="Link Film"
                        aria-label="Link Film"
                        name="attache"
                        onChange={handleChange}
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <textarea
                        placeholder="Product Desc"
                        name="desc"
                        onChange={handleChange}
                        className="input-form mt-2 mb-2"
                        style={{height: "100px", width:"100%"}}
                    ></textarea>

                    <div className="button">
                        <Button type="submit" variant="danger">
                            Add Film
                        </Button>
                    </div>
                </Form>

            </Container>
        </div>
    )
}