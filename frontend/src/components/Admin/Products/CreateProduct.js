import React, { Fragment, useEffect, useState } from 'react'
import "./CreateProduct.css"
import { useSelector, useDispatch } from "react-redux"
import { AccountTree, AttachMoney, Description, Image, Spellcheck, Storage } from "@material-ui/icons"
import MetaData from "../../layout/MetaData"
import SideBar from "../SideBar/SideBar"
import { Button } from '@material-ui/core'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { clearErrors, newProduct } from '../../../actions/productAction'
import { CREATE_PRODUCT_RESET } from '../../../constants/productConstants'
const CreateProduct = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector(state => state.newProduct)

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState(0)
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = ["laptop", "Footwear", "Bottom", "top", "Attire", "Camera", "Smart Phones"];

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Product Created Successfully");
            navigate("/admin/dashboard")
            dispatch({ type: CREATE_PRODUCT_RESET })
        }
    }, [dispatch, alert, error, navigate, success])

    // images implementations
    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files)
        setImages([]);
        setImagesPreview([]);
        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            }
            reader.readAsDataURL(file);
        })
    }

    //form submit handler
    const createFormSubmitHandler = (e) => {

        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);
        images.forEach((image) => {
            myForm.append("images", image)
        });
        dispatch(newProduct(myForm))

    }
    return <Fragment>
        <MetaData title={"Create Product --Admin"} />
        <div className="dashboard">
            <SideBar />
            <div className="newProductContainer">
                <form encType='multipart/form-data' className="createProductForm" onSubmit={(e) => createFormSubmitHandler(e)}>
                    <h1>Create Product</h1>
                    <div>
                        <Spellcheck />
                        <input type="text" placeholder='Product Name' required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <AttachMoney />
                        <input type="number" placeholder='Price ' required value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div>
                        <Description />
                        <textarea type="text" placeholder='Product description' required cols={"30"} rows={'1'} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <AccountTree />
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {
                                categories.map((cate) => (
                                    <option key={cate} value={cate}>{cate}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <Storage />
                        <input type="number" placeholder='Stock ' required value={stock} onChange={(e) => setStock(e.target.value)} />
                    </div>
                    <div id="createProductFormFile">

                        <Image />
                        <input type='file' name='avatar' accept='image/*' onChange={createProductImagesChange} multiple />
                    </div>
                    <div id="createProductFormImage">
                        {
                            imagesPreview.map((image, index) => (
                                <img key={index} alt="Avatar Preview" src={image} />
                            ))
                        }
                    </div>
                    <Button id='createProductBtn' type='submit' disabled={loading ? true : false} >
                        Create
                    </Button>
                </form>
            </div>
        </div>
    </Fragment>
}

export default CreateProduct