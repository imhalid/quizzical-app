import { nanoid } from "nanoid";
import React from "react";

export default function Quiz(props) {
  // console.log(props);
  // console.log(props);
  // console.log(answerElement)

  const answerElement = props.answers.map((answer) => {
    const stylesBeforeCheck = answer.isSelected ? "#D6DBF5" : "#f5f7fb";
    const stylesAfterCheck = answer.isSelected ? "#F8BCBC" : "#f5f7fb";

    const styles = {
      backgroundColor: props.select ? stylesAfterCheck : stylesBeforeCheck,
    };
    return (
      <button
        type="button"
        key={nanoid()}
        id={answer.id}
        answer={answer.answer}
        className="choice"
        onClick={props.select}
        style={styles}
        // style={{ backgroundColor: isSelected ? "blue" : "transparent" }}
      >
        {answer.answer}
      </button>
    );
  });
  // console.log(answerElement);
  function finishGame() {
    props.setIsFinished(true);
  }

  // function select(event) {
  //   console.log("clicked");
  //   for (let i = 0; i < answerElement.length; i++) {
  //     const currentId = answerElement[i];

  //     if (answerElement.id === currentId) {
  //       setIsSelected((prev) => !prev);
  //     } else {
  //       setIsSelected(false);
  //     }
  //     //   console.log(currentId);
  //   }
  // }

  // function getColor(){
  //   answerElement.map(answer => (
  //  const className =
  //       backgroundColor: answer.isSelected ?  "blue" : "transparent"

  //   ))
  // }
  return (
    <div className="quizEL">
      <p className="question">{props.question}</p>
      <div className="choiceEl">{answerElement}</div>
    </div>
  );
}
