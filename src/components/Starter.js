export default function Starter({handleInput, handleStart}) {
  return (
    <div className="starter-wrapper">
      <h2 className="starter--heading">Quizzical</h2>
      <p className="starter--description">
        This is a very helpful quiz that will help you with concentration, identify gaps in knowledge, build confidence and help you retain information.
        <br/> What's more - It's fun!
      </p>

      <div className="input-cotainer">
        <input type="number" onChange={handleInput} className = "input" min = '1' max = '100' placeholder="Enter Number of Question"/>

      <select onChange={handleInput} className = "input" >
        <option  disabled>Difficulty Level</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      </div>
      

      <button className="start-btn" onClick={handleStart}>
        Start quiz
      </button>
    </div>
  );
}
