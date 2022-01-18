import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../Auth';
import { getDatabase, ref, set, child, get, onValue } from "firebase/database";
import { db, auth } from '../../firebase';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth()
    const [role, setRole] = useState(false)


    return (
        <Route
            {...rest}
            render={props => {
                return (
                    <>
                    {
                    currentUser ? <Component {...props} /> : <Redirect to='login' />
                    }
                    </>
                     )
            }}
        >

        </Route >
    )
}

export default PrivateRoute
