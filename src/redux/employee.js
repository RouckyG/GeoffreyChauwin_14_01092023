import { createSlice } from "@reduxjs/toolkit"

const employeeSlice = createSlice({
  name: "employee",
  initialState: { employeeList: [] },
  reducers: {
		addEmployee: (state, { payload }) => {
			state.employeeList.push(payload);
		},
		loadEmployees: (state, { payload }) => {
			state.employeeList = [];
			payload.employeeList.map((elt) => state.employeeList.push(elt));
		},
  },
})

export const { addEmployee, loadEmployees } = employeeSlice.actions

export default employeeSlice.reducer