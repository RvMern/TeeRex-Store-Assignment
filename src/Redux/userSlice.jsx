import {createSlice} from '@reduxjs/toolkit' 


const userSlice = createSlice({
    name:'AUTH',
    initialState: !window.localStorage.getItem('token') ? {
        loggedIn:false,
        user:null,
        cart:[],
        error:null
    } : {
        loggedIn:true,
        user: window.localStorage.getItem('token'),
        cart:window.localStorage.getItem('cart'),
        error:null
    },
    reducers:{
        singUpAction:(state,action)=>{
            
        },
        loginAction:(state,action)=>{
            window.localStorage.setItem('token',JSON.stringify(action.payload?.token))
            window.localStorage.setItem('cart',JSON.stringify(action.payload.findUser.cart))
            return {
                loggedIn:true,
                message:action.payload.message,
                user:JSON.stringify(action.payload.token),
                cart:JSON.stringify(action.payload.findUser.cart),
                error:null
            }
        },
        addToCartAction:(state,action)=>{
            const {cart} = action.payload?.updatedUser;
            window.localStorage.setItem('cart',JSON.stringify(cart));
            return {
                ...state,
                cart:JSON.stringify(cart),
                error:null
            }
        },
        removeFromCartAction:(state,action)=>{
            window.localStorage.setItem('cart',JSON.stringify(action.payload.findUser.cart))
            return {
                ...state,
                cart:JSON.stringify(action.payload.findUser.cart),
                error:null
            }    
        },
        cartItemQuantityAction:(state,action) => {
            window.localStorage.setItem('cart',JSON.stringify(action.payload.findUser.cart));
            return {
                ...state,
                cart:JSON.stringify(action.payload.findUser.cart),
                error:null
            }
        },
        logoutAction:(state,action)=>{
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('cart')
            return {
                ...state,
                loggedIn:false,
                user:null,
                cart:[]
            }
        },
        getUserErrorAction:(state,action) => {
            return {
                ...state,
                error:action.payload
            }
        }
    }
})

export const {singUpAction,loginAction,logoutAction,addToCartAction,removeFromCartAction,getUserErrorAction, cartItemQuantityAction} = userSlice.actions;

export const userReducer = userSlice.reducer;