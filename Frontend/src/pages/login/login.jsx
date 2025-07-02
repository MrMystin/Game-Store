import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./login.css";
import Header from "../../components/header/header";
import Rodape from "../../components/footer/footer";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Erro ao fazer login");
        }
        return res.json();
      }).then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        Swal.fire({
          icon: "success",
          title: "Login successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Email ou senha incorretos!",
          showConfirmButton: false,
          timer: 1500,
        });
      }).finally(() => setIsSaving(false));
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Sign In</h2>
          <form onSubmit={handleSave}>
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button className="login-btn" type="submit" disabled={isSaving}>
              {isSaving ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <div className="divider" />
          <Link to="/create" className="signup-link">
            Create new account
          </Link>
        </div>
      </div>
      <Rodape />
    </>
  );
}

export default Login;
