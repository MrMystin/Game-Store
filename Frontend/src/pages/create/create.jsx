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

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const cpfNumber = cpf.replace(/\D/g, "");

      const resRegister = await fetch("http://localhost:3000/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          fullName: name,
          cpf: cpfNumber,
          username,
        }),
      });

      const dataRegister = await resRegister.json();
      console.log(dataRegister)
      console.log(resRegister)
      if (!resRegister.ok) {
        if (dataRegister.errorCode === 2 && Array.isArray(dataRegister.errors)) {
          const messages = dataRegister.errors
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join("\n");
          throw new Error(messages);
        }

        if (dataRegister.errorCode === 1 && Array.isArray(dataRegister.errors)) {
          const messages = dataRegister.errors
            .map((e) => {
              if (e === "cpfMatch") return "CPF já cadastrado";
              if (e === "usernameMatch") return "Usuário já cadastrado";
              if (e === "emailMatch") return "Email já cadastrado";
              return e;
            })
            .join("\n");
          throw new Error(messages);
        }

        throw new Error(dataRegister.message || "Erro ao criar conta");
      }

      const resLogin = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const dataLogin = await resLogin.json();

      if (!resLogin.ok) {
        throw new Error(dataLogin.message || "Erro ao fazer login");
      }

      localStorage.setItem("token", dataLogin.token);
      localStorage.setItem("user", JSON.stringify(dataLogin.user));

      Swal.fire({
        icon: "success",
        title: "Registro realizado com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");

      setEmail("");
      setPassword("");
      setName("");
      setCpf("");
      setUsername("");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erro",
        html: err.message.replace(/\n/g, "<br>"),
        confirmButtonText: "OK",
      });
    } finally {
      setIsSaving(false);
    }
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
