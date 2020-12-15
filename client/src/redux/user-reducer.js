import { userAPI } from "../api/user-api"
import { notify } from "../components/mainpages/utils/notify/Notify"

let initialState = {
    name: '',
    email: '',
    role: 0,
    cart: [],
    _id: '',
    isAdmin: false
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, quantity: 1 }]
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: [...action.payload]
            }
        case 'CHANGE_QUANTITY':
            return {
                ...state,
                cart: [...action.payload]
            }
        default:
            return state
    }
}

export const usersActions = {
    setUser: (name, email, role, cart, _id, isAdmin) => ({
        type: 'SET_USER_DATA',
        payload: { name, email, role, cart, _id, isAdmin }
    }),
    addToCart: (product) => ({
        type: 'ADD_TO_CART',
        payload: product
    }),
    remveFromCart: (filteredCart) => ({
        type: 'REMOVE_FROM_CART',
        payload: filteredCart
    }),
    changeQuantity: (cart) => ({
        type: 'CHANGE_QUANTITY',
        payload: cart
    })
}

export const getUserInfo = (token) => async (dispatch) => {
    const userData = await userAPI.getUserInfo(token)
    const { name, email, role, cart, _id } = userData
    if (role === 1) {
        dispatch(usersActions.setUser(name, email, role, cart, _id, true))
        return
    }
    dispatch(usersActions.setUser(name, email, role, cart, _id, false))
}

export const addingToCart = (product) => async (dispatch, getState) => {
    const isAuth = getState().auth.isAuth
    if(!isAuth) {
        return notify('Please login to continue buying', 'error')
    }

    const check = getState().user.cart.every(item => item._id !== product._id)
    if (check) {
        dispatch(usersActions.addToCart(product))

        const result = await userAPI.addToCart(getState().auth.token, getState().user.cart)

        notify(result.data.msg, result.status)
    } else {
        notify("this product is already in the cart", 'warning')
    }
}
export const removedFromCart = (product_id) => async (dispatch, getState) => {
    const filteredCart = getState().user.cart.filter(item => item.product_id !== product_id)

    const result = await userAPI.removeFromCart(getState().auth.token, filteredCart)
    if(result.status === 200) {
        dispatch(usersActions.remveFromCart(filteredCart))
        notify(result.data.msg, result.status)
    }
}

export const changeQuantity = (_id, value) => (dispatch, getState) => {
    const cart = getState().user.cart
    cart.forEach(cartItem => {
        if(cartItem._id === _id) {
            if(value === 'decrease' && cartItem.quantity > 1) {
                cartItem.quantity -= 1
            }
            if(value === 'increase' && cartItem.quantity < 99) {
                cartItem.quantity += 1
            }
        }
    })
    dispatch(usersActions.changeQuantity(cart))
}