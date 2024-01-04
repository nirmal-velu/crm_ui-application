import React from "react";

function MyUpdatedComponent() {
  return (
    <form className="main-container">
      <header className="header">
        <h2 className="title">My Updated Component</h2>
        <span className="description">Welcome to my component!</span>
      </header>
      <div className="image-wrapper">
        <img
          alt="Image 1"
          className="image"
        />
        <img
          alt="Image 2"
          className="image"
        />
      </div>
      <div className="input-group">
        <label className="label" htmlFor="name-input">
          Name:
        </label>
        <input
          type="text"
          id="name-input"
          className="input"
          aria-label="Name"
        />
      </div>
      <div className="input-group">
        <label className="label" htmlFor="email-input">
          Email:
        </label>
        <input
          type="email"
          id="email-input"
          className="input"
          aria-label="Email"
        />
      </div>
      <div className="button-group">
        <button className="button">Submit</button>
        <a href="/forgot-password" className="button-link">
          Forgot Password
        </a>
      </div>
    </form>
  );
}