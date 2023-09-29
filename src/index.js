import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import './index.css';
import CreateEmployee from './pages/CreateEmployee';
import EmployeeList from './pages/EmployeeList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                    <Routes>
                        <Route exact path="/" element={<CreateEmployee />}/>
                        <Route exact path="/createemployee" element={<CreateEmployee />}/>
                        <Route exact path="/employeelist" element={<EmployeeList />}/>
                    </Routes>
            </Router>
        </Provider>
    </React.StrictMode>
);

