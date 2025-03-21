import { React, useState } from 'react';
import './Create.css'; 
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    cpf: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function enviarDados() {
    try {
      const response = await fetch("http://localhost:3000/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.status == 200) {
        alert("Usuário cadastrado com sucesso");
        navigate(`/login`);
      } else {
        alert("CPF/Email/Username já existe");
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='body-crud'>
      <div className="central-main-create">
          <h1 className='titulo-create'>
            Crie sua conta <br/>
            aqui:
          </h1>
          <img className="logo-create" src="/img/logo.jpg" alt="logo" />

          <form className="form-create">
            <label htmlFor="nome">Nome e Sobrenome: </label>
            <input type="text" id="nome" name="fullName" onChange={handleChange} />

            <label htmlFor="usuario">Nome de Usuário: </label>
            <input type="text" id="usuario" name="username" onChange={handleChange}/>

            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" onChange={handleChange}/>

            <label htmlFor="cpf">CPF: </label>
            <input type="text" id="cpf" name="cpf" onChange={handleChange}/>

            <label htmlFor="senha">Senha: </label>
            <input type="password" id="senha" name="password" onChange={handleChange}/>
          </form>

          <button onClick={enviarDados} className="btn-create" type="submit">Criar</button>
      </div>
      <a href='/'><img className="allBack" src="/img/voltar.png" alt="back" /></a>
    </div>
    
  );
};

export default Create;