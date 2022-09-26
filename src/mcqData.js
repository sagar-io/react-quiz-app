export default async function mcqData(numOfQues, difficultyLevel) {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${numOfQues}&category=9&difficulty=${difficultyLevel}&type=multiple`
  )
  const data = await response.json()

  const mcqs = data.results.map(obj => {
    return {
      question: obj.question,
      options: shuffleArr(obj.incorrect_answers, obj.correct_answer),
      correct_ans: obj.correct_answer
    }
  })
  return mcqs;
}

function shuffleArr(arr, item) {
  const containerArr = [...arr, item];
  return containerArr.sort(() => Math.random() > 0.5 ? -1 : 1)
}

