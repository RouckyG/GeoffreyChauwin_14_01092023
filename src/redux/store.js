import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './employee'

const store = configureStore({
  reducer: {
    employee: employeeReducer
  },
})

export default store