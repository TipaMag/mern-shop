import { createStore, combineReducers, applyMiddleware, compose,} from "redux"
import thunk from 'redux-thunk'

import { mainReducer } from "./main-reducer"
import { productsReducer } from "./products-reducer"


const appReducer = combineReducers({
    app: mainReducer,
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