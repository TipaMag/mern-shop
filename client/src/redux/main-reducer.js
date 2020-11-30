

const initialState = {
    initialized: false
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                initialized: true,
            }
        default:
            return state
    }
}

export const mainActions = {
    initializedSuccess: () => ({
        type: 'INITIALIZED_SUCCESS'
    })
}

export const initializeApp = () => (dispatch) => {
    dispatch(mainActions.initializedSuccess())
}