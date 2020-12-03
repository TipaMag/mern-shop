import { authAPI } from "../api/auth-api"


const initialState = {
    isAuth: false,
    token: '',
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'SET_IS_AUTH':
            return {
                ...state,
                isAuth: true
            }
        default:
            return state
    }
}

export const authActions = {
    setToken: (token) => ({
        type: 'SET_TOKEN',
        token
    }),
    setIsAuth: () => ({
        type: 'SET_IS_AUTH',
    })
}

export const getRefreshToken = () => async (dispatch) => {
    const token = await authAPI.getRefreshToken()
    dispatch(authActions.setToken(token))
    dispatch(authActions.setIsAuth())
}
export const Logout = () => async (dispatch) => {
    await authAPI.logout()

    dispatch({type: 'RESET'})
    localStorage.removeItem('firstLogin')

    window.location.href = '/login'
}
