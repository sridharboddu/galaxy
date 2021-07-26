import React, { useState } from "react";
import Header from "./Header";

function About() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    address: "",
    city: "",
    zip: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const onBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    })
  }

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user, "user....");
    onClear();
  };

  const onClear = () => {
    setUser({
      email: "",
      password: "",
      address: "",
      city: "",
      zip: "",
    });
  };

  const onValid = () => {
    const errors = {};
    const password = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (user.password) {
      if (!password.test(user.password)) {
        errors.password =
          "Minimum 8 characters, at least one capital letter, one small letter and one number";
      }
    } else {
      errors.password = "Please enter Password";
    }
    if (user.email) {
      if (!emailRegex.test(user.email)) {
        errors.email =
          "Minimum 8 characters, at least one capital letter, one small letter and one number";
      }
    } else {
      errors.email = "Please enter  email";
    }
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };
  const { errors } = onValid()
  return (
    <div>
      <Header />

      <div class="container home-container">
        <form class="row g-3" onSubmit={onSubmit}>
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              class="form-control"
              id="inputEmail4"
              value={user.email}
              onChange={onChange}
              autoComplete="off"
              onBlur={onBlur}
            />
            <p className="text-left danger">
              {touched.email && !!errors.email && (
                <span>{errors.email}</span>
              )}
            </p>
          </div>
          <div class="col-md-6">
            <label for="inputPassword4" class="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              class="form-control"
              id="inputPassword4"
              value={user.password}
              onChange={onChange}
              onBlur={onBlur}
              autoComplete="off"
            />
            <p className="text-left danger">
              {touched.password && !!errors.password && (
                <span>{errors.password}</span>
              )}
            </p>
          </div>
          <div class="col-12">
            <label for="inputAddress" class="form-label">
              Address
            </label>
            <input
              type="text"
              name="address"
              class="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
              value={user.address}
              onChange={onChange}
              autoComplete="off"
            />
          </div>
          <div class="col-md-6">
            <label for="inputCity" class="form-label">
              City
            </label>
            <input
              type="text"
              name="city"
              class="form-control"
              id="inputCity"
              value={user.city}
              onChange={onChange}
              autoComplete="off"
            />
          </div>
          <div class="col-md-6">
            <label for="inputZip" class="form-label">
              Zip
            </label>
            <input
              type="text"
              name="zip"
              class="form-control"
              id="inputZip"
              value={user.zip}
              onChange={onChange}
              autoComplete="off"
            />
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default About;
