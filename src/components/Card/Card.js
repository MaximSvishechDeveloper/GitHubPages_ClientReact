import React from "react";
import "./Card.css";

const Card = ({ name, id, page, image }) => {
  const handleButtonClick = () => {
    window.location.href = page;
  };

  return (
    <div className="card tc dib br3 pa3 ma2 grow bw2 shadow-5">
      <img
        alt="profiles"
        src={image}
        style={{ width: "400px", height: "400px" }}
      />
      <div>
        <h2 className="dev-name">{name}</h2>
        <button className="github-link" onClick={handleButtonClick}>
          GitHub Page
        </button>
      </div>
    </div>
  );
};

export default Card;
