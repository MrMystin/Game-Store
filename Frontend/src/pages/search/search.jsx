import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";

const Search = () => {
  const navigate = useNavigate();
  let urlParams;
  let cpfParam;
  let cpf;

  useEffect(() => {
    urlParams = new URLSearchParams(window.location.search);
    cpfParam = urlParams.get("cpf");
    document.getElementById("cpf2").value = cpfParam;
    searchUser()
  }, [])

  async function changePage(event) {
    urlParams = new URLSearchParams(window.location.search);
    cpfParam = urlParams.get("cpf");
    const id = event.target.id;
    if (id == "deletePage") {
      navigate(`/delete`, { replace: true });
    } else {
      navigate(`/update?cpf=${cpfParam}`);
    }
  }
  
  async function searchUser() {
    if (cpfParam) {
      cpf = cpfParam
      cpfParam = null;
    } else {
      cpf = await document.getElementById("cpf2").value;
    }
    if (!cpf) {
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
    document.getElementById('cpfOut').innerText = `CPF: ${data.user.cpf}`;
    document.getElementById('passwordOut').innerText = `Senha: ${data.user.password}`;
    document.getElementById('usuario').innerText = `${data.user.username}`;
    document.getElementById('nome').innerText = `${data.user.fullName}`;
  }
  return (
    <div className="body-crud">
      <div class="central-main-search">
        <img className="fotoPerfil" src="/img/fotoPerfil.png" alt="fotoPerfil" />
          <img className="logo-search" src="/img/logo.jpg" alt="logo"/>

          <div className="userAndFullname">
            <div className="usuario-search" id="usuario"></div>
            <div className="line-blue-search"></div>
            <div className="fullname-search" id="nome"></div>
          </div>

            <form action="" method="get" className="form-search">

              <label id="emailOut" className="" htmlFor="email">
                <p className="search-email-cpf-senha">Email:</p> {" "}
              </label>

              <label id="cpfOut" className="" htmlFor="cpf">
                <p className="search-email-cpf-senha">CPF:</p> {" "}
              </label>

              <label id="passwordOut" className="" htmlFor="senha">
                <p className="search-email-cpf-senha">Senha:</p> {" "}
              </label>

              <div className="labelDiv-search senhaDiv-search" id="senha"></div>

            </form>
    </div>
    <div className="left-main">
      <img className="logo-search-left" src="/img/logo.jpg" alt="logo"/>
      <h1 className="titulo-left-search">Já possui uma conta?</h1>
      <h2 className="text-left-search">Consulte seus dados digitando <br/>
      seu CPF.</h2>
      <div className="cpf-search">
        <p className="label-search">Digite seu CPF:</p>
        <input className="input-search" type="text" name="cpf" id="cpf2" required />
      </div>
          <button onClick={searchUser} className="btn-search-left" type="submit" value="Submit" > Pesquisar</button>
    </div>

    <div className="right-main rightUp-search">
      <h1 className="titulo-right-search">
        Deseja atualizar seus dados? Clique aqui:
      </h1>
      <button className="btn-search-right" id="updatePage" onClick={changePage}>Atualizar conta</button>
    </div>

    <div className="right-main right-search">
      <h1 className="titulo-right-search">
        Deseja deletar sua conta? Clique aqui:
      </h1>
      <button className="btn-search-right" id="deletePage" onClick={changePage}>Deletar conta</button>
    </div>
    <a href='/'><img className="allBack" src="/img/voltar.png" alt="back" /></a>
  </div>
  );
};

export default Search;
