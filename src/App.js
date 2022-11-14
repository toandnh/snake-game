import logo from './logo.svg'
import './App.css'

import ScoreBoard from './snake-game/score-board/scoreBoard'
import GameBoard from './snake-game/game-board/gameBoard'

function App() {
  return (
    <div className="App">
      <ScoreBoard />
      <GameBoard />
    </div>
  )
}

export default App;
