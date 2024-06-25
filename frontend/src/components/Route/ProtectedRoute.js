import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...routeProps }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    if (!loading && isAuthenticated === false) {
        return <Navigate to="/login" />;
    }

    if (loading === false && isAdmin === true && user.role !== "admin") {
        return <Navigate to="/login" />;
    }

    return (
        <Fragment>
            {loading === false ? (
                <Component {...routeProps} />
            ) : null}
        </Fragment>
    );
};

export default ProtectedRoute;





// import React, { Fragment } from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate, Outlet } from 'react-router-dom';
// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const { loading, isAuthenticated } = useSelector(state => state.user);
//     return (
//         <Fragment>
//             {
//                 !loading && (
//                     (isAuthenticated === false) ? <Outlet /> : <Navigate to="/login" />
//                 )
//             }

//         </Fragment>
//     )
// }

// export default ProtectedRoute

// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Route } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
//     const { loading, isAuthenticated, user } = useSelector((state) => state.user);

//     return (
//         <Fragment>
//             {loading === false && (
//                 <Route
//                     {...rest}
//                     render={(props) => {
//                         if (isAuthenticated === false) {
//                             return <Navigate to="/login" />;
//                         }

//                         if (isAdmin === true && user.role !== "admin") {
//                             return <Navigate to="/login" />;
//                         }

//                         return <Component {...props} />;
//                     }}
//                 />
//             )}
//         </Fragment>
//     );
// };

// export default ProtectedRoute;



