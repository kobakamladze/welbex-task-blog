import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRegistrationMutation } from "../store/apiSlice";
import { setUser } from "../store/authSlice";

const RegisterForm = ({ visible }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register] = useRegistrationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerResponse = await register({ name, email, password });
      if (registerResponse?.data) {
        dispatch(setUser(registerResponse.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      style={{
        display: visible ? "block" : "none",
        position: "absolute",
        top: 80,
        backgroundColor: "black",
        padding: "10px",
        zIndex: 10,
      }}
    >
      <label>Register</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button style={{ margin: "10px 0 0 0" }} type="submit">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
