import React, { createContext, useState, ReactNode, useRef } from "react";

interface GameContextProps {
    gameStarted: boolean;
    setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
    scoreNumber: number;
    setScoreNumber: React.Dispatch<React.SetStateAction<number>>;
    moleSWI: any;
    // setMoleSWI: React.Dispatch<React.SetStateAction<number>>;
    moleLCT: any;
    // setMoleLCT: React.Dispatch<React.SetStateAction<number>>;
}

const defaultValue = {
    gameStarted: false,
    setGameStarted: () => {},
    scoreNumber: 0,
    setScoreNumber: () => {},
    moleSWI: 4000,
    // setMoleSWI: () => {},
    moleLCT: 3500,
    // setMoleLCT: () => {},
};

const GameContext = createContext<GameContextProps>(defaultValue);

interface GameProviderProps {
    children: ReactNode;
}

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    
    const [gameStarted, setGameStarted] = useState(defaultValue.gameStarted);
    const [scoreNumber, setScoreNumber] = useState(defaultValue.scoreNumber);
    // const [moleSWI, setMoleSWI] = useState(defaultValue.moleSWI);
    // const [moleLCT, setMoleLCT] = useState(defaultValue.moleLCT);
    const moleSWI = useRef(defaultValue.moleSWI);
    const moleLCT = useRef(defaultValue.moleLCT);

    const value = {
        // game states
        gameStarted,
        setGameStarted,

        // game score
        scoreNumber,
        setScoreNumber,
        
        // mole spawn window interval time
        moleSWI: moleSWI,
        // setMoleSWI,

        // mole life cycle time
        moleLCT,
        // setMoleLCT

    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export { GameProvider, GameContext };