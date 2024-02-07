import React, { FormEvent } from "react";
import insurance from "../assets/insurance.svg";
import "../css/LandingPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import mobileimg from "../assets/mobileLogo.svg";
import AuthService from "../service/authservice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

interface Props { }

const ForgotNewPassword: React.FC<Props> = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");


  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("Typed letter:", value);
    // Update state for newPassword and confirmPassword
    if (e.target.name === "newPassword") {
      setNewPassword(value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Retrieve newPassword and confirmPassword from state
      const data = {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };

      const response = await AuthService.updatePassword(data);

      if (response.statusCode === 200) {
        setSuccessMessage(response.message || "Password updated successfully.");
        navigate("/dashboard"); // Navigate to the dashboard upon successful update
      } else {
        setErrorMessage(response.message || "Error updating password. Please try again.");
        setError(true);
      }
    } catch (error: any) {
      console.error("API call error:", error);
      setErrorMessage(
        error.response?.data?.message || "Error updating password. Please try again."
      );
      setError(true);
    }
  };

  const handleClose = () => {
    setError(false);
    setSuccessMessage(null);
    setErrorMessage(null);
  };


  return (
    <>
      <div id="login-container-id">
        <div className="left-container">
          <form onSubmit={handleSubmit}>
            <div className="login-page-div">
              <img
                className="insurance-log-img"
                src={insurance}
                alt="insurance"
              />
              <span style={{ color: "#36256E" }} className="insurance-txt">
                Insurance Company
              </span>
            </div>

            <div className="login-border">
              <div className="login-page-border">
                <h2 id="login-page-txt">Forgot-Password</h2>
              </div>
              <div className="input-field-div">
                <label id="email-label">New Password</label>
                <input
                  type="password"
                  className="new-password-input"
                  name="newPassword"
                  value={newPassword}
                  autoFocus
                  required
                  onChange={handleInputChange}
                  placeholder="Enter New Password"
                />

                <label id="email-label">Confirm Password</label>
                <input
                  type="password"
                  className="confirm-password-input"
                  name="confirmPassword"
                  value={confirmPassword}
                  required
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                />

                {error ? <span>Error message</span> : <span></span>}
                <button type="submit" id="login-btn">
                  Login
                </button>
                {/* </div> */}
              </div>
            </div>
          </form>
        </div>

        <div className="right-container">
          <Snackbar
            open={error || successMessage !== null}
            autoHideDuration={3000} // Adjust the duration (in milliseconds) as needed
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MuiAlert
              elevation={6}
              variant={error ? "filled" : "filled"}
              severity={error ? "error" : "success"}
              onClose={handleClose}
            >
              {error && errorMessage && errorMessage}
              {successMessage && successMessage}
            </MuiAlert>
          </Snackbar>
          <div className="login-content-div">
            <div className="align-content-div">
              <p> Incredibly low premiums</p>
              <p>100% paperless & digital</p>
              <p>Hassle-free claims</p>
            </div>
          </div>
          <div className="phone-img-div">
            <img src={mobileimg} id="phone-img" />
          </div>
        </div>
      </div>
    </>
  );
};


export default ForgotNewPassword;


