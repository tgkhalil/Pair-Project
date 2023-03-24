import React, { useState } from "react";
import axios from "axios";
import "./css/Login.css";

function Login({ fn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNewUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleShowCreateAccount = () => {
    setShowCreateAccount(true);
  };

  const handleHideCreateAccount = () => {
    setShowCreateAccount(false);
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
    // Call API to login user
    axios
      .get("http://localhost:8000/users")
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          if (
            response.data[i].userName === username &&
            response.data[i].password === password
          ) {
            fn("Allblogs");
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log(`New Username: ${newUsername}, New Password: ${newPassword}`);
  const handleSubmitCreateAccount = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8000/users", {
        userName: newUsername,
        password: newPassword,
      })
      .then(() => {
        console.log("Success");
      })
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        {!showCreateAccount && (
          <form className="login-form" onSubmit={handleSubmitLogin}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <button type="submit">Login</button>
            <p
              className="create-account-link"
              onClick={handleShowCreateAccount}
            >
              Create a new account
            </p>
          </form>
        )}
        {showCreateAccount && (
          <form className="login-form" onSubmit={handleSubmitCreateAccount}>
            <label htmlFor="new-username">New Username:</label>
            <input
              type="text"
              id="new-username"
              name="new-username"
              value={newUsername}
              onChange={handleNewUsernameChange}
            />

            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />

            <button>
              Create Account
            </button>
            <p
              className="create-account-link"
              onClick={handleHideCreateAccount}
            >
              Back to login
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
