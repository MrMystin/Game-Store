import "./games.css";
import {
  IoIosStar,
  IoLogoWindows,
  IoLogoApple,
  IoLogoTux,
} from "react-icons/io";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/header";
import Rodape from "../../components/footer/footer";
import Swal from "sweetalert2";
import Buy from "../../components/buy/buy";
import { addToCart } from "../../utils/cart";

function formatRequirementsObject(reqObj) {
  if (!reqObj) return [];

  const formatStorage = (bytes) => {
    if (!bytes) return "N/A";
    const gb = bytes / 1024;
    return `${gb.toFixed(2)} GB available space`;
  };

  return [
    { label: "System:", value: reqObj.OS || "N/A" },
    { label: "Processor:", value: reqObj.processor || "N/A" },
    {
      label: "Memory:",
      value: reqObj.memory ? `${reqObj.memory} GB RAM` : "N/A",
    },
    { label: "Graphics:", value: reqObj.graphics || "N/A" },
    {
      label: "DirectX:",
      value: reqObj.directX ? `Version ${reqObj.directX}` : "N/A",
    },
    { label: "Storage:", value: formatStorage(reqObj.storage) },
  ];
}

function renderRequirements(title, data) {
  return (
    <div className="requirements-content">
      <p className="requirements-title">{title}</p>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className="requirement-row">
            <div className="label">{item.label}</div>
            <div className="value">{item.value}</div>
            <div className="spacer" />
          </div>
        ))
      ) : (
        <p className="no-requirements">No requirements available.</p>
      )}
    </div>
  );
}

