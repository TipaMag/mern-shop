import { productsAPI } from "../api/products-api"

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