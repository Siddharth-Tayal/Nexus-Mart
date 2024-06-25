import React, { Fragment, useEffect, useState } from 'react'
import "./UpdatePassword.css"
import Loader from '../layout/Loader/loader';
import { Lock, LockOpenOutlined, VpnKey } from "@material-ui/icons"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData.js"
import { useNavigate } from 'react-router'
import { clearErrors, updatePassword } from '../../actions/userAction';
import { useSelector, useDispatch } from "react-redux"
import { CHANGE_PASSWORD_RESET } from '../../constants/userConstant';

const UpdatePassword = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user)
    const { error, isUpdated, loading } = useSelector(state => state.profile)

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")


    const changePasswordHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            console.log(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Password Changed Successfully");
            navigate("/account");
            dispatch({
                type: CHANGE_PASSWORD_RESET,
            })
        }
    }, [dispatch, error, alert, loading, isUpdated, navigate]);



    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title={`${user.name}'s Update Password`} />
                <div className="updatePasswordContainer">
                    <div className="updatePasswordBox">
                        <h2>Change Password</h2>
                        <form action="" onSubmit={changePasswordHandler} className="updatePasswordForm" encType='multipart/form-data' >

                            <div className="loginPassword">
                                <VpnKey />
                                <input type="password" placeholder='Password' name='password' required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            </div>

                            <div className="loginPassword">
                                <LockOpenOutlined />
                                <input type="password" placeholder='New Password' name='password' required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>

                            <div className="loginPassword">
                                <Lock />
                                <input type="password" placeholder='Confirm New Password' name='password' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>

                            <input type="submit" value="Change Password " className='updatePasswordBtn' />
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default UpdatePassword;