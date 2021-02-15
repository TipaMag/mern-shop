import { imageUploadAPI, productsAPI } from "../api/products-api"
import { notify } from "../components/mainpages/utils/notify/Notify"

let initialState = {
    products: {},
    filters: {
        page: 1,
        limit: 9,
        category: 'all',
        sort: '-createdAt',
        search: ''
    }
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.products
            }
        case 'SET_MORE_PRODUCTS':
            return {
                ...state,
                products: {
                    ...state.products, 
                    result: action.products.result,
                    products: [
                        ...state.products.products,
                        ...action.products.products
                    ]
                }
            }
        case 'SET_CHECK':
            return {
                ...state,
                products: {
                    ...state.products,
                    products: [...state.products.products.map(product => {
                        if(product._id === action.id) product.checked = !product.checked
                        return product
                    })]
                }
            }
        case 'SET_CHECK_ALL':
            return {
                ...state,
                products: {
                    ...state.products,
                    products: [...state.products.products.map(product => {
                        if(action.isChecked) product.checked = true
                        else product.checked = false
                        return product
                    })]
                }
            }
        case 'SET_PAGE':
            return {
                ...state,
                filters: {...state.filters, page: action.page}
            }
        case 'SET_FILTER_CATEGORY':
            return {
                ...state,
                filters: {...state.filters, category: action.category}
            }
        case 'SET_FILTER_SORT':
            return {
                ...state,
                filters: {...state.filters, sort: action.sort}
            }
        case 'SET_FILTER_SEARCH':
            return {
                ...state,
                filters: {...state.filters, search: action.value}
            }
        default:
            return state
    }
}

export const productsActions = {
    setProducts: (products) => ({
        type: 'SET_PRODUCTS',
        products
    }),
    setMoreProducts: (products) => ({
        type: 'SET_MORE_PRODUCTS',
        products
    }),
    setCheck: (id) => ({
        type: 'SET_CHECK',
        id
    }),
    setCheckAll: (isChecked) => ({
        type: 'SET_CHECK_ALL',
        isChecked
    }),
    setPage: (page) => ({
        type: 'SET_PAGE',
        page
    }),
    setFilterCategory: (category) => ({
        type: 'SET_FILTER_CATEGORY',
        category
    }),
    setFilterSort: (sort) => ({
        type: 'SET_FILTER_SORT',
        sort
    }),
    setFilterSearch: (value) => ({
        type: 'SET_FILTER_SEARCH',
        value
    }),
}

export const getProducts = () => async (dispatch, getState) => {
    const filters = getState().products.filters
    const data = await productsAPI.getProducts(filters)
    dispatch(productsActions.setPage(1))
    dispatch(productsActions.setProducts(data))
}
export const getMoreProducts = () => async (dispatch, getState) => {
    const filters = getState().products.filters
    const page = getState().products.filters.page
    dispatch(productsActions.setPage(page + 1))

    let moreFlag = true
    const data = await productsAPI.getProducts(filters, moreFlag)
    dispatch(productsActions.setMoreProducts(data))
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
export const deleteProduct = (id, imagePublicID) => async (dispatch, getState) => {
    const token = getState().auth.token
    imageUploadAPI.deleteImage( token, [imagePublicID] )
    const res = await productsAPI.deleteProducts(token, id)
    notify(res.data.msg, res.status)
    dispatch(getProducts())
}
export const deleteSomeProducts = () => async (dispatch, getState) => {
    const token = getState().auth.token
    let imagePublicID = []
    let id = []

    getState().products.products.products.forEach(product => {
        if(product.checked) {
            imagePublicID.push(product.images.public_id)
            id.push(product._id)
        }
    })

    imageUploadAPI.deleteImage(token, imagePublicID )
    const res = await productsAPI.deleteProducts(token, id)
    notify(res.data.msg, res.status)

    dispatch(getProducts())
}