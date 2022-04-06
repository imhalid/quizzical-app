import "./styles.css";
import { nanoid } from "nanoid";
import React from "react";
import Start from "./componenets/Start";
import Quiz from "./componenets/Quiz";
import Footer from "./componenets/Footer";

export default function App() {
  const [startGame, setStartGame] = React.useState();
  const [quiz, setQuiz] = React.useState([]);
  const [isFinished, setIsFinished] = React.useState(false);
  const [checking, setChecking] = React.useState();
  const [button, setButton] = React.useState();
  const [score, setScore] = React.useState();

  // const [isSelected, setIsSelected] = React.useState(false);

  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=29&difficulty=easy&type=multiple"
    )
      .then((resp) => resp.json())
      .then((data) => {
        const quizArray = [];
        data.results.map((item) => {
          const question = item.question;
          const correctAnswer = {
            answer: item.correct_answer,
            isSelected: false,
            isCorrect: true,
            id: nanoid(),
          };

          const incorrectAnswers = item.incorrect_answers.map((item) => {
            return {
              answer: item,
              isSelected: false,
              isCorrect: false,
              id: nanoid(),
            };
          });
          const allAnswers = incorrectAnswers.concat(correctAnswer);
          // console.log(allAnswers);
          // const quizArray = []]

          quizArray.push({
            ...item,
            answers: allAnswers,
          });
          return quizArray;
        });
        // console.log(quizArray);
        setQuiz(quizArray);
      });
  }, []);

  const allQuizData = quiz.map((item) => {
    return (
      <Quiz
        key={nanoid()}
        question={item.question}
        answers={item.answers}
        results={finishGame}
        select={select}
        id={nanoid()}

        // select={select)
        // checkAnswers={checkAnswers}
      />
    );
  });
  // console.log(allQuizData);
  function generateQuiz() {
    setButton("Check Score");
    setScore("Score");
    setChecking(false);
    setIsFinished(false);
    setQuiz(allQuizData);
  }

  function select(id) {
    const answersArray = quiz.map((item) => item.answers);
    console.log(answersArray);
    answersArray.map((item) => {
      console.log(item);

      // newArray.map((item) => {
      //   console.log(item);

      return item.id === id ? { ...item, isSelected: !item.isSelected } : item;
    });
    console.log("clicked");
  }

  function start() {
    setStartGame((prevStartGame) => {
      if (!startGame) {
        setStartGame(true);
        setScore("Score: ");
        setButton("Check Score");
        // generateQuiz();
      } else {
      }
    });
  }

  function checkAnswers() {
    if (isFinished) {
      generateQuiz();
    } else {
      setChecking(true);
      console.log("click");

      finishGame();
    }
  }

  function finishGame() {
    let results = 0;
    quiz.map((item) => {
      item.answers.map((answer) => {
        if (answer.isSelected && answer.isCorrect) {
          results++;
        }
      });
    });
    setIsFinished(true);
    setScore(`You scored ${results}/5 answers correct`);
    setButton("Play Again");
  }

  return (
    <main>
      <div>
        {!startGame ? (
          <Start start={start} />
        ) : (
          <div className="quizEl">
            {allQuizData}
            <Footer score={score} button={button} checkAnswers={checkAnswers} />
          </div>
        )}
      </div>
    </main>
  );
}
