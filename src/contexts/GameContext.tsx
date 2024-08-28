import React, { createContext, useState, ReactNode, useRef } from "react";

interface GameContextProps {
    gameState: GameStates;
    setGameState: React.Dispatch<React.SetStateAction<GameStates>>;

    scoreNumber: number;
    setScoreNumber: React.Dispatch<React.SetStateAction<number>>;


    // MOLE BEHAVIOUR TIMINGS
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

    // MOLE COUNT INCREASE
    maxNumOfMoles: number;
    setMaxNumOfMoles: React.Dispatch<React.SetStateAction<number>>;

    moleIncreaseStrategy: MoleIncreaseStrategies
    setMoleIncreaseStrategy: React.Dispatch<React.SetStateAction<MoleIncreaseStrategies>>;

    moleIncreaseTimeInterval: number;
    setMoleIncreaseTimeInterval: React.Dispatch<React.SetStateAction<number>>;

    moleIncreaseScoreInterval: number;
    setMoleIncreaseScoreInterval: React.Dispatch<React.SetStateAction<number>>;
}

enum GameStates {
    READY = "READY",
    STARTED = "STARTED",
    OVER = "OVER",
}

enum MoleIncreaseStrategies {
    TIME = "TIME",
    SCORE = "SCORE",
}

const defaultValue = {
    gameState: GameStates.READY,
    setGameState: () => {},

    scoreNumber: 0,
    setScoreNumber: () => {},


    // MOLE BEHAVIOUR TIMINGS
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

    // MOLE COUNT INCREASE
    maxNumOfMoles: 1,
    setMaxNumOfMoles: () => {},

    moleIncreaseStrategy: MoleIncreaseStrategies.TIME, // TIME or SCORE
    setMoleIncreaseStrategy: () => {},

    moleIncreaseTimeInterval: 10000, // 10 seconds
    setMoleIncreaseTimeInterval: () => {},

    moleIncreaseScoreInterval: 300, // 300 points
    setMoleIncreaseScoreInterval: () => {},
};

const GameContext = createContext<GameContextProps>(defaultValue);

interface GameProviderProps {
    children: ReactNode;
}

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {


    
    const [gameState, setGameState] = useState(defaultValue.gameState);

    const [scoreNumber, setScoreNumber] = useState(defaultValue.scoreNumber);


    // MOLE BEHAVIOUR TIMINGS
    const [moleRiseTime, setMoleRiseTime] = useState(400);
    const [moleUpTime, setMoleUpTime] = useState(1200);
    const [moleHideTime, setMoleHideTime] = useState(400);

    const [nextMoleMinTime, setNextMoleMinTime] = useState(2000);
    const [nextMoleMaxTime, setNextMoleMaxTime] = useState(3000);

    // MOLE COUNT INCREASE
    const [maxNumOfMoles, setMaxNumOfMoles] = useState(1);
    const [moleIncreaseStrategy, setMoleIncreaseStrategy] = useState(MoleIncreaseStrategies.TIME);
    const [moleIncreaseTimeInterval, setMoleIncreaseTimeInterval] = useState(10000);
    const [moleIncreaseScoreInterval, setMoleIncreaseScoreInterval] = useState(300);

    const value = {
        // game states
        gameState,
        setGameState,

        // game score
        scoreNumber,
        setScoreNumber,
        

        // MOLE BEHAVIOUR TIMINGS
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

        // MOLE COUNT INCREASE
        maxNumOfMoles,
        setMaxNumOfMoles,

        moleIncreaseStrategy,
        setMoleIncreaseStrategy,

        moleIncreaseTimeInterval,
        setMoleIncreaseTimeInterval,

        moleIncreaseScoreInterval,
        setMoleIncreaseScoreInterval,
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export { GameProvider, GameContext,  GameStates, MoleIncreaseStrategies};