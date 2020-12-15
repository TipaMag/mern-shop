import { authAPI } from "../api/auth-api"
import { notify } from "../components/mainpages/utils/notify/Notify"


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

export const login = (values) => async (dispatch) => {
    const result = await authAPI.login(values)
    if (result.status !== 200) {
        notify(result.data.msg, result.status)
    } else {
        localStorage.setItem('firstLogin', true)
        window.location.href = '/'
    }
}

export const registration = (values) => async (dispatch) => {
    const result = await authAPI.registration(values)
    if (result.status !== 200) {
        notify(result.data.msg, result.status)
    } else {
        localStorage.setItem('firstLogin', true)
        window.location.href = '/'
    }
}

export const logout = () => async (dispatch) => {
    await authAPI.logout()

    dispatch({ type: 'RESET' })
    localStorage.clear()

    window.location.href = '/login'
}

export const getRefreshToken = () => async (dispatch) => {
    const token = await authAPI.getRefreshToken()
    dispatch(authActions.setToken(token))
    dispatch(authActions.setIsAuth())
}
