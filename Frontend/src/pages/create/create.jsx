import { React } from 'react';
import './Create.css'; 
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  async function enviarDados() {
    try {
      const response = await fetch("http://localhost:3000/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: `${document.getElementById("nome").value}`,
          username: `${document.getElementById("usuario").value}`,
          cpf: `${document.getElementById("cpf").value}`,
          password: `${document.getElementById("senha").value}`,
          email: `${document.getElementById("email").value}`,
        }),
      });
      if (response.status == 200) {
        alert("Usuário cadastrado com sucesso");
        navigate(`/Report?cpf=${document.getElementById("cpf").value}`);
      } else {
        alert("CPF/Email/Username já existe");
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='body-create'>
      <div className="central-main-create">
          <h1 className='titulo-create'>
            Crie sua conta <br/>
            aqui:
          </h1>
          <img className="logo-create" src="/img/logo.jpg" alt="logo" />

          <form className="form-create">
            <label htmlFor="nome">Nome e Sobrenome: </label>
            <input type="text" id="nome" name="nome" />

            <label htmlFor="usuario">Nome de Usuário: </label>
            <input type="text" id="usuario" name="usuario" />

            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" />

            <label htmlFor="cpf">CPF: </label>
            <input type="text" id="cpf" name="cpf" />

            <label htmlFor="senha">Senha: </label>
            <input type="password" id="senha" name="senha" />
          </form>

          <button onClick={enviarDados} className="btn-create" type="submit">Criar</button>
      </div>
      <a href='/'><img className="allBack" src="/img/voltar.png" alt="back" /></a>
    </div>
    
  );
};

export default Create;