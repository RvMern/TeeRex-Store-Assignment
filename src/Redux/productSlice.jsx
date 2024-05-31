import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: 'PROD',
    initialState: {
        allProducts: [],
        singleProduct: null,
        error: null
    },
    reducers: {
        getAllProducts: (state, action) => {
            return {
                ...state,
                allProducts: action.payload.allProducts
            }
        },
        getASingleProduct: (state, action) => {

        },
        getSearchProducts: (state, action) => {

        },
        getProductErrorAction: (state, action) => {
            return state.error = action.payload
        }
    }
})


export const { getAllProducts, getAllSearchedProducts, getASingleProduct, getSearchProducts, getProductErrorAction } = productSlice.actions

export const productsReducer = productSlice.reducer