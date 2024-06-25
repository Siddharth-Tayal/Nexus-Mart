import React from 'react'
import "./SideBar.css"
import logo from "../../../images/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { Add, Dashboard, ExpandMore, ImportExport, ListAlt, People, PostAdd, RateReview } from "@material-ui/icons"
import { TreeView, TreeItem } from "@material-ui/lab"
const SideBar = () => {
    const navigate = useNavigate();

    const handleAllProductsClick = () => {
        navigate('/admin/products');
    };

    const handleCreateProductClick = () => {
        navigate('/admin/product');
    };

    return (
        <div className="sidebar">
            <Link to={'/'} >
                <img src={logo} alt="" />
            </Link>
            <Link to={"/admin/dashboard"}>
                <p>
                    <Dashboard /> DashBoard
                </p>
            </Link>
            <div className="treeDiv">
                <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ImportExport />}  >
                    <TreeItem nodeId='1' label='Products' className='treeHeadLink'>
                        <TreeItem nodeId='2' className='treeLink' label='All' icon={<PostAdd />} onClick={handleAllProductsClick} />
                        <TreeItem nodeId='3' className='treeLink' label='Create' icon={<Add />} onClick={handleCreateProductClick} />
                    </TreeItem>
                </TreeView>
            </div>
            {/* <Link href="#x">
                <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ImportExport />}  >

                    <TreeItem nodeId='1' label='Products'>
                        <Link to={'/admin/products'} >
                            <TreeItem nodeId='2' label='All' icon={<PostAdd />} />
                        </Link>
                        <Link to={'/admin/product'} >
                            <TreeItem nodeId='3' label='Create' icon={<Add />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link> */}

            <Link to={"/admin/orders"}>
                <p>
                    <ListAlt /> Orders
                </p>
            </Link>

            <Link to={"/admin/users"}>
                <p>
                    <People /> Users
                </p>
            </Link>

            <Link to={"/admin/reviews"}>
                <p>
                    <RateReview /> Reviews
                </p>
            </Link>
        </div>
    )
}

export default SideBar