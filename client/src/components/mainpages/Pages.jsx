import React from 'react';
import { Route, Switch } from "react-router-dom"

import { LoginPage } from './auth/Login'
import { RegistrationPage } from './auth/Registration'
import { Cart } from './cart/Cart'
import { Products } from './products/Products'
import { ProductDetail } from './productDetail/ProductDetail'
import { NotFound } from './utils/not_found/NotFound'
import { useSelector } from 'react-redux';
import { OrderHistory } from './history/OrderHistory';
import { OrderDetails } from './history/OrderDetails';


export const Pages = () => {
    const isAuth = useSelector(state => state.auth.isAuth)

    return (
        <div style={{ marginTop: '20px', padding: '0 20px'}}>
            <Switch>
                <Route path="/" exact component={Products} />
                <Route path="/detail/:id" exact component={ProductDetail} />

                <Route path="/login" exact component={isAuth ? NotFound : LoginPage} />
                <Route path="/register" exact component={isAuth ? NotFound : RegistrationPage} />

                <Route path="/cart" exact component={Cart} />
                <Route path="/history" exact component={isAuth ? OrderHistory : NotFound} />
                <Route path="/history/:id" exact component={isAuth ? OrderDetails : NotFound} />

                <Route path='*' exact component={NotFound} />
            </Switch>
        </div>
    )
}