import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignupPage.css";
import { useAuthContext } from "../context/Authcontext.jsx";
import React from "react";


const API_BASE_URL = "http://localhost:5000";

const SignupPage = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const problem = await response.json();
        throw new Error(problem.message || "Signup failed");
      }

      const data = await response.json();
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page auth-page--signup">
      <div className="auth-card">
        <h1 className="auth-title auth-title--signup">Create your account</h1>
        <p className="auth-subtitle">
          Join courses and track your progress.
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label className="auth-label">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="auth-button auth-button--accent"
          >
            {submitting ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="auth-footer-text">
          Already registered?{" "}
          <Link to="/login" className="auth-link auth-link--accent">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
