import {configureStore} from '@reduxjs/toolkit'
import signStateReducer from './slices/signStateSlice'
import authReducer from './slices/authSlice'

const store = configureStore({
    reducer:{
        signState: signStateReducer,
        auth:authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store