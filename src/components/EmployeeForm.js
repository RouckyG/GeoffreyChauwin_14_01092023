import React, { useState }  from "react";
import {Form, Row, Col, Button} from "react-bootstrap";
import STATES from "../data/States.json";
import Modal from "./Modal/Modal";

const EmployeeForm = () => {

	// const dispatch = useDispatch();
	const actualDate = new Date();
	const actualYear = actualDate.getFullYear();

	// Hook states declaration & initialisation
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [street, setStreet] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [startDate, setStartDate] = useState("");
	const [department, setDepartment] = useState("");
	const [validated, setValidated] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [messageModal, setMessageModal] = useState("");

    const [displayModal, setDisplayModal] = useState(false);

	// The object values retrieved from the form
	const inputValue = {
		firstName,
		lastName,
		birthDate,
		street,
		city,
		state,
		zipCode,
		startDate,
		department,
	};

	// The object values resetted to clear the form
	const resetInputValues = () => {
		setFirstName("");
		setLastName("");
		setBirthDate("");
		setStreet("");
		setCity("");
		setState("");
		setZipCode("");
		setStartDate("");
		setDepartment("");
	}

    const checkForm = (data) => {
        const actualDate = new Date();
        const actualYear = actualDate.getFullYear();
        const yearBirthDate = data.birthdate.slice(0, 4);
        const yearStartDate = data.startdate.slice(0, 4);
        let message = "";
    
        !(actualYear - yearBirthDate > 14)
            ? (message = "Birth date must be at least 15 years behind")
            : !(yearStartDate - yearBirthDate > 14)
            ? (message = "Start date must be at least 15 years after birthDate")
            : (message = "Employee successfully created !");
    
        return message;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        
        if (form.checkValidity() === false) {
          e.stopPropagation();
        }
        else{
            resetInputValues();
            setDisplayModal(true);
            setValidated(true);
        }
    }    
	// const handleSubmit = (e) => {

    // 	setValidated(true);
	// 	inputResult = checkForm(inputValue);
	// 	if (inputResult === "Employee successfully created !") {
	// 		// dispatch(addEmployee(inputValue));
	// 		setValidated(false);
	// 	}
	// }

    return <>
        <Form
            className="formular"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
        >
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        pattern="^[( )a-zA-Z_-éèàêôâîûüù-]{2,50}$"
                    />
                    <Form.Control.Feedback type="invalid">
                        must be 2 to 50 chars, letters only
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        pattern="^[( )a-zA-Z_éèàêôâîûüù-]{2,50}$"
                    />
                    <Form.Control.Feedback type="invalid">
                        must be 2 to 50 chars, letters only
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Birth Date</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        placeholder="Birth Date"
                        onChange={(e) => setBirthDate(e.target.value)}
                        value={birthDate}
                        id="birthdatemin"
                        name="birthdatemin"
                        min={actualYear - 100 + "-01-01"}
                        max={actualYear - 15 + "-12-31"}
                    />
                    <Form.Control.Feedback type="invalid">
                        must be min 15 and max 100 years old
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Street"
                        onChange={(e) => setStreet(e.target.value)}
                        value={street}
                        pattern="^[( )0-9a-zA-Z_,éèàêôâîûüù-]{2,50}$"
                    />
                    <Form.Control.Feedback type="invalid">
                        must be 2 to 50 chars
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="City"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        pattern="^[( )0-9a-zA-Z_-éèàêôâîûüù-]{2,50}$"
                    />
                    <Form.Control.Feedback type="invalid">
                        must be 2 to 50 chars
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Col>
                    <Form.Label>State</Form.Label>
                    <Form.Select
                        data-testid={"select-state"}
                        onChange={(e) => setState(e.target.value)}
                        required
                        value={state}>
                        <option value="">Select State</option>
                        {STATES.map((element) => {
                            return (
                                <option key={element.abbreviation} value={element.name}>
                                    {element.name}
                                </option>
                            );
                        })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Select State
                    </Form.Control.Feedback>
                </Col>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Zip Code"
                        onChange={(e) => setZipCode(e.target.value)}
                        value={zipCode}
                        minLength={5}
                        maxLength={10}
                        pattern="^[0-9]{5,6}$"
                    />
                    <Form.Control.Feedback type="invalid">
                        must be a valid ZIP Code
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        placeholder="Start Date"
                        onChange={(e) => setStartDate(e.target.value)}
                        value={startDate}
                        id="startdatemin"
                        name="startdatemin"
                        min={birthDate}
                        // max={actualYear + "-12-31"}
                    />
                    <Form.Control.Feedback type="invalid">
                        must be after the birthdate
                    </Form.Control.Feedback>
                </Form.Group>
                <Col>
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                        data-testid={"select-department"}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                        value={department}>
                        <option value="">Select Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Legal">Legal</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Select Department
                    </Form.Control.Feedback>
                </Col>
            </Row>
            <Button type="submit" className="btn btn-success">
                Submit
            </Button>
        </Form>
        <Modal display={displayModal} onClose={()=>{setDisplayModal(false)}}>
            Employee successfully created !
        </Modal>
    </>
}

export default EmployeeForm