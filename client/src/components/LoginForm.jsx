import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useLoginMutation } from "../store/apiSlice";
import { setUser } from "../store/authSlice";

const LoginForm = ({ visible }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await login({ email, password });
      if (loginResponse?.data) {
        dispatch(setUser(loginResponse.data));
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
      <label>Login</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="passord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button style={{ margin: "10px 0 0 0" }} type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
