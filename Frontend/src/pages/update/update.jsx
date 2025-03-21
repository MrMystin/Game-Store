import { React, useState } from 'react';
import "./update.css"
import { useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState()
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
  });

  const [newData, setNewData] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };

  const handleChange2 = (e) => {
    console.log('a')
    setCpf(e.target.value);
    console.log(cpf)
  };

  async function searchUser() {
    const response = await fetch(`http://localhost:3000/users/${cpf.replace(/[^\d]/g, "")}`, { method: "GET" });
    let data = await response.json();
    const {id, cpf, registerDate, ...withOutId} = data.user
    setFormData(withOutId)
    setNewData(withOutId)
    if (data.error) {
      return alert("CPF não encontrado");
    }
  }

  async function enviarDados() {
    try {
      const response = await fetch(`http://localhost:3000/users/${cpf.replace(/[^\d]/g, "")}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (response.status == 200) {
        alert("Usuário atualizado com sucesso");
        return navigate(`/`);
      } else {
        return alert("Email ou Username já existem");
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="body-crud">
      <div className="central-main-up">
          <h1 className="titulo-up">Atualize sua conta</h1>
          <img className="logo-up" src="/img/logo.jpg" alt="logo" />

          <form className="form-up">
            <label id='nameOut' htmlFor="nome">Nome completo: {formData ? formData.fullName : ""}</label>
            <input className="" onChange={handleChange} type="text" id="nome" name="fullName" />

            <label id='usernameOut' htmlFor="usuario">Nome de usuário: {formData ? formData.username : ""}</label>
            <input
              className=""
              type="text"
              id="usuario"
              name="username"
              onChange={handleChange}
            />

            <label id='emailOut' htmlFor="email">Email: {formData ? formData.email : ""}</label>
            <input
              className=""
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
            />

            <label id="senhaOut" htmlFor="senha">Senha: {formData ? formData.password : ""}</label>
            <input
              className=""
              type="password"
              id="senha"
              name="password"
              onChange={handleChange}
            />
          </form>
          <button onClick={enviarDados} className="btn-up" type="submit">
            Atualizar
          </button>
      </div>
      <div className="left-main-up">
      <img className="logo-up-left" src="/img/logo.jpg" alt="logo"/>
      <h1 className="titulo-up-search">Procure sua conta</h1>
        <div className="cpf-up">
            <p className="label-up">Digite seu CPF:</p>
            <input onChange={handleChange2} className="input-up" type="text" name="cpf" required/>
        </div>
         
        <button onClick={searchUser} className="btn-up-left">Pesquisar</button> 
      </div>
      <a href='/'><img className="allBack" src="/img/voltar.png" alt="back" /></a>
    </div>
  );
};

export default Update;
