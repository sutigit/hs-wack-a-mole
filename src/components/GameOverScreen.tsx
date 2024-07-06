import React, { useContext } from 'react'

// Context
import { GameContext, GameStates } from '../contexts/GameContext'

export default function GameOverScreen() {

    const { gameState, setGameState, scoreNumber } = useContext(GameContext)

    return gameState === GameStates.OVER && (
        <div style={GameOverStyle}>
            <h1>Game Over</h1>
            <h2 style={ScoreStyle}>Your score: {scoreNumber}</h2>
            <button onClick={() => setGameState(GameStates.STARTED)} style={RestartButton}>Restart</button>
        </div>
    )
}

const GameOverStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#E9EAEE",
    fontSize: "2rem",
    fontWeight: "bold",
}

const ScoreStyle: React.CSSProperties = {
    fontSize: "1.6rem",
    fontWeight: "medium",
    marginBottom: "40px",
}

const RestartButton: React.CSSProperties = {
    padding: "10px 20px",
    backgroundColor: "#06114F",
    color: "#FFFFFF",
    border: "none",
    cursor: "pointer",
    fontSize: "1.5rem",
    fontWeight: "medium",
}
