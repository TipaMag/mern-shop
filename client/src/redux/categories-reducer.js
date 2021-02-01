import { categoriesAPI } from '../api/categories-api'
import { notify } from '../components/mainpages/utils/notify/Notify'

let initialState = {
    categories: []
}

export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state
    }
}

export const categoriesActions = {
    setCategories: (categories) => ({
        type: 'SET_CATEGORIES',
        payload: categories
    })
}

export const getCategories = () => async (dispatch) => {
    const categories = await categoriesAPI.getCategories()
    dispatch(categoriesActions.setCategories(categories))
}

export const addCategory = (name) => async (dispatch, getState) => {
    const token = getState().auth.token
    const result = await categoriesAPI.createCategory(token, name)

    notify(result.data.msg, result.status)
    dispatch(getCategories())
}

export const removeCategory = (id) => async (dispatch, getState) => {
    const token = getState().auth.token

    const result = await categoriesAPI.deleteCategory(token, id)
    notify(result.data.msg, result.status)
    dispatch(getCategories())
}

export const updateCategory = (id, name) => async (dispatch, getState) => {
    const token = getState().auth.token

    const result = await categoriesAPI.editCategory(token, id, name)
    notify(result.data.msg, result.status)
    dispatch(getCategories())
}