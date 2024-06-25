import React, { useEffect } from 'react'
import "./DashBoard.css"
import SideBar from '../SideBar/SideBar'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import MetaData from "../../layout/MetaData.js"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip, ArcElement,
    Legend,
} from 'chart.js';
import { Doughnut, Line } from "react-chartjs-2"
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getAdminProducts } from '../../../actions/productAction'
import { useAlert } from 'react-alert'
import { allOrders } from '../../../actions/orderActions'
import { allUsers } from '../../../actions/userAction'


const DashBoard = () => {

    const { error, products } = useSelector(state => state.products);
    const { error: allOrdersError, orders } = useSelector(state => state.allOrders);
    const { error: allUserErrors, users } = useSelector(state => state.allUsers);

    const dispatch = useDispatch();
    const alert = useAlert();
    let outOfStock = 0;
    let Instock = 0;
    products && products.forEach(item => {
        if (item.stock === 0) {
            outOfStock++;;
        }
        else {
            Instock++;
        }
    });

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (allOrdersError) {
            alert.error(allOrdersError);
            dispatch(clearErrors());
        } if (allUserErrors) {
            alert.error(allUserErrors);
            dispatch(clearErrors());
        }
        dispatch(getAdminProducts());
        dispatch(allOrders());
        dispatch(allUsers());
    }, [error, alert, dispatch, allOrdersError, allUserErrors])

    ChartJS.register(CategoryScale, ArcElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const linestate = {
        labels: ["Initital Amounts", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197,72,49"],
                data: [0, 4000],
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, Instock],
            }
        ]
    }
    return (
        <div className="dashboard">
            <MetaData title={"Dashboard"} />
            <SideBar />
            <div className="dashboardContainer">
                <Typography component={'h1'} >DashBoard</Typography>
                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> $2000
                        </p>
                    </div>
                    <div className="dashboardSummary2">
                        <Link to={'/admin/products'}>
                            <p>Products</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to={'/admin/orders'}>
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to={'/admin/users'}>
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>

                <div className="lineChart">
                    <Line data={linestate} />
                </div>
                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>


            </div>
        </div>
    )
}

export default DashBoard