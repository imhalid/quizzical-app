import React from "react";

export default function Footer(props) {
  return (
    <main>
      <div className="footerEl">
        <p className="score"> {props.score} </p>
        <button className="play-again-btn" onClick={props.checkAnswers}>
          {props.button}
        </button>
      </div>
    </main>
  );
}
