import React, { useContext } from 'react'

// Context
import { GameContext } from '../contexts/GameContext'

export default function StartScreen() {

    const { gameStarted, setGameStarted } = useContext(GameContext)

    return !gameStarted && (
        <div style={StartMenuStyle}>
            <h1>Wack-a-mole</h1>
            <button onClick={() => setGameStarted(true)} style={StartButton}>Start</button>
        </div>
    )
}

const StartMenuStyle: React.CSSProperties = {
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
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    fontSize: "2rem",
    fontWeight: "bold",
}

const StartButton: React.CSSProperties = {
    padding: "10px 20px",
    backgroundColor: "#06114F",
    color: "#FFFFFF",
    border: "none",
    cursor: "pointer",
    fontSize: "1.5rem",
    fontWeight: "medium",
}
