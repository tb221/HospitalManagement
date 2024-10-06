import { createSlice } from '@reduxjs/toolkit'
export const doctorSlice = createSlice({
  name: 'doctor',
  initialState : {
    doctors : null,
  },
  reducers: {
    setDoctors: (state,action)=>{
        state.doctors = action.payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const { setDoctors } = doctorSlice.actions;

export default doctorSlice.reducer;