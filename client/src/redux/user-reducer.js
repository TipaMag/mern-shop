import { userAPI } from "../api/user-api"

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
        default:
            return state
    }
}

 export const usersActions = {
    setUser: (name, email, role, cart, _id, isAdmin) => ({
        type: 'SET_USER_DATA',
        payload: {name, email, role, cart, _id, isAdmin}
    })
}

export const getUserInfo = (token) => async (dispatch) => {
    const userData = await userAPI.getUserInfo(token)
    const {name, email, role, cart, _id} = userData
    if(role === 1) {
        dispatch(usersActions.setUser( name, email, role, cart, _id, true))
        return
    }
    dispatch(usersActions.setUser( name, email, role, cart, _id, false))
}