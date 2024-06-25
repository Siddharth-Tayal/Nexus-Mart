import React, { Fragment, useEffect, useState } from 'react'
import "./UpdateProfile.css"
import Loader from '../layout/Loader/loader';
import { MailOutlined, Face } from "@material-ui/icons"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData.js"
import { useNavigate } from 'react-router'

import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { useSelector, useDispatch } from "react-redux"
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';

const UpdateProfile = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user)
    const { error, isUpdated, loading } = useSelector(state => state.profile)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png")


    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }


    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            alert.error(error);
            console.log(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate("/account");
            dispatch({
                type: UPDATE_PROFILE_RESET,
            })
        }
    }, [dispatch, error, alert, loading, isUpdated, navigate, user]);



    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title={`${user.name}'s update Profile`} />
                <div className="updateProfileContainer">
                    <div className="updateProfileBox">
                        <h2>Update Profile</h2>
                        <form action="" onSubmit={updateProfileSubmit} className="updateProfileForm" encType='multipart/form-data' >

                            <div className="updateName">
                                <Face />
                                <input type="text" placeholder='Name' required name='name' value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="updateEmail">
                                <MailOutlined />
                                <input type="email" value={email} name='email' required placeholder='Email' onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="updateProfileImage" id='updateProfileImage'>
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input type="file" name='avatar' accept='image/*' onChange={updateProfileDataChange} />
                            </div>
                            <input type="submit" value="Update Profile" className='updateProfileBtn' />
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default UpdateProfile;