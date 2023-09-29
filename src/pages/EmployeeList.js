import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
    flexRender,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import {Table as BTable} from "react-bootstrap";

import { loadEmployees } from "../redux/employee";
import EMPLOYEEDATA from "../data/Employee.json";

const EmployeeList = () => {

    const employees = useSelector((state) => state.employee);
    
    const dispatch = useDispatch();

    if(employees.employeeList.length === 0){
        dispatch(loadEmployees({ employeeList: EMPLOYEEDATA }));
    }

    console.log("employees2",employees)
    
    const columns = [
        {
            header: "First Name",
            accessorKey: "first_name",
        },
        {
            header: "Last Name",
            accessorKey: "last_name",
        },
        {
            header: "Start Date",
            accessorKey: "startDate",
        },
        {
            header: "Department",
            accessorKey: "department",
        },
        {
            header: "Date of Birth",
            accessorKey: "birthDate",
        },
        {
            header: "Street",
            accessorKey: "street",
        },
        {
            header: "City",
            accessorKey: "city",
        },
        {
            header: "State",
            accessorKey: "state",
        },
        {
            header: "Zip Code",
            accessorKey: "zipCode",
        },
    ]
    const table = useReactTable({
        columns,
        data: employees.employeeList,
        getCoreRowModel : getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    
    return (employees.employeeList.length > 0 && <main>
        <div id="employee-div" className="container">
            <h1>Current Employees</h1>
            <div className="flex items-center gap-2">
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 25, 50, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <BTable striped bordered hover responsive size="sm">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header)=>(
                            <th key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                <tbody>
                    {
                        table.getRowModel().rows.map(row=>(
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell)=>(
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </BTable>
            <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                    <div>{'Showing page : '}
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </div>
                </span>
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
            </div>
            <NavLink to="/createemployee">
                <p>Home</p>
            </NavLink>
        </div>
    </main>)
	
}

export default EmployeeList