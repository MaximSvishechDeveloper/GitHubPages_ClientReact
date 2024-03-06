import axios from "axios";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router";
import { ThemeContext } from "../../App";
import ReactSwitch from "react-switch";

function Register() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/protected", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/protected");
      })
      .catch((err) => {
        console.log(err);
        navigate("/register");
      });
  }, []);

  const onSubmit = useCallback(() => {
    console.log(username, password);
    axios
      .post("http://localhost:5000/register", { username, password })
      .then((user) => {
        console.log(user);
        localStorage.setItem("token", user.data.token);
        navigate("/protected");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate, username, password]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        onSubmit();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [onSubmit]);

  return (
    <div className="App" id={theme}>
      <div className="main">
        <p className="sign" align="center">
          Register
        </p>
        <div className="form1">
          <input
            className="username"
            type="text"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            className="password"
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="submit" align="center" onClick={onSubmit}>
            Register
          </button>
          <p className="newUser" align="center">
            <a className="link" href="/">
              Have an account?{" "}
            </a>
          </p>
        </div>
      </div>
      <div className="switch">
        <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
        <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
      </div>
    </div>
  );
}

export default Register;
