import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { User } from '~/model/User.model'

// export interface CounterState {
//   value: number;
//   status: 'idle' | 'loading' | 'failed';
// }

interface authState {
  currentUser?: User
  logging: Boolean
  loggedIn: Boolean
}

const initialState: authState = {  
  currentUser: undefined,
  logging: false,
  loggedIn: false
};

export interface loginPayload {
  User_Account_Name: string
  User_Account_Password: string
}


export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    login: (state, action: PayloadAction<loginPayload>) => {
        state.logging = true
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload
        state.logging = false
        state.loggedIn = true
    },
    loginFail: (state, action: PayloadAction<loginPayload>) => {
        state.logging = false
    },
    logOut: (state) => {
      state.currentUser = undefined
      state.loggedIn = false
    }

  },
//   extraReducers: (builder) => {
//     builder
//       .addCase(incrementAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(incrementAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.value += action.payload;
//       })
//       .addCase(incrementAsync.rejected, (state) => {
//         state.status = 'failed';
//       });
//   },
});

export const { login, loginSuccess, loginFail, logOut } = authReducer.actions;

export const selectUser = (state: RootState) => state;

export default authReducer.reducer;