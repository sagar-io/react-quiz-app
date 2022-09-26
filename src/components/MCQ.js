import React from 'react'

function htmlEntityHandler(str) {
  const htmlEntities = {
    "&#039;": "'",
    "&quot;": '"',
    '&rsquo;': '’'
  };
  return str.replace(/&#?\w+;/g, (value) => htmlEntities[value]);
}

export default function MCQ({ question, mcqNumber, handleOptionSelection, options, correct_answer, userAnswer, gameOver }) {
  return (
    <div className="mcq">
      <h3 className="question">{htmlEntityHandler(question)}</h3>

      <ul className="option-container">
        {options.map((option, optionNumber) => {
        
        return <li 
        onClick={(e) => handleOptionSelection(e,mcqNumber)}
         className= {gameOver ?  ((htmlEntityHandler(option) == htmlEntityHandler(correct_answer)) ? 'green option disable' : ((htmlEntityHandler(option) == userAnswer[mcqNumber]) ? 'red fade option disable' : 'fade option disable')): userAnswer[mcqNumber] === htmlEntityHandler(option) ?  'gray option' : 'option'}
          key = {optionNumber}> 
             {htmlEntityHandler(option)}
        </li>

})}
      </ul>
    </div>
  );
}
