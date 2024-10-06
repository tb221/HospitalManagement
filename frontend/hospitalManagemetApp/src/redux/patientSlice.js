import { createSlice } from '@reduxjs/toolkit'
export const patientSlice = createSlice({
  name: 'patient',
  initialState : {
    patient : null,
 
  },
  reducers: {
    setPatient: (state,action)=>{
        state.patient = action.payload;
    },
   

  },
})

// Action creators are generated for each case reducer function
export const { setPatient,  } = patientSlice.actions;

export default patientSlice.reducer;