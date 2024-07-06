import React, { useContext } from 'react'

// Context
import { GameContext, GameStates } from '../contexts/GameContext'

export default function StartScreen() {

    const { gameState, setGameState } = useContext(GameContext)

    return gameState === GameStates.READY && (
        <div style={StartMenuStyle}>
            <p style={{fontSize: '1rem', fontWeight: 'bold'}}>Tre Buche presents</p>
            <p style={{fontSize: '3rem', fontWeight: 'bold'}}>Wack-a-mole</p>
            <button onClick={() => setGameState(GameStates.STARTED)} style={StartButton}>Start</button>
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
