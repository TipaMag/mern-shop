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
import { Categories } from './categories/Categories';
import { CreateProduct } from './createProduct/CreateProduct';


export const Pages = () => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const isAdmin = useSelector(state => state.user.isAdmin)

    // console.log('pages rerender')

    return (
        <div style={{ padding: '20px 15px 0'}}>
            <Switch>
                <Route path="/" exact component={Products} />
                <Route path="/detail/:id" exact component={ProductDetail} />

                <Route path="/login" exact component={LoginPage} />
                <Route path="/register" exact component={RegistrationPage} />

                <Route path="/cart" exact component={Cart} />
                <Route path="/history" exact component={isAuth ? OrderHistory : NotFound} />
                <Route path="/history/:id" exact component={isAuth ? OrderDetails : NotFound} />

                <Route path="/categories" exact component={isAdmin ? Categories : NotFound} />

                <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
                <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

                <Route path='*' exact component={NotFound} />
            </Switch>
        </div>
    )
}