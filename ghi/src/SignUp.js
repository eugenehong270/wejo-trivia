import { useState } from "react";
export default function SignUp() {
  // States for registration
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setUserName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {username} successfully registered!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h1>SignUp Form</h1>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <div>
          Name:
          <input
            onChange={handleName}
            className="input"
            value={username}
            type="text"
            placeholder="User Name"
          />
        </div>
        <div>
          Email:
          <input
            onChange={handleEmail}
            className="input"
            value={email}
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          Password:
          <input
            onChange={handlePassword}
            className="input"
            value={password}
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <button onClick={handleSubmit} className="btn" type="submit">
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
}
