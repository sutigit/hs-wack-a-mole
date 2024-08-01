import React, { createContext, useState, ReactNode, useRef } from "react";

interface GameContextProps {
    gameState: GameStates;
    setGameState: React.Dispatch<React.SetStateAction<GameStates>>;

    scoreNumber: number;
    setScoreNumber: React.Dispatch<React.SetStateAction<number>>;

    moleSWI: any;
    moleLCT: any;
}

enum GameStates {
    READY = "READY",
    STARTED = "STARTED",
    OVER = "OVER",
}

const defaultValue = {
    gameState: GameStates.READY,
    setGameState: () => {},

    scoreNumber: 0,
    setScoreNumber: () => {},

    // mole spawn window interval time
    moleSWI: 3000,

    // mole life cycle time
    moleLCT: 2500,

    // mole spawn window interval time should be higher than mole life cycle timse
};

const GameContext = createContext<GameContextProps>(defaultValue);

interface GameProviderProps {
    children: ReactNode;
}

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {


    
    const [gameState, setGameState] = useState(defaultValue.gameState);

    const [scoreNumber, setScoreNumber] = useState(defaultValue.scoreNumber);

    const moleSWI = useRef(defaultValue.moleSWI);
    const moleLCT = useRef(defaultValue.moleLCT);

    const value = {
        // game states
        gameState,
        setGameState,

        // game score
        scoreNumber,
        setScoreNumber,
        
        // mole spawn window interval time
        moleSWI,

        // mole life cycle time
        moleLCT,
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export { GameProvider, GameContext,  GameStates};