import React from "react";

export default function Start(props) {
  return (
    <div className="start-main">
      <h1> Quizzical</h1>
      <p className="description"> A fun quiz game to test your knowledge </p>
      <button className="startBtn" onClick={props.start}>
        start
      </button>
    </div>
  );
}
