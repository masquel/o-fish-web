import React, { Component } from "react";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import moment from "moment";

import history from "../../../root/root.history";

import UserService from "./../../../services/user.service";

import "./new-user.css";

const userService = UserService.getInstance();

class NewUser extends Component {
  state = {
    error: null,
  };

  removeErrMsg = () => {
    this.setState({ error: null });
  };

  saveUser = (values) => {
    let newUser = {
      email: values.email,
      name: {
        first: values.firstName,
        last: values.lastName,
      },
      active: true,
      createdOn: moment().toDate(),
    };

    if (values.adminType === "Global Admin") {
      newUser = {
        ...newUser,
        global: { admin: true },
        agency: { name: values.agency },
      };
    } else if (values.adminType === "Agency Admin") {
      newUser = { ...newUser, agency: { name: values.agency, admin: true } };
    } else {
      newUser = { ...newUser, agency: { name: values.agency } };
    }

    // userService
    //   .createUser(values.firstName + values.lastName, newUser)
    //   .then(() => history.push("/users"))
    //   .catch((error) => {
    //     error.message
    //       ? this.setState({ error: `${error.name}: ${error.message}` })
    //       : this.setState({ error: "An expected error occurred!" });
    //   });
  };

  render() {
    const { error } = this.state;

    return (
      <div className="flex-column align-center padding-top">
        <div className="flex-row justify-between standard-view">
          <div>
            <div className="item-label">User</div>
            <div className="item-name">New User</div>
          </div>
        </div>
        <div className="flex-row justify-center standard-view white-bg box-shadow relative new-user-form">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              agency: "",
              adminType: "",
              email: "",
            }}
            onSubmit={this.saveUser}
            render={({
              errors,
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <Form
                onSubmit={handleSubmit}
                className="flex-column justify-center"
              >
                <div className="flex-row justify-center">
                  <div className="add-img">
                    <img
                      className="icon"
                      src={require("../../../assets/download-img-icon.jpg")}
                      alt="no logo"
                    />
                  </div>
                </div>
                <div className="flex-row justify-between">
                  <TextField
                    label="First Name"
                    name="firstName"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("firstName", e.target.value)}
                    type="text"
                    value={values.firstName}
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("lastName", e.target.value)}
                    type="text"
                    value={values.lastName}
                  />
                </div>
                <div className="flex-column">
                  <TextField
                    label="Email"
                    name="email"
                    type="text"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    value={values.email}
                  />
                  <TextField
                    label="Role"
                    name="adminType"
                    type="text"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("adminType", e.target.value)}
                    value={values.adminType}
                  />
                  <TextField
                    label="Agency"
                    name="agency"
                    type="text"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("agency", e.target.value)}
                    value={values.agency}
                  />
                </div>
                <div className="flex-row justify-around align-center margin-top">
                  <button className="blue-btn" type="submit">
                    Create User
                  </button>
                  <div
                    className="blue-color pointer"
                    // onClick={this.clearForm}
                  >
                    Cancel
                  </div>
                </div>
              </Form>
            )}
          />
        </div>
        {error && (
          <div className="flex-row justify-between standard-view">
            <div className="flex-row justify-between err-msg">
              <div>{error}</div>
              <Icon className="pointer" onClick={this.removeErrMsg}>
                close
              </Icon>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default NewUser;
