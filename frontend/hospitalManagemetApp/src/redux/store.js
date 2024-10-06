import { configureStore } from '@reduxjs/toolkit'
import doctorReducer from './doctorSlice.js'
import patientReducer from "./patientSlice.js"
export const store = configureStore({
  reducer: {
    app : doctorReducer,
    appPatient : patientReducer,
  },
})