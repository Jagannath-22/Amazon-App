import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
  e.preventDefault();
  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((authUser) => {
      console.log(" Signed in:", authUser.user.email);
      navigate("/");
    })
    .catch((error) => alert(error.message));
};


  const register = (e) => {
    e.preventDefault();
    if (!email || !password) {
    alert("Please fill in both email and password to create an account.");
    return;
  }
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        console.log(" Registered:", authUser.user.email);
        navigate("/");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("This email is already registered. Try logging in instead.");
        } else {
          alert(error.message);
        }
      });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("✅ Google sign-in:", result.user.email);
        navigate("/");
      })
      .catch((error) => alert("Google Sign-In Failed: " + error.message));
  };

  const handleForgotPassword = () => {
  if (!email) return alert("Please enter your email to reset password.");
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("✅ Password reset link sent to " + email + ". Check your inbox or spam.");
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        alert("No account exists with this email.");
      } else {
        alert("Error: " + error.message);
      }
    });
};

  return (
    <div className="login">
      <h1>Login page</h1>
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        <button onClick={signInWithGoogle} className="login__googleButton">
          Sign in with Google
        </button>

        <form>
          <h5>Enter mobile number or email</h5>
          <input
            type="email"
            placeholder="Enter mobile number or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <h5>Password</h5>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p
            onClick={handleForgotPassword}
            style={{
              color: "#007185",
              cursor: "pointer",
              fontSize: "14px",
              marginBottom: "15px",
            }}
          >
            Forgot your password?
          </p>

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Continue
          </button>
        </form>

        <p>
          By continuing, you agree to Amazon's
          <a href="#"> Conditions of Use</a> and
          <Link to="/privacy"> Privacy Notice</Link>.
        </p>

        <small style={{ fontSize: "13px", marginTop: "15px" }}>
          <strong>Buying for work?</strong>
          <br />
          <a href="#">Create a free business account</a>
        </small>

        <button onClick={register} className="login__registerButton">
  Create your Amazon Account
</button>


        <div className="login__footer">
          <div className="login__links">
            <a href="#">Conditions of Use</a>
            <a href="#">Privacy Notice</a>
            <a href="#">Help</a>
          </div>
          <small>© 1996–2025, Amazon.com, Inc. or its affiliates</small>
        </div>
      </div>
    </div>
  );
}

export default Login;
