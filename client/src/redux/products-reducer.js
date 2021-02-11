import { imageUploadAPI, productsAPI } from "../api/products-api"
import { notify } from "../components/mainpages/utils/notify/Notify"

let initialState = {
    products: []
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: [...action.products]
            }
        default:
            return state
    }
}

export const productsActions = {
    setProducts: (products) => ({
        type: 'SET_PRODUCTS',
        products
    })
}

export const getProducts = () => async (dispatch) => {
    const data = await productsAPI.getProducts()
    dispatch(productsActions.setProducts(data.products))
}

export const createProducts = (newProduct) => async (dispatch, getState) => {
    const token = getState().auth.token
    const result = await productsAPI.createProduct(token, newProduct)

    if(result.status === 201) {
        notify(result.data.msg, result.status)
        return Promise.resolve(true) //fix
    }
    notify(result.data.msg, result.status)
}

export const updateProducts = (id, newProduct) => async (dispatch, getState) => {
    const token = getState().auth.token
    const result = await productsAPI.updateProduct(token, id, newProduct)
    notify(result.data.msg, result.status)
}

export const deleteProducts = (id, imagePublicID) => async (dispatch, getState) => {
    const token = getState().auth.token

    imageUploadAPI.deleteImage(token, imagePublicID )

    const res = await productsAPI.deleteProduct(token, id)
    notify(res.data.msg, res.status)
    
    dispatch(getProducts())
}