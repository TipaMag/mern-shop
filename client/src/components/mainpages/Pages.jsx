import React from 'react';
import { Route, Switch } from "react-router-dom"

import { Login } from './auth/Login'
import { Registration } from './auth/Registration'
import { Cart } from './cart/Cart'
import { Products } from './products/Products'
import { ProductDetail } from './productDetail/ProductDetail'
import { NotFound } from './utils/not_found/NotFound'


export const Pages = () => {
    return (
        <div style={{ marginTop: '20px', padding: '0 20px'}}>
            <Switch>
                <Route path="/" exact component={Products} />
                <Route path="/detail/:id" exact component={ProductDetail} />

                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Registration} />
                <Route path="/cart" exact component={Cart} />


                <Route path='*' exact component={NotFound} />
            </Switch>
        </div>
    )
}