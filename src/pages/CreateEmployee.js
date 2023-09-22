import React from "react";
import { NavLink } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";

const CreateEmployee = () => {
    
    return <main>
    <div className="title">
        <h1>HRnet</h1>
    </div>
    <div className="container">
        <NavLink to="/employeelist">
            <p>View Current Employees</p>
        </NavLink>
        <h2>Create Employee</h2>
        <EmployeeForm />
    </div>
</main>
	
}

export default CreateEmployee