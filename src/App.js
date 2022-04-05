// https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple

//import axios from "axios";
import { useEffect, useState } from "react";
import Questions from "./componenets/Questions";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple"
    );
    const data = await response.json();

    const transformedData = data.results.map((quest) => {
      return {
        quest: quest.question,
        answers: [quest.correct_answer, ...quest.incorrect_answers],
        correct: quest.correct_answer,
      };
    });
    setQuestions(transformedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(questions);
  /*
  useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple"
      )
      .then((res) => {
        setQuestions(
          res.data.results.map((item) => ({
            question: item.question,
            options: shuffle([...item.incorrect_answers, item.correct_answer]),
            answer: item.correct_answer,
          }))
        );
      })
      .catch((err) => console.error(err));
  }, []);
*/

  return (
    <div>
      test
      <button onClick={fetchData}>test</button>
      <Questions quests={questions} />
    </div>
  );
};

export default App;
