import React, { Fragment, useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid"
import { Button, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'
import { Delete, Edit } from '@material-ui/icons'
import Loader from '../../layout/Loader/loader'
import MetaData from '../../layout/MetaData'
import { allUsers, clearErrors, deleteUser } from '../../../actions/userAction'
const Users = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.userEdit)

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    }
    const columns = [
        {
            field: "id", headerName: " User Id", minWidth: 300, flex: 1
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 250, flex: 0.5,

        },

        {
            field: "email",
            headerName: "Email",
            minWidth: 350, flex: 1.5,
        },
        {
            field: "created",
            headerName: "Created At",
            type: "number",
            minWidth: 200, flex: 0.5
        },
        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor";
            },
        },
        {
            field: "action",
            headerName: "ACTION",
            minWidth: 150,
            type: "number",
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment className="actionFieldTable" >
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                            <Edit />
                        </Link>
                        <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}>
                            <Delete />
                        </Button>
                    </Fragment>
                )
            }
        }
    ];
    const rows = [];
    users && users.forEach((item, index) => {
        rows.push({
            id: item._id,
            name: item.name,
            created: item.createdAt,
            email: item.email,
            role: item.role
        })
    });
    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("User deleted Successfully");
            navigate("/admin/users")
        }
        dispatch(allUsers())

    }, [dispatch, alert, error, isDeleted, navigate]);

    return (
        <Fragment>
            <MetaData title={`All Orders --Admin`} />
            {
                loading ? (
                    <Loader />
                ) : (
                    <div className="myOrdersPage">
                        <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className='productListTable' autoHeight />
                        <Typography id="myOrdersHeading" >Admin's Orders</Typography>
                    </div>
                )
            }
        </Fragment>
    )
}

export default Users