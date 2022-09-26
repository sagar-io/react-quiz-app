import React from "react";
import Starter from "./components/Starter";
import MCQ from "./components/MCQ";
import Loader from "./components/Loader";
import "./style.css";
import { nanoid } from "nanoid";
import mcqData from './mcqData'

export default function App() {
  const [isStartQuiz, setIsStartQuiz] = React.useState(false);
  const [mcqs, setMcqs] = React.useState([]);
  const [userAnswer, setUserAnswer] = React.useState(['', '', '']);
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [fetchNewQuestion, setFetchNewQuestion] = React.useState(false);
  const [numOfQues, setNumOfQues] = React.useState(5);
  const [difficultyLevel, setDificultyLevel] = React.useState('medium');
  const [loader, setLoader] = React.useState(false);

  
  // To Get the MCQ data from another file which is using an API
  React.useEffect(() => {
    async function getMcqs() {
       setMcqs(await mcqData(numOfQues, difficultyLevel))
          setLoader(false) 
    }
    getMcqs();
  }, [fetchNewQuestion])


  function startQuiz() {
    setIsStartQuiz(true);
    setFetchNewQuestion(prevState => !prevState);
    setLoader(true);
  }

  function handleInput(e) {
    const input = e.target;
    if(input.type == 'number'){
      setNumOfQues(input.value)
    }else{
      setDificultyLevel(input.value.toLowerCase());
    }
  }

  function handlePlayAgain() {
    setScore(0);
    setUserAnswer(['', '', ''])
    setFetchNewQuestion(prevScore => !prevScore);
    setGameOver(prevState => !prevState);
  }

  function handleOptionSelection(e, id) {
     setUserAnswer(oldArr => {
        const newArr = [...oldArr]
        newArr[id] = e.target.innerHTML
        return newArr;
     })
  }

  function handleCheckAnswers() {
    setGameOver(true);
     userAnswer.forEach((option, val) => {
      if(option === mcqs[val].correct_ans)
        setScore((oldScore) => oldScore + 1)
      } )
  }

  const mcqElements = mcqs.map((mcq, mcqNumber) => (
     <MCQ
        options={mcq.options}
        question={mcq.question}
        correct_answer = {mcq.correct_ans}
        key={nanoid()}
        mcqNumber= {mcqNumber}
        userAnswer = {userAnswer}
        handleOptionSelection = {handleOptionSelection}
        gameOver = {gameOver}
      />
  )
  );

  return (
    <main>
        {loader && <Loader />}

      {
       !isStartQuiz ? (
        <Starter handleStart={startQuiz}
                 handleInput = {handleInput}/>
      ) 
      : 
      (
        <div className="mcq-container">
            {mcqElements}          
          

          <div className="score-card">
            {gameOver ? ( 
              <><p className="score-details">
                You scored {score}/{numOfQues} correct answeers
              </p>
              <button onClick={handlePlayAgain} className="check-btn">
                Play again
              </button>
              </>
            
            ) : (
              <button onClick={handleCheckAnswers} className="check-btn">
              Check answers
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
