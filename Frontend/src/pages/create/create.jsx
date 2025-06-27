import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./create.css";
import Header from "../../components/header/header";
import Rodape from "../../components/footer/footer";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    const cpfNumber = cpf.replace(/\D/g, ""); 

    fetch("http://localhost:3000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        fullName: name,
        cpf: cpfNumber,
        username: username
      })
    }).then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Erro ao criar conta");
        }
        return res.json();
      }).then((data) => {
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
            title: "Registration successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
          setEmail("");
          setPassword("");
        })
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "An Error Occurred!",
          showConfirmButton: false,
          timer: 1500,
        });
      }).finally(() => setIsSaving(false));
  };

  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 11);
    value = value
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");

    setCpf(value);
  };

  return (
    <>
      <Header />
      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="cpf">CPF</label>
              <input
                id="cpf"
                type="text"
                value={cpf}
                onChange={handleCpfChange}
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
                required
              />
            </div>
            <button className="signup-btn" type="submit" disabled={isSaving}>
              {isSaving ? "Creating..." : "Create Account"}
            </button>
          </form>
          <div className="divider" />
          <Link to="/login" className="login-link">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
      <Rodape />
    </>
  );
}

export default Signup;
