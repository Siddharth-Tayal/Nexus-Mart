import React, { Fragment, useEffect, useState } from 'react'
import "./CreateProduct.css"
import { useSelector, useDispatch } from "react-redux"
import { AccountTree, AttachMoney, Description, Image, Spellcheck, Storage } from "@material-ui/icons"
import MetaData from "../../layout/MetaData"
import SideBar from "../SideBar/SideBar"
import { Button } from '@material-ui/core'
import { useAlert } from 'react-alert'
import { useNavigate, useParams } from 'react-router-dom'
import { clearErrors, getProductDetails, updateProduct } from '../../../actions/productAction'
import { ADMIN_PRODUCT_UPDATE_RESET } from '../../../constants/productConstants'

const UpdateProduct = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();

    const { loading, error: updateError, isUpdated } = useSelector(state => state.products)
    const { error, product } = useSelector(state => state.productDetails)

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState(0)
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = ["laptop", "Footwear", "Bottom", "top", "Attire", "Camera", "Smart Phones"];

    useEffect(() => {
        if (product && product._id !== params.id) {
            dispatch(getProductDetails(params.id))
        } else {
            setDescription(product.description);
            setName(product.name);
            setPrice(product.price);
            setStock(product.stock);
            setCategory(product.category);
            setOldImages(product.images);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Product Updated Successfully");
            navigate("/admin/products")
            dispatch({ type: ADMIN_PRODUCT_UPDATE_RESET })
        }
    }, [dispatch, alert, error, navigate, isUpdated, params.id, product, updateError])

    // images implementations
    const updateProductImageHandler = (e) => {
        const files = Array.from(e.target.files)
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
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
    const updateProductFormSubmitHandler = (e) => {

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
        dispatch(updateProduct(params.id, myForm))

    }
    return <Fragment>
        <MetaData title={"Create Product --Admin"} />
        <div className="dashboard">
            <SideBar />
            <div className="newProductContainer">
                <form encType='multipart/form-data' className="createProductForm" onSubmit={(e) => updateProductFormSubmitHandler(e)}>
                    <h1>Update Product</h1>
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
                        <input type='file' name='avatar' accept='image/*' onChange={updateProductImageHandler} multiple />
                    </div>
                    <div id="createProductFormImage">
                        {
                            oldImages && oldImages.map((image, index) => (
                                <img key={index} alt="Product Preview" src={image.url} />
                            ))
                        }
                    </div>
                    <div id="createProductFormImage">
                        {
                            imagesPreview.map((image, index) => (
                                <img key={index} alt="Product Preview" src={image} />
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

export default UpdateProduct