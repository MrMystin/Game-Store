import { React } from "react";
import "./update.css"
import { useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  let cpf;
  async function searchUser() {
    cpf = document.getElementById("cpf2").value;
    if (!cpf) {
      cpf = null;
      return alert('Digite o CPF!')
    }
    const response = await fetch(`http://localhost:3000/users/listUser/${cpf.replace(/[^\d]/g, "")}`, { method: "GET" });
    const data = await response.json();
    console.log(response)
    console.log(data)
    if (data.error) {
      return alert("CPF não encontrado");
    }
    document.getElementById('emailOut').innerText = `Email: ${data.user.email}`;
    document.getElementById('senhaOut').innerText = `Senha: ${data.user.password}`;
    document.getElementById('usernameOut').innerText = `Nome de usuário: ${data.user.username}`;
    document.getElementById('nameOut').innerText = `Nome completo: ${data.user.fullName}`;
  }

  async function enviarDados() {
    try {
      if (!cpf) {
        return alert('É obrigatório digitar o CPF!')
      }
      const response = await fetch("http://localhost:3000/users/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: `${document.getElementById("nome").value}`,
          username: `${document.getElementById("usuario").value}`,
          email: `${document.getElementById("email").value}`,
          cpf: `${document.getElementById("cpf2").value}`,
          password: `${document.getElementById("senha").value}`,
        }),
      });
      if (response.status == 200) {
        alert("Usuário atualizado com sucesso");
        return navigate(`/report?cpf=${cpf}`);
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
            <label id='nameOut' htmlFor="nome">Nome completo: </label>
            <input className="" type="text" id="nome" name="nome" />

            <label id='usernameOut' htmlFor="usuario">Nome de usuário:</label>
            <input
              className=""
              type="text"
              id="usuario"
              name="usuario"
            />

            <label id='emailOut' htmlFor="email">Email: </label>
            <input
              className=""
              type="email"
              id="email"
              name="email"
            />

            <label id="senhaOut" htmlFor="senha">Senha: </label>
            <input
              className=""
              type="password"
              id="senha"
              name="senha"
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
            <input className="input-up" type="text" name="cpf" id="cpf2" required/>
        </div>
         
        <button onClick={searchUser} className="btn-up-left">Pesquisar</button> 
      </div>
      <a href='/'><img className="allBack" src="/img/voltar.png" alt="back" /></a>
    </div>
  );
};

export default Update;
