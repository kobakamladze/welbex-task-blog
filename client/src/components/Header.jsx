import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { removeUser, userSelector } from "../store/authSlice";
import NewPostFrom from "./NewPostFrom";

const Header = () => {
  const {
    user: { id },
  } = useSelector(userSelector.getUser);
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const [newPostFormState, setNewPostFormState] = useState(false);
  const [loginFormState, setLoginFormState] = useState(false);
  const [registerFormState, setRegisterFormState] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
        margin: "0 0 10px 0",
      }}
    >
      <p>BLOG</p>
      {id && token ? (
        <div>
          <button
            style={{ margin: "0 10px 0 0 " }}
            onClick={() => setNewPostFormState(!newPostFormState)}
          >
            Add new post
          </button>
          <button onClick={() => dispatch(removeUser())}>Logout</button>
          {newPostFormState ? <NewPostFrom /> : null}
        </div>
      ) : (
        <div>
          <button
            style={{ margin: "0 10px" }}
            onClick={() => {
              setRegisterFormState(false);
              setLoginFormState(!loginFormState);
            }}
          >
            Login
          </button>
          <LoginForm visible={loginFormState} />
          <button
            onClick={() => {
              setLoginFormState(false);
              setRegisterFormState(!registerFormState);
            }}
          >
            Register
          </button>
          <RegisterForm visible={registerFormState} />
        </div>
      )}
    </div>
  );
};

export default Header;
