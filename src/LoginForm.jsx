import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Both fields are required!");
    } else {
      setError("");
      // Handle login logic here (e.g., API call to authenticate user)

      await axios
        .post("https://be-auth-pwd.onrender.com/auth/login/", {
          email: email,
          password: password,
        })
        .then(async function (response) {
          console.log(response);
          if (response.data.token.length > 0) {
            const API_URL = "https://be-auth-pwd.onrender.com/auth/me/";
            const BEARER_TOKEN = response.data.token;

            await axios
              .get(API_URL, {
                headers: {
                  Authorization: `Bearer ${BEARER_TOKEN}`,
                },
              })
              .then((response) => {
                console.log("Data:", response.data);
                const propsToPass = { message: response.data.username };

                navigate("/me", { state: propsToPass });
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("Enter correct credentials");
        });
    }
  };
  const handleForgotPassword = () => {
    axios
      .post("https://be-auth-pwd.onrender.com/auth/forgotPassword/", {
        email: email,
      })
      .then(function (response) {
        console.log(response);
        alert(response.data);
        navigate("/updatepassword")
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
      <button onClick={handleForgotPassword}>Forgot password</button>
    </div>
  );
};

export default LoginForm;
