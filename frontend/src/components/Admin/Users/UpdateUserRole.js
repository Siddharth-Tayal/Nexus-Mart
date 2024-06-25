import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { clearErrors, getUserDetails, updateUser } from '../../../actions/userAction';
import Loader from '../../layout/Loader/loader';
import MetaData from "../../layout/MetaData"
import SideBar from "../SideBar/SideBar"
import "./UpdateRole.css"
import { VerifiedUser } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { USER_UPDATE_RESET } from '../../../constants/userConstant';

const UpdateUserRole = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const alert = useAlert();

    const [role, setRole] = useState("");

    const { user, loading, error } = useSelector((state) => state.userDetails);

    const { error: updateError, isUpdated } = useSelector((state) => state.userEdit)

    const processRole = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("role", role);
        dispatch(updateUser(params.id, myForm))
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        } if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {

            alert.success("User role Updated Successfully");
            dispatch({
                type: USER_UPDATE_RESET
            });
            navigate("/admin/users")
        }
        dispatch(getUserDetails(params.id))
    }, [dispatch, params.id, alert, error, updateError, isUpdated, navigate]);
    return <Fragment>

        <div className="dashboard">
            <SideBar />
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={`${user.name} --Details`} />
                    <div className="confirmOrderPage">
                        <div>
                            <div className='userContainer'>
                                <div  >
                                    <h1>User Details</h1>
                                    <img src={
                                        user && user.avatar && user.avatar.url
                                    } alt={user && user.name} />
                                </div>
                                <div>
                                    <div>
                                        <h4>Id : </h4>
                                        <p>{user && user._id}</p>
                                    </div>
                                    <div>
                                        <h4>Full Name : </h4>
                                        <p>{user && user.name}</p>
                                    </div>
                                    <div>
                                        <h4>E-mail : </h4>
                                        <p>{user && user.email}</p>
                                    </div>
                                    <div>
                                        <h4>Joined On : </h4>
                                        <p>{String(user.createdAt).substr(0, 10)}</p>
                                    </div>
                                    <div>
                                        <h4>Role : </h4>
                                        <p style={{
                                            color: user.role === 'admin' ? 'green' : 'red'
                                        }} >{user.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form encType='multipart/form-data' className="updateOrderForm" onSubmit={processRole}>
                            <h1>Change Role</h1>

                            <div>
                                <VerifiedUser />
                                <select onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Change Role</option>
                                    {
                                        user.role === 'user' &&
                                        <option value="admin">Admin</option>
                                    }
                                    {

                                        user.role === 'admin' &&
                                        <option value="user">User</option>
                                    }
                                </select>
                            </div>
                            <Button id='createProductBtn' type='submit' disabled={loading ? true : false || role === "" ? true : false} >
                                Change
                            </Button>
                        </form>
                    </div>
                </Fragment>)}
        </div>
    </Fragment>
}

export default UpdateUserRole