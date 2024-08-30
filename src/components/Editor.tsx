'use client';
import { useState, useContext, useEffect } from 'react';

// Context
import { GameContext, GameStates, MoleIncreaseStrategies, defaultValue } from '../contexts/GameContext'

export default function Page() {

    // GAME CONTEXT VALUES
    const {
        // GAME STATES
        setGameState,

        // GAME SPEED
        gameSpeedMeter,

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

        // MOLE COUNT
        maxNumOfMoles,
        setMaxNumOfMoles,

        moleIncreaseStrategy,
        setMoleIncreaseStrategy,

        moleIncreaseByTimeInterval,
        setMoleIncreaseByTimeInterval,

        moleIncreaseByScoreInterval,
        setMoleIncreaseByScoreInterval,

        // MOLE ACCELERATION
        avgMoleLifeTimeReducer,
        setAvgMoleLifeTimeReducer,

        hasSpeedCap,
        setHasSpeedCap,

        gameSpeedCap,
        setGameSpeedCap,
    } = useContext(GameContext)

    const resetEverything = () => {
        setGameState(GameStates.READY);
        setMoleRiseTime(defaultValue.moleRiseTime);
        setMoleUpTime(defaultValue.moleUpTime);
        setMoleHideTime(defaultValue.moleHideTime);
        setNextMoleMinTime(defaultValue.nextMoleMinTime);
        setNextMoleMaxTime(defaultValue.nextMoleMaxTime);
        setMaxNumOfMoles(defaultValue.maxNumOfMoles);
        setMoleIncreaseStrategy(defaultValue.moleIncreaseStrategy);
        setMoleIncreaseByTimeInterval(defaultValue.moleIncreaseByTimeInterval);
        setMoleIncreaseByScoreInterval(defaultValue.moleIncreaseByScoreInterval);
        setAvgMoleLifeTimeReducer(defaultValue.avgMoleLifeTimeReducer);
        setHasSpeedCap(defaultValue.hasSpeedCap);
        setGameSpeedCap(defaultValue.gameSpeedCap);

        // reset local storage
        localStorage.clear();
    }

    // MOLE BEHAVIOUR TIMINGS
    const handleMoleRiseTime = (e: any) => {
        setGameState(GameStates.READY);
        setMoleRiseTime(Number(e.target.value));
        localStorage.setItem('moleRiseTime', e.target.value);
    }

    const handleMoleUpTime = (e: any) => {
        setGameState(GameStates.READY);
        setMoleUpTime(Number(e.target.value));
        localStorage.setItem('moleUpTime', e.target.value);
    }

    const handleMoleHideTime = (e: any) => {
        setGameState(GameStates.READY);
        setMoleHideTime(Number(e.target.value));
        localStorage.setItem('moleHideTime', e.target.value);
    }

    const handleNextMoleMinTime = (e: any) => {
        setGameState(GameStates.READY);
        setNextMoleMinTime(Number(e.target.value));
        localStorage.setItem('nextMoleMinTime', e.target.value);
    }

    const handleNextMoleMaxTime = (e: any) => {
        setGameState(GameStates.READY);
        setNextMoleMaxTime(Number(e.target.value));
        localStorage.setItem('nextMoleMaxTime', e.target.value);
    }

    // MOLE COUNT INCREASE
    const handleMoleCount = (e: any) => {
        setGameState(GameStates.READY);
        setMaxNumOfMoles(Number(e.target.value));
        localStorage.setItem('maxNumOfMoles', e.target.value);
    }

    const handleMoleIncreaseStrategy = (strategy: MoleIncreaseStrategies) => {
        setGameState(GameStates.READY);
        setMoleIncreaseStrategy(strategy);
        localStorage.setItem('moleIncreaseStrategy', strategy);
    }

    const handleMoleIncreaseByTimeInterval = (e: any) => {
        setGameState(GameStates.READY);
        setMoleIncreaseByTimeInterval((Number(e.target.value)));
        localStorage.setItem('moleIncreaseByTimeInterval', e.target.value);
    }

    const handleMoleIncreaseByScoreInterval = (e: any) => {
        setGameState(GameStates.READY);
        setMoleIncreaseByScoreInterval(Number(e.target.value));
        localStorage.setItem('moleIncreaseByScoreInterval', e.target.value);
    }

    // MOLE ACCELERATION
    const handleAcceleration = (e: any) => {
        setGameState(GameStates.READY);
        setAvgMoleLifeTimeReducer(Number(e.target.value));
        localStorage.setItem('avgMoleLifeTimeReducer', e.target.value);
    }

    const handleHasSpeedCap = (e: any) => {
        setGameState(GameStates.READY);
        setHasSpeedCap(e.target.checked);
        localStorage.setItem('hasSpeedCap', e.target.checked);
    }

    const handleSpeedCap = (e: any) => {
        setGameState(GameStates.READY);
        setGameSpeedCap(Number(e.target.value));
        localStorage.setItem('gameSpeedCap', e.target.value);
    }

    // Read from local storage on start
    useEffect(() => {
        if (localStorage.getItem('moleRiseTime')) setMoleRiseTime(Number(localStorage.getItem('moleRiseTime')));
        if (localStorage.getItem('moleUpTime')) setMoleUpTime(Number(localStorage.getItem('moleUpTime')));
        if (localStorage.getItem('moleHideTime')) setMoleHideTime(Number(localStorage.getItem('moleHideTime')));
        if (localStorage.getItem('nextMoleMinTime')) setNextMoleMinTime(Number(localStorage.getItem('nextMoleMinTime')));
        if (localStorage.getItem('nextMoleMaxTime')) setNextMoleMaxTime(Number(localStorage.getItem('nextMoleMaxTime')));
        if (localStorage.getItem('maxNumOfMoles')) setMaxNumOfMoles(Number(localStorage.getItem('maxNumOfMoles')));
        if (localStorage.getItem('moleIncreaseStrategy')) setMoleIncreaseStrategy(localStorage.getItem('moleIncreaseStrategy') as MoleIncreaseStrategies);
        if (localStorage.getItem('moleIncreaseByTimeInterval')) setMoleIncreaseByTimeInterval(Number(localStorage.getItem('moleIncreaseByTimeInterval')));
        if (localStorage.getItem('moleIncreaseByScoreInterval')) setMoleIncreaseByScoreInterval(Number(localStorage.getItem('moleIncreaseByScoreInterval')));
        if (localStorage.getItem('avgMoleLifeTimeReducer')) setAvgMoleLifeTimeReducer(Number(localStorage.getItem('avgMoleLifeTimeReducer')));
        if (localStorage.getItem('hasSpeedCap')) setHasSpeedCap(Boolean(localStorage.getItem('hasSpeedCap')));
        if (localStorage.getItem('gameSpeedCap')) setGameSpeedCap(Number(localStorage.getItem('gameSpeedCap')));
        
    }, []);
    

    return (
        <div style={Container}>
            <button onClick={resetEverything} style={ResetButton}>Resetoi kaikki</button>

            {/* MOLE BEHAVIOUR TIMINGS -------------------------------------- */}
            <section style={SectionContainer}>
                <h2>Myyrien nopeus - lähtönopeudet muuttujille</h2>

                {/* MOLE RISE TIME */}
                <div style={InputContainer}>
                    <strong>Kauanko kestää nousta</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input
                            style={NumberStyle}
                            type="number"
                            name="riseSpeed"
                            step={1}
                            value={moleRiseTime}
                            onChange={handleMoleRiseTime}
                        />
                        <label htmlFor="riseSpeed">ms</label>
                    </div>
                </div>

                {/* MOLE UP TIME */}
                <div style={InputContainer}>
                    <strong>Kauanko pysyy ylhäällä</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input
                            style={NumberStyle}
                            type="number"
                            name="upTime"
                            step={1}
                            value={moleUpTime}
                            onChange={handleMoleUpTime}
                        />
                        <label htmlFor="upTime">ms</label>
                    </div>
                </div>

                {/* MOLE HIDE TIME */}
                <div style={InputContainer}>
                    <strong>Kauankos kestää laskeutua</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input
                            style={NumberStyle}
                            type="number"
                            name="removeSpeed"
                            step={1}
                            value={moleHideTime}
                            onChange={handleMoleHideTime}
                        />
                        <label htmlFor="removeSpeed">ms</label>
                    </div>
                </div>

                {/* NEXT MOLE SPEED */}
                <div style={InputContainer}>
                    <strong>Kuinka nopeasti seuraava myyrä nousee</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input
                            style={NumberStyle}
                            type="number"
                            name="nextMoleSpeedMin"
                            min={0}
                            max={nextMoleMaxTime - 1}
                            step={1}
                            value={nextMoleMinTime}
                            onChange={handleNextMoleMinTime}
                        />
                        <label htmlFor="nextMoleSpeedMin">min ms</label>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input
                            style={NumberStyle}
                            type="number"
                            name="nextMoleSpeedMax"
                            min={nextMoleMinTime}
                            step={1}
                            value={nextMoleMaxTime}
                            onChange={handleNextMoleMaxTime}
                        />
                        <label htmlFor="nextMoleSpeedMax">max ms</label>
                    </div>
                </div>
            </section>



            {/* MOLE ACCELERATION --------------------------------------------- */}
            <section style={SectionContainer}>
                <h2>Pelin kiihtyminen</h2>

                <div style={InputContainer}>
                    <strong>Pelin nopeus nyt:</strong>
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                        <strong style={{ fontSize: '1.1rem', borderRadius: '50px', alignSelf: 'flex-start', padding: '8px 16px', color: 'white', backgroundColor: '#ff0055ff' }}>
                            {gameSpeedMeter}
                        </strong>
                        <p>Juhanaa</p>
                    </div>
                </div>

                {/* MOLE ACCELERATION MULTIPLIER */}
                <div style={InputContainer}>
                    <strong>kuinka nopeasti peli kiihtyy (0 ei kiihdytä peliä)</strong>
                    <input
                        style={SliderStyle}
                        type="range"
                        step={0.1}
                        min={0}
                        max={20}
                        value={avgMoleLifeTimeReducer}
                        onChange={handleAcceleration}
                    />
                    <span>Kerroin: {avgMoleLifeTimeReducer}</span>
                </div>

                {/* MOLE ACCELERATION STRATEGY */}
                <div style={InputContainer}>
                    <strong>Onko pelin nopeus ylärajaa?</strong>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                            style={CheckboxStyle}
                            type="checkbox"
                            name="hasMaxAcceleration"
                            checked={hasSpeedCap}
                            onChange={handleHasSpeedCap}
                        />
                        <label htmlFor='hasMaxAcceleration'>On</label>
                    </div>
                </div>

                {/* MOLE ACCELERATION CAP */}
                <div style={{ ...InputContainer, ...(!hasSpeedCap && Disabled) }}>
                    <strong>Pelin nopeuden yläraja</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input
                            style={NumberStyle}
                            type="number"
                            name="gameSpeedCap"
                            step={0.1}
                            value={gameSpeedCap}
                            onChange={handleSpeedCap}
                        />
                        <label htmlFor="gameSpeedCap">Juhanaa</label>
                    </div>
                </div>
            </section>



            {/* MOLE COUNT INCREASE ---------------------------------------------*/}
            <section style={SectionContainer}>
                <h2>Myyrien määrä</h2>

                {/* SET MAX NUM OF MOLES */}
                <div style={InputContainer}>
                    <strong>Max määrä myyriä</strong>
                    <input style={SliderStyle} type="range" step={1} min={1} max={9} value={maxNumOfMoles} onChange={handleMoleCount} />
                    <span>Max myyrät: {maxNumOfMoles}</span>
                </div>

                {/* SET MOLE INCREASE STRATEGY */}
                <div style={InputContainer}>
                    <strong>Tapa minkä perusteella lisätään samanaikaisten myyrien määrä</strong>
                    <div style={RadioStyle}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <input
                                type="radio"
                                name="moleIncreaseByTime"
                                checked={moleIncreaseStrategy == MoleIncreaseStrategies.TIME}
                                onChange={() => handleMoleIncreaseStrategy(MoleIncreaseStrategies.TIME)}
                            />
                            <label htmlFor="moleIncreaseByTime">Ajan perusteella</label>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <input
                                type="radio"
                                name="moleIncreaseByScore"
                                checked={moleIncreaseStrategy == MoleIncreaseStrategies.SCORE}
                                onChange={() => handleMoleIncreaseStrategy(MoleIncreaseStrategies.SCORE)}
                            />
                            <label htmlFor="moleIncreaseByScore">Pisteiden perusteella</label>
                        </div>
                    </div>
                </div>

                {/* SET MOLE INCREASE TIME INTERVAL */}
                <div style={{ ...InputContainer, ...(moleIncreaseStrategy != MoleIncreaseStrategies.TIME && Disabled) }}>
                    <strong>Aika intervalli milloin myyrien määrä moninkertaistuu</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input
                            style={NumberStyle}
                            type="number"
                            name="moleIncreaseByTimeInput"
                            step={1}
                            value={moleIncreaseByTimeInterval}
                            onChange={handleMoleIncreaseByTimeInterval}
                        />
                        <label htmlFor="moleIncreaseByTimeInput">ms</label>
                    </div>
                </div>

                {/* SET MOLE INCREASE SCORE INTERVAL */}
                <div style={{ ...InputContainer, ...(moleIncreaseStrategy != MoleIncreaseStrategies.SCORE && Disabled) }}>
                    <strong>Piste intervalli milloin myyrien määrä moninkertaisuu</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input
                            style={NumberStyle}
                            type="number"
                            name="moleIncreaseByScoreInput"
                            step={1}
                            value={moleIncreaseByScoreInterval}
                            onChange={handleMoleIncreaseByScoreInterval}
                        />
                        <label htmlFor="moleIncreaseByScoreInput">pistettä</label>
                    </div>
                </div>
            </section>

        </div>
    );
}

const Container: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: "30px",
    width: '100%',
    height: '100%',
    position: 'relative',
    background: '#FFFFFF',
    padding: '40px',
    boxSizing: 'border-box',
}

const SectionContainer: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: "20px",
}

const InputContainer: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: "5px",
    width: '100%',
    height: '100%',
    position: 'relative',
    background: '#FFFFFF',
}

const NumberStyle: React.CSSProperties = {
    width: '100px',
    height: "30px",
    padding: "10px",
    boxSizing: "border-box",
}

const SliderStyle: React.CSSProperties = {
    width: "200px",
}

const CheckboxStyle: React.CSSProperties = {
    alignSelf: 'flex-start',
}

const RadioStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: "5px",
}

const Disabled: React.CSSProperties = {
    opacity: 0.4,
    pointerEvents: 'none',
}

const ResetButton: React.CSSProperties = {
    padding: "10px 20px",
    backgroundColor: "#06114F",
    color: "#FFFFFF",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "medium",
}