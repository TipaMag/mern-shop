import { createStore, combineReducers, applyMiddleware, compose,} from "redux"
import thunk from 'redux-thunk'
import { authReducer } from "./auth-reducer"

import { mainReducer } from "./main-reducer"
import { productsReducer } from "./products-reducer"
import { usersReducer } from "./user-reducer"


const appReducer = combineReducers({
    app: mainReducer,
    auth: authReducer,
    user: usersReducer,
    products: productsReducer,
 })

 const rootReducer = (state, action) => {
    if(action.type === 'RESET') {
       state = undefined
    }
    return appReducer(state, action)
 }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))