import React, { createContext, useState, ReactNode, useRef } from "react";

interface GameContextProps {
    gameState: GameStates;
    setGameState: React.Dispatch<React.SetStateAction<GameStates>>;

    scoreNumber: number;
    setScoreNumber: React.Dispatch<React.SetStateAction<number>>;


    // NEW SPAWN SYSTEM
    moleRiseTime: number;
    setMoleRiseTime: React.Dispatch<React.SetStateAction<number>>;

    moleUpTime: number;
    setMoleUpTime: React.Dispatch<React.SetStateAction<number>>;

    moleHideTime: number;
    setMoleHideTime: React.Dispatch<React.SetStateAction<number>>;

    nextMoleMinTime: number;
    setNextMoleMinTime: React.Dispatch<React.SetStateAction<number>>;

    nextMoleMaxTime: number;
    setNextMoleMaxTime: React.Dispatch<React.SetStateAction<number>>;
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



    // NEW SPAWN SYSTEM
    moleRiseTime: 400,
    setMoleRiseTime: () => {},

    moleUpTime: 1200,
    setMoleUpTime: () => {},

    moleHideTime: 400,
    setMoleHideTime: () => {},

    nextMoleMinTime: 2000,
    setNextMoleMinTime: () => {},

    nextMoleMaxTime: 3000,
    setNextMoleMaxTime: () => {},
};

const GameContext = createContext<GameContextProps>(defaultValue);

interface GameProviderProps {
    children: ReactNode;
}

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {


    
    const [gameState, setGameState] = useState(defaultValue.gameState);

    const [scoreNumber, setScoreNumber] = useState(defaultValue.scoreNumber);


    // NEW SPAWN SYSTEM
    const [moleRiseTime, setMoleRiseTime] = useState(400);
    const [moleUpTime, setMoleUpTime] = useState(1200);
    const [moleHideTime, setMoleHideTime] = useState(400);

    const [nextMoleMinTime, setNextMoleMinTime] = useState(2000);
    const [nextMoleMaxTime, setNextMoleMaxTime] = useState(3000);

    const value = {
        // game states
        gameState,
        setGameState,

        // game score
        scoreNumber,
        setScoreNumber,
        

        // NEW SPAWN SYSTEM
        moleRiseTime,
        setMoleRiseTime,

        moleUpTime,
        setMoleUpTime,

        moleHideTime,
        setMoleHideTime,

        nextMoleMinTime,
        setNextMoleMinTime,

        nextMoleMaxTime,
        setNextMoleMaxTime,
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export { GameProvider, GameContext,  GameStates};