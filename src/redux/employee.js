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
		updateEmployees: (state, { payload }) => {
			state.employeeList = [...payload.employeeList]
		}
  },
})

export const { addEmployee, loadEmployees, updateEmployees } = employeeSlice.actions

export default employeeSlice.reducer