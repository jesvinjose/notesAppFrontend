import React, { useState, useEffect } from "react";
import "./Card.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function Card(props) {

  let data=props.data;
  let handleDelete=props.handleDelete;
  
  useEffect(() => {
    const calculateHeights = () => {
      const cards = document.querySelectorAll(".card");
      cards.forEach(card => {
        const height = card.querySelector(".content").offsetHeight;
        card.style.height = `${height}px`;
      });
    };

    calculateHeights();
    window.addEventListener("resize", calculateHeights);

    return () => {
      window.removeEventListener("resize", calculateHeights);
    };
  }, [data]);
  console.log(data,"in card");



  return (
    <div className="outer">
      {data.map((element, index) => (
        <div className="card" key={index}>
          <div className="content">
            <h1 className="heading">{element.sentence}</h1>
            <h5 className="date">{element.createdAt}</h5>
            <button className="delete-btn" onClick={() => handleDelete(element.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