function Games() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [activeTab, setActiveTab] = useState("windows");
  const [requirements, setRequirements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const [hasPurchased, setHasPurchased] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`, { method: "GET" })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(
            error.message || "Erro para pegar informações do produto"
          );
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.product);
        setGame(data.product);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "An Error Occurred!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      });
  }, [id, navigate]);

  useEffect(() => {
    if (!game) return;
  
    const token = localStorage.getItem("token");
    if (!token) return;
  
    fetch("http://localhost:3000/transaction", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar transações");
        return res.json();
      })
      .then((data) => {
        const transactions = data.transactions || [];
        const hasBought = transactions.some((transaction) =>
          transaction.transactionItems.some(
            (item) => item.productId === game.id
          )
        );
        setHasPurchased(hasBought);
      })
      .catch((err) => {
        console.error("Erro ao verificar compra:", err);
      });
  }, [game]);

  useEffect(() => {
    if (!game || !game.requirements || !activeTab) return;

    const selectedRequirements = game.requirements[activeTab];

    if (selectedRequirements) {
      setRequirements(formatRequirementsObject(selectedRequirements));
    } else {
      setRequirements([]);
    }
  }, [activeTab, game]);

  function next() {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function prev() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  function closeModal() {
    setModalImage(null);
  }

  const photoSlides = game?.photos?.filter((photo) => photo.type === "photos") || [];
  const SLIDE_WIDTH = 274;
  const VISIBLE_SLIDES = Math.floor(1096 / SLIDE_WIDTH);
  const maxIndex = Math.max(0, photoSlides.length - VISIBLE_SLIDES);

  const tabs = [
    { key: "windows", label: "Windows", icon: "IoLogoWindows" },
    { key: "mac", label: "Mac", icon: "IoLogoApple" },
    { key: "linux", label: "Linux", icon: "IoLogoTux" },
  ];

  const tags = ["Adventure", "Action", "Indie", "Fantasy", "Exploration"];

  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  return (
    <>
      <Header />
      {game ? (
        <div className="games">
          <div
            className="games__banner"
            style={{
              backgroundImage: `url(${`http://localhost:3000/images/${
                game.id
              }/${
                game.photos.find((photo) => photo.type === "banner").photo
              }`})`,
            }}
          ></div>
          <div className="games__layout-container">
            <div className="games__product-basic-info">
              <h1 className="games__product-mainTitle">{game.name}</h1>
              <div className="games__product-wrapper">
                <div className="games__product-rating">
                  <IoIosStar className="games__product-icon" />
                  <p>{game.rating}/5</p>
                </div>
                <div className="games__product-separator"></div>
                <div className="games__product-os-support">
                  {game.requirements?.windows && <IoLogoWindows />}
                  {game.requirements?.mac && <IoLogoApple />}
                  {game.requirements?.linux && <IoLogoTux />}
                </div>
                <div className="games__product-separator"></div>
                <div className="games__product-languages">
                  {game.languages?.length > 0 && (
                    <>
                      {game.languages[0].language}
                      {game.languages.length > 1 &&
                        ` & ${game.languages.length - 1} more`}
                    </>
                  )}
                </div>
              </div>
              <div className="purchase-card">
                <div className="offer-header">
                  <span className="offer-label">Offer ends on:</span>
                  <span className="offer-date">16/06/2025 09:59 EEST</span>
                </div>
                <div className="purchase-content">
                  <div className="discount-badge">
                    -
                    {Math.floor(
                      ((game.value - game.discount) / game.value) * 100
                    )}
                    %
                  </div>
                  <div className="price-container">
                    <div className="original-price">R$ {game.value}</div>
                    <div className="current-price">R$ {game.discount}</div>
                  </div>
                  <div className="action-buttons">
                    {hasPurchased ? (
                      <button className="bought-btn" disabled>
                        Comprado
                      </button>
                    ) : (
                      <>
                        <button className="add-to-cart-btn" onClick={() => addToCart(game)}>
                          Add to cart
                        </button>
                        <button className="buy-now-btn" onClick={() => setIsBuyModalOpen(true)}>
                          Buy now
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="games__description">
              <div className="carousel-outer-container">
                <div className="carousel-middle-container">
                  <div className="carousel-inner-container">
                    <div
                      className="carousel-track"
                      style={{
                        transform: `translateX(-${
                          currentIndex * SLIDE_WIDTH
                        }px)`,
                      }}
                    >
                      {game.photos
                        ?.filter((photo) => photo.type === "photos")
                        .map((photo, index) => (
                          <div className="carousel-slide" key={index}>
                            <img
                              src={`http://localhost:3000/images/${game.id}/${photo.photo}`}
                              alt={`slide-${index}`}
                              className="carousel-image"
                              onClick={() =>
                                setModalImage(
                                  `http://localhost:3000/images/${game.id}/${photo.photo}`
                                )
                              }
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <button
                  className={`carousel-button left ${
                    currentIndex === 0 ? "disabled" : ""
                  }`}
                  onClick={prev}
                  disabled={currentIndex === 0}
                >
                  &lt;
                </button>
                <button
                  className={`carousel-button right ${
                    currentIndex >= maxIndex ? "disabled" : ""
                  }`}
                  onClick={next}
                  disabled={currentIndex >= maxIndex}
                >
                  &gt;
                </button>
              </div>
              {modalImage && (
                <div className="modal-overlay" onClick={closeModal}>
                  <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()} // evita fechar ao clicar na imagem
                  >
                    <button className="modal-close-btn" onClick={closeModal}>
                      ×
                    </button>
                    <img src={modalImage} alt="Modal" className="modal-image" />
                  </div>
                </div>
              )}
              <div className="description-container">
                <div className="title">
                  <h2 className="tittle_underline">Description</h2>
                </div>
                <div className="main-content">
                  <div
                    className="screenshot"
                    style={{
                      backgroundImage: `url('http://localhost:3000/images/${game.id}/${game.photos?.filter((photo) => photo.type === "descriptionPhoto")[0].photo}')`,
                    }}
                  />
                  <h3 className="heading-h3">Welcome to the {game.name}</h3>
                  <p className="text-paragraph">{game.description}</p>
                  <div
                    className="screenshot"
                    style={{
                      backgroundImage: `url('http://localhost:3000/images/${game.id}/${game.photos?.filter((photo) => photo.type === "descriptionPhoto")[1].photo}')`,
                    }}
                  />
                </div>
                <div className="system-requirements">
                  <div className="title tittle--no-margin">
                    <h2 className="tittle_underline">System requirements</h2>
                    <div className="tittle_additional-options">
                      {tabs.map((tab) => {
                        const isActive = activeTab === tab.key;
                        return (
                          <button
                            key={tab.key}
                            className={`tab-button ${isActive ? "active" : ""}`}
                            onClick={() => setActiveTab(tab.key)}
                          >
                            {tab.key == 'windows' ? <IoLogoWindows/> : tab.key == 'mac' ? <IoLogoApple/> : <IoLogoTux/>}
                            {isActive && <div className="tab-underline" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="tab-content">
                    {renderRequirements(
                      `${
                        tabs.find((t) => t.key === activeTab).label
                      } system requirements:`,
                      requirements
                    )}
                  </div>
                </div>
              </div>
              <div className="details-container">
                <div className="sys-container">
                  <div className="section">
                    <div className="title">
                      <h2 className="tittle_underline">
                        Why buy on MINECRAFT.COM?
                      </h2>
                    </div>
                    <div className="line-item">
                      <img
                        src="https://c.animaapp.com/mc9k4dqfyNQzAE/img/component-1-32.svg"
                        alt=""
                      />
                      <span className="bold-text">DRM FREE</span>
                      <span>
                        , No activation or online connection required to play.
                      </span>
                    </div>
                    <div className="line-item">
                      <img
                        src="https://c.animaapp.com/mc9k4dqfyNQzAE/img/component-1-9.svg"
                        alt=""
                      />
                      <span className="bold-text underline-text">
                        Safety and satisfaction
                      </span>
                      <span>
                        . Stellar support 24/7 and full refunds up to 30 days.
                      </span>
                    </div>
                  </div>

                  <div className="section">
                    <div className="title">
                      <h2 className="tittle_underline">Time to beat</h2>
                    </div>
                    <div className="cards-grid">
                      <div className="card">
                        <img
                          className="card-icon"
                          src="https://c.animaapp.com/mc9k4dqfyNQzAE/img/component-1-35.svg"
                          alt=""
                        />
                        <div className="card-content">
                          <div className="card-hours">
                            {game.timeToBeats[0].value || "N/A"}
                          </div>
                          <div className="card-type">Main</div>
                        </div>
                      </div>
                      <div className="card">
                        <img
                          className="card-icon"
                          src="https://c.animaapp.com/mc9k4dqfyNQzAE/img/component-1-17.svg "
                          alt=""
                        />
                        <div className="card-content">
                          <div className="card-hours">
                            {game.timeToBeats[1].value || "N/A"}
                          </div>
                          <div className="card-type">Main + Sides</div>
                        </div>
                      </div>
                      <div className="card">
                        <img
                          className="card-icon"
                          src="https://c.animaapp.com/mc9k4dqfyNQzAE/img/component-1-25.svg"
                          alt=""
                        />
                        <div className="card-content">
                          <div className="card-hours">
                            {game.timeToBeats[2].value || "N/A"}
                          </div>
                          <div className="card-type">Completionist</div>
                        </div>
                      </div>
                      <div className="card">
                        <img
                          className="card-icon"
                          src="https://c.animaapp.com/mc9k4dqfyNQzAE/img/component-1-7.svg"
                          alt=""
                        />
                        <div className="card-content">
                          <div className="card-hours">
                            {game.timeToBeats[3].value || "N/A"}
                          </div>
                          <div className="card-type">All Styles</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      Game length provided by{" "}
                      <span className="underline-text">HowLongToBeat</span>
                    </div>
                  </div>

                  <div className="section">
                    <div className="title tittle--no-margin">
                      <h2 className="tittle_underline">Game details</h2>
                    </div>

                    <div className="detail-row first-row">
                      <div className="detail-label">Genre:</div>
                      <div className="detail-value">
                        {game.genres?.map((genre, i) => (
                          <span key={genre.id}>
                            <span className="underline-text">{genre.name}</span>
                            {i < game.genres.length - 1 && " - "}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="detail-row">
                      <div className="detail-label">Tags:</div>
                      <div className="detail-value">
                        {game.tags?.map((tag, i) => (
                          <span key={tag.id}>
                            <span className="underline-text">{tag.name}</span>
                            {i < game.tags.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="detail-row">
                      <div className="detail-label">Works on:</div>
                      <div className="detail-value">
                        {game.workOn}
                      </div>
                    </div>

                    <div className="detail-row">
                      <div className="detail-label">Release date:</div>
                      <div className="detail-value">
                        {new Date(game.releaseDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </div>

                    <div className="detail-row">
                      <div className="detail-label">Company:</div>
                      <div className="detail-value">
                        <span className="underline-text">{game.company?.name}</span> /{" "}
                        <span className="underline-text">{game.publisher?.name}</span>
                      </div>
                    </div>

                    <div className="detail-row">
                      <div className="detail-label">Size:</div>
                      <div className="detail-value">{requirements?.find(item => item.label === "Storage:")?.value.replace(" available space", "") || "N/A"}</div>
                    </div>

                    <div className="detail-row">
                      <div className="detail-label">Links:</div>
                      <div className="detail-value">
                        <span className="underline-text">Forum discussion</span>
                      </div>
                    </div>

                    <div className="separator" />

                    <div className="detail-row">
                      <div className="detail-label">Game features</div>
                      <div className="detail-value">
                        {game.gameFeatures.map((feature, i) => (
                          <div key={i} className="feature-row">
                            <img
                              className="feature-icon"
                              src="https://c.animaapp.com/mc9k4dqfyNQzAE/img/component-1-18.svg"
                              alt=""
                            />
                            <span>{feature.name}</span>
                            <img
                              className="arrow-icon"
                              src="https://c.animaapp.com/mc9k4dqfyNQzAE/img/component-1-19.svg"
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="separator" />

                    <div className="detail-row">
                      <div className="detail-label">Languages</div>
                      <div className="detail-value">
                        {game.languages?.map((lang, i) => (
                          <div key={i} className="language-row">
                            <div className="lang-name">{lang.language}</div>
                            <div className="lang-icon">
                              <img
                                src={
                                  lang.audio
                                    ? "https://c.animaapp.com/mc9k4dqfyNQzAE/img/component-1-1.svg"
                                    : "https://c.animaapp.com/mc9k4dqfyNQzAE/img/component-1.svg"
                                }
                                alt="audio"
                                className={lang.audio ? "" : "icon-opacity"}
                              />
                              <span>audio</span>
                            </div>
                            <div className="lang-text">
                              <img
                                src={
                                  lang.text
                                    ? "https://c.animaapp.com/mc9k4dqfyNQzAE/img/component-1-1.svg"
                                    : "https://c.animaapp.com/mc9k4dqfyNQzAE/img/component-1.svg"
                                }
                                alt="text"
                                className={lang.text ? "" : "icon-opacity"}
                              />
                              <span>text</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="section">
                    <div className="title">
                      <h2 className="tittle_underline">Goodies</h2>
                    </div>
                    <div className="goodies-list">
                      {game.goodies.map((goodie, i) => (
                        <div key={i} className="goodie-item">
                          <img
                            src="https://c.animaapp.com/mc9k4dqfyNQzAE/img/component-1-11.svg"
                            alt={goodie.text}
                          />
                          <span>{goodie.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
      <Buy isOpen={isBuyModalOpen} onClose={() => setIsBuyModalOpen(false)} game={game} />
      <Rodape />
    </>
  );
}

export default Games;
