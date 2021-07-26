import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Header from "./Header";

import api from "../api/api";

const Home = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    dateofBirth: "",
    salary: "",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateofBirth, setDateofBirth] = useState("");
  const [salary, setSalary] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [randomId, setRandomId] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const onchangeHandler = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const fetchData = async () => {
    await api
      .get("/employee")
      .then((res) => {
        console.log(res, "fetch data...");
        let fetchEmployeeData = res.data;
        setData(fetchEmployeeData);
      })
      .catch((err) => {
        console.log(err, "error....");
      });
  };

  const generateSerial = () => {
    "use strict";

    var chars =
        "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      serialLength = 10,
      randomSerial = "",
      i,
      randomNumber;

    for (i = 0; i < serialLength; i++) {
      randomNumber = Math.floor(Math.random() * chars.length);

      randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }
    setRandomId(randomSerial);
  };

  const addEmployeeDetails = async () => {
    var i = Math.max(1, 1000);
    let employeeDetails = {
      id:randomId,
      firstname: firstName,
      lastname: lastName,
      dob: dateofBirth,
      salary: salary,
    };
    await api
      .post("/employee/", employeeDetails)
      .then((res) => {
        console.log(res, "res.....");
        fetchData();
      })
      .catch((err) => {
        console.log(err, "error....");
      });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addEmployeeDetails();

    onClear();
  };

  const deleteEmployee = async (id) => {
    alert(id);
    let removeData = data.filter((item) => item.id !== id);
    setData(removeData);
    await api
      .delete(`/employee/${id}`)
      .then((res) => {
        console.log(res, "delete response...");
        if (res) {
          fetchData();
        }
      })
      .catch((err) => {
        console.log(err, "error...");
      });
  };

  const editEmployee = async (edititem) => {
    alert(edititem.id);
    // let removeData = data.filter((item) => item.id !== edititem.id);
    // setData(removeData);
    setEdit(true)
    updateEmployee(edititem.id)
    setFirstName(edititem.firstname);
    setLastName(edititem.lastname);
    setSalary(edititem.salary);
    setDateofBirth(edititem.dob);
  };

  const updateEmployee = async (itemId) => {

    console.log(firstName,lastName,"Updated...")
    // setFirstName(firstName);
    // setLastName(lastName);
    // setSalary(salary);
    // setDateofBirth(dateofBirth);
    let updatedEmployee={
      id:itemId,
      firstname: firstName,
      lastname: lastName,
      dob: dateofBirth,
      salary: salary,
    }
    await api
    .put(`/employee/${itemId}`,updatedEmployee)
    .then((res) => {
      console.log(res, "res.....");
    })
    .catch((err) => {
      console.log(err, "error....");
    });
  };

  const onClear = () => {
    setFirstName("");
    setLastName("");
    setSalary("");
    setDateofBirth("");
  };

  return (
    <div>
      <Header />
      {loading && (
        <div
          class="d-flex align-items-center spinner-border text-primary loader"
          role="status"
        >
          {/* <span class="sr-only">Loading...</span> */}
        </div>
      )}
      <div class="row col-sm-12  col-md-12  col-lg-4  col-xl-4"></div>

      <div class="container col-sm-12  col-md-12  col-lg-4  col-xl-4 home-container">
        <form class="row g-3" >
          <div class="col-md-12">
            <label for="validationDefault01" class="form-label">
              First Name
            </label>
            <input
              type="text"
              class="form-control"
              id="validationDefault01"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div class="col-md-12">
            <label for="validationDefault02" class="form-label">
              Last Name
            </label>
            <input
              type="text"
              class="form-control"
              id="validationDefault02"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div class="col-md-12">
            <label for="validationDefault03" class="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              class="form-control"
              id="validationDefault03"
              value={dateofBirth}
              onChange={(e) => setDateofBirth(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div class="col-md-12">
            <label for="validationDefault03" class="form-label">
              Salary
            </label>
            <input
              type="number"
              class="form-control"
              id="validationDefault03"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
              autoComplete="off"
              maxLength="6"
            />
          </div>
          <div class="col-12">
            <button class="btn btn-primary" type="submit"
              onClick={(e)=>{edit?updateEmployee(e):onSubmitHandler(e)}}
            >
             {edit?"Update":"Submit"}
            </button>
          </div>
        </form>
      </div>
      <div class="col-sm-12  col-md-12  col-lg-4  col-xl-4"></div>
      <div class="row">
        <div class="col-sm-12  col-md-12  col-lg-3 col-xl-3"></div>
        <div class="col-sm-12  col-md-12  col-lg-6 col-xl-6">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">DateofBirth</th>
                <th scope="col">Salary</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.dob}</td>
                    <td>{item.salary}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => {
                          deleteEmployee(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      {!edit ? (
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={() => editEmployee(item)}
                        >
                          Edit
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div class="col-sm-12  col-md-12  col-lg-3  col-xl-3"></div>
      </div>
    </div>
  );
};
export default Home;
