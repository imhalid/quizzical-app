import { useState, useEffect } from "react";

function App() {
  const url = "https://opentdb.com/api.php?amount=10&category=31&type=boolean";

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const fetchQuestions = async () => {
    setIsLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setQuestions(data.results);
    setIsLoading(false);
  };

  const nextQuestion = () => {
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion === questions.length) {
      setIsGameOver(true);
    } else {
      setCurrentQuestion(nextQuestion);
    }
  };

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    nextQuestion();
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isGameOver) {
    return (
      <div className="App">
        <h1>Game Over</h1>
        <p>Your score is {score}</p>
        <button onClick={fetchQuestions}>Play Again</button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  if (!question) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <h1>React Quiz</h1>
      <p>Score: {score}</p>
      <p>{question.question}</p>
      <button onClick={() => handleAnswer("True")}>True</button>
      <button onClick={() => handleAnswer("False")}>False</button>
    </div>
  );
}
export default App;
