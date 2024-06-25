import React, { Fragment, useEffect, useState } from 'react'
import "./ResetPassword.css"
import Loader from '../layout/Loader/loader';
import { Lock, LockOpenOutlined } from "@material-ui/icons"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData.js"
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useSelector, useDispatch } from "react-redux"
import { RESET_PASSWORD_REQUEST } from '../../constants/userConstant';
import { useNavigate, useParams } from "react-router-dom"
const ResetPassword = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();


    const { error, success, loading } = useSelector(state => state.forgotPassword)

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const changePasswordHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(params.token, myForm));
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            console.log(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Changed Successfully");
            navigate('/login');
            dispatch({
                type: RESET_PASSWORD_REQUEST,
            })
        }
    }, [dispatch, error, alert, loading, success, params.token, navigate]);



    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title={`Reset Password`} />
                <div className="resetPasswordContainer">
                    <div className="resetPasswordBox">
                        <h2>Change Password</h2>
                        <form action="" onSubmit={changePasswordHandler} className="resetPasswordForm" encType='multipart/form-data' >


                            <div className="loginPassword">
                                <LockOpenOutlined />
                                <input type="password" placeholder='New Password' name='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className="loginPassword">
                                <Lock />
                                <input type="password" placeholder='Confirm New Password' name='password' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>

                            <input type="submit" value="Change Password " className='resetPasswordBtn' />
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default ResetPassword;