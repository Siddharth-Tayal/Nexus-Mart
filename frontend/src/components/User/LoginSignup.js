import React, { Fragment, useEffect, useRef, useState } from 'react'
import "./loginSignup.css"
import Loader from '../layout/Loader/loader';
import { MailOutlined, LockOpenOutlined, Face } from "@material-ui/icons"
import { Link } from 'react-router-dom';
import { useAlert } from "react-alert"
import { useNavigate, useLocation } from 'react-router'
import { clearErrors, login, register } from '../../actions/userAction';
import { useSelector, useDispatch } from "react-redux"

const LoginSignup = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const location = useLocation();

    const { error, loading, isAuthenticated } = useSelector((state) => state.user)

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);



    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        avatar: "",
    });

    const { name, email, password } = user;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png")

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }
    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    }

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }
    const redirect = location.search ? location.search.split("=")[1] : "/account";
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(redirect);
        }
    }, [dispatch, error, alert, loading, isAuthenticated, navigate, location, redirect]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        } else {

            switcherTab.current.classList.remove("shiftToNeutral");
            switcherTab.current.classList.add("shiftToRight");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }
    return (
        <Fragment>
            {
                loading ? < Loader /> : (<Fragment>
                    <div className="loginSignupContainer">
                        <div className="loginSignupBox">
                            <div>
                                <div className="login_signup_toggle">
                                    <p onClick={(e) => switchTabs(e, "login")} >LOGIN</p>
                                    <p onClick={(e) => switchTabs(e, "register")} >REGISTER</p>
                                </div>
                                <button ref={switcherTab} ></button>
                            </div>
                            <form action="" ref={loginTab} onSubmit={loginSubmit} className="loginForm">
                                <div className="loginEmail">
                                    <MailOutlined />
                                    <input type="email" value={loginEmail} name='email' required placeholder='Email' onChange={(e) => setLoginEmail(e.target.value)} />
                                </div>
                                <div className="loginPassword">
                                    <LockOpenOutlined />
                                    <input type="password" placeholder='Password' name='password' required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                </div>
                                <Link to={"/password/forgot"}>Forget password ?</Link>
                                <input type="submit" value="Login" className='loginBtn' />
                            </form>
                            <form action="" ref={registerTab} onSubmit={registerSubmit} className="signUpForm" encType='multipart/form-data' >

                                <div className="signUpName">
                                    <Face />
                                    <input type="text" placeholder='Name' required name='name' value={name} onChange={registerDataChange} />
                                </div>
                                <div className="signUpEmail">
                                    <MailOutlined />
                                    <input type="email" value={email} name='email' required placeholder='Email' onChange={registerDataChange} />
                                </div>
                                <div className="signUpPassword">
                                    <LockOpenOutlined />
                                    <input type="password" placeholder='Password' name='password' required value={password} onChange={registerDataChange} />
                                </div>
                                <div className="registerImage" id='registerImage'>
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input type="file" name='avatar' accept='image/*' onChange={registerDataChange} />
                                </div>
                                <input type="submit" value="Register" className='signUpBtn' />
                            </form>
                        </div>
                    </div>
                </Fragment >)
            }
        </Fragment>)
}

export default LoginSignup;