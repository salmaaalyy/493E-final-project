import { useState } from "react";
import "../styles/common.css";
import { useNavigate } from "react-router-dom";
import { HOST, PORT } from "../constants/BackendConstants";

export default function LoginPage({ setUserName, setUserToken } : any) {
  const [user, setUser] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const navigator = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setErrorMessage(""); 
  
    try {
      const response = await fetch(`http://${HOST}:${PORT}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user,
          password,
        }),
      });

      if (response.ok) { // checks for status 200-299
        const token = await response.json(); // assuming the token is in JSON format
        setUserToken(token);
        setUserName(user);
    
        // Redirect to the previous page when successfully logged in
        navigator(-1);
      } else if (response.status === 401) {
        setErrorMessage("Incorrect password. Please try again.");
      } else if (response.status === 400) {
        setErrorMessage("User does not exist. Please register.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div>
      <section id="login">
        {/* Login Title */}
        <h1 style={{ fontSize: "3rem" }}>Login</h1>

        {/* User Input */}
        <div>
          <form id="userForm" onSubmit={handleSubmit}>
            <label htmlFor="userInput">
              <h2>User Name: </h2>
            </label>
            <input
              type="text"
              id="userInput"
              name="userInput"
              value={user}
              onChange={(e) => setUser(e.target.value)} 
              placeholder="Enter your user name"
              required
            />
          </form>
        </div>

        {/* Password Input */}
        <div>
          <form id="userForm" onSubmit={handleSubmit}>
            <label htmlFor="passwordInput">
              <h2>Password:</h2>
            </label>
            <input
              type="password"
              id="passwordInput"
              name="passwordInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: "380px",
                padding: "10px",
                border: "2px solid black",
                borderRadius: "10px",
                fontSize: "16px",
              }}
              required
            />
          </form>
        </div>
        <a href="/reset-password">Forget / Edit Password</a>

        <br />
        <div className="center">
          {/* Log In Button */}
          <button
            id="login-button"
            style={{
              fontSize: "1.17rem",
              padding: "5px 10px",
              width: "100px",
            }}
            type="submit"
            onClick={handleSubmit} 
          >
            <h3 style={{ margin: 0 }}>LOG IN</h3>
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>}
      </section>
    </div>
  );
}
