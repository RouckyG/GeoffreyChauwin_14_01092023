import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
    flexRender,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
} from '@tanstack/react-table'
import {Table as BTable} from "react-bootstrap";

import { loadEmployees, updateEmployees } from "../redux/employee";
import EMPLOYEEDATA from "../data/Employee.json";

const EmployeeList = () => {

    const employees = useSelector((state) => state.employee);
    const dispatch = useDispatch();

    if(employees.employeeList.length === 0){
        dispatch(loadEmployees({ employeeList: EMPLOYEEDATA }));
    }

    const [sorting, setSorting] = useState({
        sortedColumn: null,
        isSortedDesc: false,
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const handleColumnHeaderClick = (accessorKey) => {
        // If clicking on the same column, toggle sort order
        const isSortedDesc =
            sorting.sortedColumn === accessorKey ? !sorting.isSortedDesc : false;
      
        // Update the sorting state
        setSorting({
            sortedColumn: accessorKey,
            isSortedDesc,
        });
      
        sortData(accessorKey, isSortedDesc);
    };

    const sortData = (columnId, isSortedDesc) => {
        // Create a copy of the employeeList array to avoid mutating the original data
        const sortedData = [...employees.employeeList];
      
        // Define a sorting function based on the column and sort order
        const sortingFunction = (a, b) => {
            const valueA = a[columnId];
            const valueB = b[columnId];
      
          // Compare the values based on data type (Date)
        if (columnId === "startDate" || columnId === "birthDate") {
            // Parse dates and compare
            const dateA = new Date(valueA);
            const dateB = new Date(valueB);
      
            if (isSortedDesc) {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        }
          // Compare the values based on data type (string or number)

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return isSortedDesc ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
            return isSortedDesc ? valueB - valueA : valueA - valueB;
        }
      
            return 0; // Default: no sorting
        };
      
        // Sort the data using the sorting function
        sortedData.sort(sortingFunction);
      
        // Update the state with the sorted data
        dispatch(updateEmployees({ employeeList: sortedData }));
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filteredData = employees.employeeList.filter((employee) => {
          return columns.some((column) => {
            const cellValue = String(employee[column.accessorKey]).toLowerCase();
            return cellValue.includes(query);
          });
        });
        // Update the filtered data
        setFilteredData(filteredData);
      };
      
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
        data: filteredData ? filteredData : employees.employeeList,
        getCoreRowModel : getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })
    
    return (employees.employeeList.length > 0 && <main>
        <div id="employee-div" className="container">
            <h1>Current Employees</h1>
            <div>
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
                <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e)}
                />
            </div>
            <BTable striped bordered hover responsive size="sm">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                onClick={() => handleColumnHeaderClick(header.column.id)}
                                className={`cursor-pointer ${
                                sorting.sortedColumn === header.column.id
                                    ? sorting.isSortedDesc
                                    ? "desc"
                                    : "asc"
                                    : ""
                                }`}
                            >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {sorting.sortedColumn === header.column.id && (
                                    <span className="ml-1">
                                        {sorting.isSortedDesc ? "🔽" : "🔼"}
                                    </span>
                                )}
                            </th>
                            ))}
                        </tr>
                    ))}
                </thead>
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