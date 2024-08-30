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

    currentNumOfMoles: number;
    setCurrentNumOfMoles: React.Dispatch<React.SetStateAction<number>>;

    moleIncreaseStrategy: MoleIncreaseStrategies
    setMoleIncreaseStrategy: React.Dispatch<React.SetStateAction<MoleIncreaseStrategies>>;

    moleIncreaseByTimeInterval: number;
    setMoleIncreaseByTimeInterval: React.Dispatch<React.SetStateAction<number>>;

    moleIncreaseByScoreInterval: number;
    setMoleIncreaseByScoreInterval: React.Dispatch<React.SetStateAction<number>>;
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
    maxNumOfMoles: 3,
    setMaxNumOfMoles: () => {},

    currentNumOfMoles: 1,
    setCurrentNumOfMoles: () => {},

    moleIncreaseStrategy: MoleIncreaseStrategies.TIME, // TIME or SCORE
    setMoleIncreaseStrategy: () => {},

    moleIncreaseByTimeInterval: 30000, // 30 seconds
    setMoleIncreaseByTimeInterval: () => {},

    moleIncreaseByScoreInterval: 300, // 300 points
    setMoleIncreaseByScoreInterval: () => {},
};

const GameContext = createContext<GameContextProps>(defaultValue);

const GameProvider: React.FC<{children: ReactNode}> = ({ children }) => {


    
    const [gameState, setGameState] = useState<GameStates>(defaultValue.gameState);

    const [scoreNumber, setScoreNumber] = useState<number>(defaultValue.scoreNumber);


    // MOLE BEHAVIOUR TIMINGS
    const [moleRiseTime, setMoleRiseTime] = useState<number>(defaultValue.moleRiseTime);
    const [moleUpTime, setMoleUpTime] = useState<number>(defaultValue.moleUpTime);
    const [moleHideTime, setMoleHideTime] = useState<number>(defaultValue.moleHideTime);

    const [nextMoleMinTime, setNextMoleMinTime] = useState<number>(defaultValue.nextMoleMinTime);
    const [nextMoleMaxTime, setNextMoleMaxTime] = useState<number>(defaultValue.nextMoleMaxTime);

    // MOLE COUNT INCREASE
    const [maxNumOfMoles, setMaxNumOfMoles] = useState<number>(3);
    const [currentNumOfMoles, setCurrentNumOfMoles] = useState<number>(1);
    const [moleIncreaseStrategy, setMoleIncreaseStrategy] = useState<MoleIncreaseStrategies>(defaultValue.moleIncreaseStrategy);
    const [moleIncreaseByTimeInterval, setMoleIncreaseByTimeInterval] = useState<number>(defaultValue.moleIncreaseByTimeInterval);
    const [moleIncreaseByScoreInterval, setMoleIncreaseByScoreInterval] = useState<number>(defaultValue.moleIncreaseByScoreInterval);

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

        currentNumOfMoles,
        setCurrentNumOfMoles,

        moleIncreaseStrategy,
        setMoleIncreaseStrategy,

        moleIncreaseByTimeInterval,
        setMoleIncreaseByTimeInterval,

        moleIncreaseByScoreInterval,
        setMoleIncreaseByScoreInterval,
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export { GameProvider, GameContext,  GameStates, MoleIncreaseStrategies};