import React, { createContext, useState, ReactNode, useRef, useEffect } from "react";

interface GameContextProps {

    // GAME STATES
    gameState: GameStates;
    setGameState: React.Dispatch<React.SetStateAction<GameStates>>;

    scoreNumber: number;
    setScoreNumber: React.Dispatch<React.SetStateAction<number>>;

    gameSpeedRef: any;

    gameSpeedMeter: number;
    setGameSpeedMeter: React.Dispatch<React.SetStateAction<number>>;

    avgMoleLifeTimeMultiplier: number;
    setAvgMoleLifeTimeMultiplier: React.Dispatch<React.SetStateAction<number>>;


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

    // MOLE SPAWN ACCELERATION
    avgMoleLifeTimeReducer: number;
    setAvgMoleLifeTimeReducer: React.Dispatch<React.SetStateAction<number>>;

    hasSpeedCap: boolean;
    setHasSpeedCap: React.Dispatch<React.SetStateAction<boolean>>;

    gameSpeedCap: number;
    setGameSpeedCap: React.Dispatch<React.SetStateAction<number>>;
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

export const defaultValue = {
    gameState: GameStates.READY,
    setGameState: () => { },

    scoreNumber: 0,
    setScoreNumber: () => { },

    gameSpeedRef: 0,

    gameSpeedMeter: 0,
    setGameSpeedMeter: () => { },

    // MOLE BEHAVIOUR TIMINGS
    moleRiseTime: 400,
    setMoleRiseTime: () => { },

    moleUpTime: 1200,
    setMoleUpTime: () => { },

    moleHideTime: 400,
    setMoleHideTime: () => { },

    nextMoleMinTime: 2000,
    setNextMoleMinTime: () => { },

    nextMoleMaxTime: 3000,
    setNextMoleMaxTime: () => { },

    // MOLE COUNT INCREASE
    maxNumOfMoles: 3,
    setMaxNumOfMoles: () => { },

    currentNumOfMoles: 1,
    setCurrentNumOfMoles: () => { },

    moleIncreaseStrategy: MoleIncreaseStrategies.TIME, // TIME or SCORE
    setMoleIncreaseStrategy: () => { },

    moleIncreaseByTimeInterval: 30000, // 30 seconds
    setMoleIncreaseByTimeInterval: () => { },

    moleIncreaseByScoreInterval: 300, // 300 points
    setMoleIncreaseByScoreInterval: () => { },

    // MOLE SPAWN ACCELERATION
    avgMoleLifeTimeReducer: 1,
    setAvgMoleLifeTimeReducer: () => { },

    avgMoleLifeTimeMultiplier: 1,
    setAvgMoleLifeTimeMultiplier: () => { },

    hasSpeedCap: false,
    setHasSpeedCap: () => { },

    gameSpeedCap: 50,
    setGameSpeedCap: () => { },
};

const GameContext = createContext<GameContextProps>(defaultValue);

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {


    // MOLE BEHAVIOUR TIMINGS
    const [moleRiseTime, setMoleRiseTime] = useState<number>(defaultValue.moleRiseTime);
    const [moleUpTime, setMoleUpTime] = useState<number>(defaultValue.moleUpTime);
    const [moleHideTime, setMoleHideTime] = useState<number>(defaultValue.moleHideTime);

    const [nextMoleMinTime, setNextMoleMinTime] = useState<number>(defaultValue.nextMoleMinTime);
    const [nextMoleMaxTime, setNextMoleMaxTime] = useState<number>(defaultValue.nextMoleMaxTime);

    // MOLE COUNT INCREASE
    const [maxNumOfMoles, setMaxNumOfMoles] = useState<number>(defaultValue.maxNumOfMoles);
    const [currentNumOfMoles, setCurrentNumOfMoles] = useState<number>(defaultValue.currentNumOfMoles);
    const [moleIncreaseStrategy, setMoleIncreaseStrategy] = useState<MoleIncreaseStrategies>(defaultValue.moleIncreaseStrategy);
    const [moleIncreaseByTimeInterval, setMoleIncreaseByTimeInterval] = useState<number>(defaultValue.moleIncreaseByTimeInterval);
    const [moleIncreaseByScoreInterval, setMoleIncreaseByScoreInterval] = useState<number>(defaultValue.moleIncreaseByScoreInterval);

    // MOLE SPAWN ACCELERATION
    const [hasSpeedCap, setHasSpeedCap] = useState<boolean>(defaultValue.hasSpeedCap);
    const [gameSpeedCap, setGameSpeedCap] = useState<number>(defaultValue.gameSpeedCap);
    
    
    // GAME CONTEXT VALUES
    const [gameState, setGameState] = useState<GameStates>(defaultValue.gameState);
    const [scoreNumber, setScoreNumber] = useState<number>(defaultValue.scoreNumber);
    
    // GAME SPEED
    const oneMinute = 60000; // ms
    const [gameSpeedMeter, setGameSpeedMeter] = useState<number>(defaultValue.gameSpeedMeter);
    const [avgMoleLifeTimeReducer, setAvgMoleLifeTimeReducer] = useState<number>(defaultValue.avgMoleLifeTimeReducer);
    const [avgMoleLifeTimeMultiplier, setAvgMoleLifeTimeMultiplier] = useState<number>(defaultValue.avgMoleLifeTimeMultiplier);

    // Calculate initial game speed
    const gameSpeedRef = useRef<number>(defaultValue.gameSpeedRef);

    // Continuously calculate game speed
    useEffect(() => {
        const avgMoleLifeTime = moleRiseTime + moleUpTime + moleHideTime + nextMoleMinTime + ((nextMoleMaxTime - nextMoleMinTime) / 2);
        gameSpeedRef.current = parseFloat((oneMinute / (avgMoleLifeTime * avgMoleLifeTimeMultiplier)).toFixed(2));
        setGameSpeedMeter(gameSpeedRef.current);
    }, [
        moleRiseTime,
        moleUpTime,
        moleHideTime,
        nextMoleMinTime,
        nextMoleMaxTime,
        currentNumOfMoles,
        avgMoleLifeTimeReducer,
        avgMoleLifeTimeMultiplier,
    ]);


    const value = {
        // game states
        gameState,
        setGameState,

        // game score
        scoreNumber,
        setScoreNumber,

        // game speed
        gameSpeedRef,

        gameSpeedMeter,
        setGameSpeedMeter,

        avgMoleLifeTimeMultiplier,
        setAvgMoleLifeTimeMultiplier,

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

        // MOLE SPAWN ACCELERATION
        avgMoleLifeTimeReducer,
        setAvgMoleLifeTimeReducer,

        hasSpeedCap,
        setHasSpeedCap,

        gameSpeedCap,
        setGameSpeedCap,
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export { GameProvider, GameContext, GameStates, MoleIncreaseStrategies };