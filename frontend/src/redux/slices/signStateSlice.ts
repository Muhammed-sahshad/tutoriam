import { SignState } from '@/types/signStateTypes'
import {createSlice} from '@reduxjs/toolkit'

const initialState:SignState = {
    signState : 'signIn'
}

const signStateSlice = createSlice({
    name:'signState',
    initialState,
    reducers:{
        toggleSignState : (state) => {
            state.signState = state.signState === 'signIn' ? 'signUp' : 'signIn'
        }
    }
})

export const {toggleSignState} = signStateSlice.actions
export default signStateSlice.reducer