import {configureStore} from '@reduxjs/toolkit'
import {userReducer} from '../userSlice'
import { productsReducer } from '../productSlice'

export const store = configureStore({
    reducer:{
        user:userReducer,
        product:productsReducer
    }
})
