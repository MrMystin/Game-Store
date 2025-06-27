import React, { useState, useEffect } from "react";
import "./account.css";
import Header from "../../components/header/header";
import Rodape from "../../components/footer/footer";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export default function PerfilUsuario() {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState("dados");
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      localStorage.removeItem("token");
      navigate("/");
      return;
    }
  
    const userObj = JSON.parse(storedUser);
    setUser(userObj);
    setName(userObj.fullName);
    setEmail(userObj.email);
  
    // Função para buscar transações e extrair produtos comprados
    const fetchUserTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/transaction", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) throw new Error("Erro ao buscar transações");
        const data = await res.json();
  
        const uniqueProductsMap = new Map();
  
        data.transactions.forEach((tx) => {
          tx.transactionItems.forEach((item) => {
            if (!uniqueProductsMap.has(item.productId)) {
              uniqueProductsMap.set(item.productId, item.product);
            }
          });
        });
  
        setUserProducts(Array.from(uniqueProductsMap.values()));
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      }
    };
  
    fetchUserTransactions();
  }, []);
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleExcluirConta = () => {
    setMostrarConfirmacao(true);
  };

  const confirmarExclusao = () => {
    setMostrarConfirmacao(false);
    fetch(`http://localhost:3000/users/${user.cpf}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Erro ao deletar conta");
        }
        return res.json();
      })
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Conta deletada!",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      });
  };

  const cancelarExclusao = () => {
    setMostrarConfirmacao(false);
  };

  const handleAtualizarDados = () => {
    if (
      user.fullName === name &&
      user.email === email &&
      password.trim() === ""
    ) {
      alert("Nenhum dado foi alterado.");
      return;
    }
    const bodyData = {};
    if (!user.fullName === name) {
      bodyData.fullName = name;
    }
    if (!user.email === email) {
      bodyData.email = email;
    }
    if (password.trim() !== "") {
      bodyData.password = password;
    }

    fetch(`http://localhost:3000/users/${user.cpf}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(bodyData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Erro ao atualizar seus dados");
        }
        return res.json();
      })
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Dados atualizados!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "An Error Occurred!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <>
      <Header />
      <div className="container">
        <aside className="sidebar">
          <div className="sidebar-top">
            <button
              className={abaAtiva === "dados" ? "ativo" : ""}
              onClick={() => setAbaAtiva("dados")}
            >
              Meus Dados
            </button>
            <button
              className={abaAtiva === "produtos" ? "ativo" : ""}
              onClick={() => setAbaAtiva("produtos")}
            >
              Meus Produtos
            </button>
          </div>
          <button
            id="logout-btn"
            className={`logout-btn ${abaAtiva === "logout" ? "ativo" : ""}`}
            onClick={() => logout()}
          >
            Logout
          </button>
        </aside>

        <main className="conteudo">
          {abaAtiva === "dados" && (
            <div className="formulario">
              <h2>Meus Dados</h2>
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="botoes">
                <button
                  className="btn atualizar"
                  onClick={handleAtualizarDados}
                >
                  Atualizar Dados
                </button>
                <button className="btn excluir" onClick={handleExcluirConta}>
                  Excluir Conta
                </button>
              </div>
            </div>
          )}

          {abaAtiva === "produtos" && (
            <div className="formulario">
              <h2>Meus Produtos</h2>
              <div className="product-list">
                {userProducts.length === 0 ? (
                  <p>Você ainda não comprou nenhum produto.</p>
                ) : (
                  userProducts.map((product) => {
                    const banner = product.photos.find(p => p.type === "banner")?.photo;
                    return (
                      <a
                        key={product.id}
                        href="https://www.mediafire.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`http://localhost:3000/images/${product.id}/${banner}`}
                          alt={product.name}
                          className="product-banner"
                        />
                      </a>
                    );
                  })
                )}
              </div>
            </div>
          )}

        </main>

        {mostrarConfirmacao && (
          <div className="modal-overlay">
            <div className="modal">
              <p>Tem certeza que deseja excluir sua conta?</p>
              <div className="modal-botoes">
                <button className="btn atualizar" onClick={confirmarExclusao}>
                  Sim
                </button>
                <button className="btn excluir" onClick={cancelarExclusao}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Rodape />
    </>
  );
}
