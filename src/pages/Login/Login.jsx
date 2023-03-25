import React from "react";
import { login } from "../../common/Services/VehicleApi";
import { Input, Button } from "../../components/UI";
import { useNavigate } from "react-router-dom";
import { observer } from 'mobx-react';
import loginFormStore from '../../stores/LoginFormStore';
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    loginFormStore.validateUsername();
loginFormStore.validatePassword();
if (loginFormStore.isFormValid) {
  login(loginFormStore.username, loginFormStore.password)
    .then((response) => {
      navigate("/vehiclelist");
    })
    .catch(() => {
      console.log("Invalid credentials");
    });
}
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submitForm}>
        <p className="text-form">LOGIN</p>
        <div className="input-form">
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            input="true"
            value={loginFormStore.username}
            onChange={(e) => loginFormStore.setUsername(e.target.value)}
          />
          {loginFormStore.usernameError && <div className="error-message">{loginFormStore.usernameError}</div>}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            input="true"
            value={loginFormStore.password}
            onChange={(e) => loginFormStore.setPassword(e.target.value)}
          />
          {loginFormStore.passwordError && <div className="error-message">{loginFormStore.passwordError}</div>}
        </div>
        <div className="button-form">
          <Button className="button" type="submit" name="Login" />
        </div>
      </form>
    </div>
  );
};

export default observer(Login);