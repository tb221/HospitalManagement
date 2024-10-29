import { createSlice } from '@reduxjs/toolkit'
export const tokenSlice = createSlice({
  name: 'token',
  initialState : {
    token : null,
 
  },
  reducers: {
    setToken: (state,action)=>{
        state.token = action.payload;
    },
   

  },
})

// Action creators are generated for each case reducer function
export const { setToken,  } = tokenSlice.actions;

export default tokenSlice.reducer;