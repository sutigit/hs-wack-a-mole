import React, { createContext, useState, ReactNode, useRef } from "react";

interface GameContextProps {
    gameState: GameStates;
    setGameState: React.Dispatch<React.SetStateAction<GameStates>>;

    scoreNumber: number;
    setScoreNumber: React.Dispatch<React.SetStateAction<number>>;

    moleSWI: any;
    moleLCT: any;

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

    // mole spawn window interval time should be higher than mole life cycle timse
    // mole spawn window interval time
    moleSWI: 3000,

    // mole life cycle time
    moleLCT: 2500,


    // NEW SPAWN SYSTEM
    moleRiseTime: 100,
    setMoleRiseTime: () => {},

    moleUpTime: 1000,
    setMoleUpTime: () => {},

    moleHideTime: 100,
    setMoleHideTime: () => {},

    nextMoleMinTime: 1000,
    setNextMoleMinTime: () => {},

    nextMoleMaxTime: 2000,
    setNextMoleMaxTime: () => {},
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

    // NEW SPAWN SYSTEM
    const [moleRiseTime, setMoleRiseTime] = useState(100);
    const [moleUpTime, setMoleUpTime] = useState(1000);
    const [moleHideTime, setMoleHideTime] = useState(100);

    const [nextMoleMinTime, setNextMoleMinTime] = useState(1000);
    const [nextMoleMaxTime, setNextMoleMaxTime] = useState(2000);

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