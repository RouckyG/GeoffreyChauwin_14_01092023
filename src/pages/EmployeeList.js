import React from "react";
import { NavLink } from "react-router-dom";

const EmployeeList = () => {
    
    return <main>
        <div id="employee-div" className="container">
            <h1>Current Employees</h1>
            <table id="employee-table" className="display"></table>
            <NavLink to="/createemployee">
                <p>Home</p>
            </NavLink>
        </div>
    </main>
	
}

export default EmployeeList