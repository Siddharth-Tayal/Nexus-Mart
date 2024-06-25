import React, { Fragment, useEffect, useState } from 'react'
import "./forgotPassword.css"
import Loader from '../layout/Loader/loader';
import { MailOutlined } from "@material-ui/icons"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData.js"

import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useSelector, useDispatch } from "react-redux";

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, message, loading } = useSelector(state => state.forgotPassword)
    const [email, setEmail] = useState("");
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            console.log(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
        }
    }, [dispatch, error, alert, message, loading]);



    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title={`Forgot Password `} />
                <div className="forgotPasswordContainer">
                    <div className="forgotPasswordBox">
                        <h2>Forgot Password</h2>
                        <form action="" onSubmit={forgotPasswordSubmit} className="forgotPasswordForm" encType='multipart/form-data' >
                            <div className="updateEmail">
                                <MailOutlined />
                                <input type="email" value={email} name='email' required placeholder='Email' onChange={e => setEmail(e.target.value)} />
                            </div>

                            <input type="submit" value="Send Link.
                            " className='forgotPasswordBtn' />
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default ForgotPassword;