'use client';
import { useState, useContext } from 'react';

// Context
import { GameContext, GameStates, MoleIncreaseStrategies } from '../contexts/GameContext'

export default function Page() {
    const [acceleration, setAcceleration] = useState(30);

    // Context states
    const {
        setGameState,

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
    } = useContext(GameContext)


    // MOLE BEHAVIOUR TIMINGS
    const handleMoleRiseTime = (e: any) => {
        setGameState(GameStates.READY);
        setMoleRiseTime(Number(e.target.value));
    }

    const handleMoleUpTime = (e: any) => {
        setGameState(GameStates.READY);
        setMoleUpTime(Number(e.target.value));
    }

    const handleMoleHideTime = (e: any) => {
        setGameState(GameStates.READY);
        setMoleHideTime(Number(e.target.value));
    }

    const handleNextMoleMinTime = (e: any) => {
        setGameState(GameStates.READY);
        setNextMoleMinTime(Number(e.target.value));
    }

    const handleNextMoleMaxTime = (e: any) => {
        setGameState(GameStates.READY);
        setNextMoleMaxTime(Number(e.target.value));
    }

    // MOLE COUNT INCREASE
    const handleMoleCount = (e: any) => {
        setGameState(GameStates.READY);
        setMaxNumOfMoles(Number(e.target.value));
    }

    const handleMoleIncreaseStrategy = (strategy: MoleIncreaseStrategies) => {
        setGameState(GameStates.READY);
        setMoleIncreaseStrategy(strategy);
    }

    const handleMoleIncreaseByTimeInterval = (e: any) => {
        setGameState(GameStates.READY);
        setMoleIncreaseByTimeInterval((Number(e.target.value)));
    }

    const handleMoleIncreaseByScoreInterval = (e: any) => {
        setGameState(GameStates.READY);
        setMoleIncreaseByScoreInterval(Number(e.target.value));
    }

    // MOLE ACCELERATION
    const handleAcceleration = (e: any) => {
        setGameState(GameStates.READY);
        setAcceleration(Number(e.target.value));
    }

    return (
        <div style={Container}>

            {/* MOLE BEHAVIOUR TIMINGS -------------------------------------- */}
            <section style={SectionContainer}>
                <h2>Myyrien nopeus - lähtönopeudet muuttujille</h2>

                {/* MOLE RISE TIME */}
                <div style={InputContainer}>
                    <strong>Kauanko kestää nousta</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input style={NumberStyle} type="number" name="riseSpeed" step={1} defaultValue={moleRiseTime} onChange={handleMoleRiseTime} />
                        <label htmlFor="riseSpeed">ms</label>
                    </div>
                </div>

                {/* MOLE UP TIME */}
                <div style={InputContainer}>
                    <strong>Kauanko pysyy ylhäällä</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input style={NumberStyle} type="number" name="upTime" step={1} defaultValue={moleUpTime} onChange={handleMoleUpTime} />
                        <label htmlFor="upTime">ms</label>
                    </div>
                </div>

                {/* MOLE HIDE TIME */}
                <div style={InputContainer}>
                    <strong>Kauankos kestää laskeutua</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input style={NumberStyle} type="number" name="removeSpeed" step={1} defaultValue={moleHideTime} onChange={handleMoleHideTime} />
                        <label htmlFor="removeSpeed">ms</label>
                    </div>
                </div>

                {/* NEXT MOLE SPEED */}
                <div style={InputContainer}>
                    <strong>Kuinka nopeasti seuraava myyrä nousee</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input style={NumberStyle} type="number" name="nextMoleSpeedMin" step={1} defaultValue={nextMoleMinTime} onChange={handleNextMoleMinTime} />
                        <label htmlFor="nextMoleSpeedMin">min ms</label>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input style={NumberStyle} type="number" name="nextMoleSpeedMax" step={1} defaultValue={nextMoleMaxTime} onChange={handleNextMoleMaxTime} />
                        <label htmlFor="nextMoleSpeedMax">max ms</label>
                    </div>
                </div>
            </section>



            {/* MOLE ACCELERATION --------------------------------------------- */}
            <section style={SectionContainer}>
                <h2>Pelin kiihtyminen</h2>

                {/* MOLE ACCELERATION MULTIPLIER */}
                <div style={InputContainer}>
                    <strong>kuinka nopeasti peli kiihtyy (over-time-kerroin, 1:ssä peli ei kiihdy)</strong>
                    <input style={SliderStyle} type="range" step={1} min={1} max={100} value={acceleration} onChange={handleAcceleration} />
                    <span>Kerroin: {acceleration}</span>
                </div>

                {/* MOLE ACCELERATION STRATEGY */}
                <div style={InputContainer}>
                    <strong>Onko kiihtymisen ylärajaa?</strong>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <input style={CheckboxStyle} type="checkbox" name="hasMaxAcceleration" />
                        <label htmlFor='hasMaxAcceleration'>On</label>
                    </div>
                </div>

                {/* MOLE ACCELERATION CAP */}
                <div style={InputContainer}>
                    <strong>Kiihtymisen yläraja</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input style={NumberStyle} type="number" name="accelerationCap" step={0.01} />
                        <label htmlFor="accelerationCap">myyrää / minuutti</label>
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
                    <strong>Tapa minkä perusteella myyrät alkaa nousta samanaikaisesti</strong>
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
                <div style={{...InputContainer, ...(moleIncreaseStrategy != MoleIncreaseStrategies.TIME && Disabled)}}>
                    <strong>Aika intervalli milloin myyrien määrä moninkertaisuu</strong>
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
                <div style={{...InputContainer, ...(moleIncreaseStrategy != MoleIncreaseStrategies.SCORE && Disabled)}}>
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