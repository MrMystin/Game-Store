import { React } from "react";
import "./login.css"

const Login = () => {
  async function dadosEntrar() {

  }
  return (
    <>
      <div className="body-crud">
        <div className="central-login">
        <img className="logo-login" src="/img/logo.jpg" alt="logo" />
          <p className="titulo-login">Acesse sua conta do Minecraft</p>
          <form className="form-login">
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" />
            <label htmlFor="senha">Senha: </label>
            <input type="password" id="senha" name="senha" />
          </form>
          <button onClick={dadosEntrar} className="btn-login" type="submit">Entrar</button>
        </div>
        <a href='/'><img className="allBack" src="/img/voltar.png" alt="back" /></a>
      </div>
    </>
  );
};

export default Login;
