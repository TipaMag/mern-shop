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

export const registration = (values) => async (dispatch) => {
    const result = await authAPI.registration(values)
    notify(result.data.msg, result.status)
}

export const login = (values) => async (dispatch) => {
    const result = await authAPI.login(values)
    const token = result.data.accesstoken
    if (result.status !== 200) {
        notify(result.data.msg, result.status)
    } else {
        localStorage.setItem('accessToken', token)
        dispatch(authActions.setToken(token))
        dispatch(authActions.setIsAuth())
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
    localStorage.setItem('accessToken', token)
    dispatch(authActions.setToken(token))
}
