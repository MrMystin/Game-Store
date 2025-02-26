import { React} from "react";
import "./delete.css";

const Delete = () => {
  async function deleteUser(event) {
    event.preventDefault();
    let cpf = document.getElementById('cpf').value;
    if (!cpf) {
      return alert("Digite um cpf!");
    }
    const response = await fetch(`http://localhost:3000/users/delete/${cpf.replace(/[^\d]/g, "")}`, { method: "DELETE" });
    if (response.status === 200) {
      return alert("Usuário deletado com sucesso");
    } else {
      alert('Usuário não encontrado!')
    }
  }
  return (
    <>
    <div className="body-delete">
      <div className="central-main-delete">

      <img className="logo-delete" src="/img/logo.png" alt="logo"/>

        <h1 className="titulo-delete">Delete sua conta</h1>

        <div className="cpf-delete">
          <p className="label-right">Digite seu CPF:</p>
          <input className="input-delete" type="text" name="cpf" id="cpf" required />    
        </div>

        <button onClick={deleteUser} className="btn-delete" type="submit" value="Submit">Deletar</button>

      </div>
      <a href='/'><img className="allBack" src="/img/voltar.png" alt="back" /></a>
    </div>
    </>
  );
};

export default Delete;
