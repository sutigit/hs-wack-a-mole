'use client';
import { useState, useContext } from 'react';

// Context
import { GameContext, GameStates } from '../contexts/GameContext'

export default function Page() {
    const [acceleration, setAcceleration] = useState(30);
    const [moleCount, setMoleCount] = useState(1);

    // Context states
    const {
        setGameState,

        // NEW SPAWN SYSTEM
        moleRiseTime,
        moleUpTime,
        moleHideTime,
        nextMoleMinTime,
        nextMoleMaxTime,
    } = useContext(GameContext)


    const handleAcceleration = (e: any) => {
        setGameState(GameStates.READY);
        setAcceleration(e.target.value);
    }

    const handleMoleCount = (e: any) => {
        setGameState(GameStates.READY);
        setMoleCount(e.target.value);
    }

    const handleMoleRiseTime = (e: any) => {
        setGameState(GameStates.READY);
        // moleRiseTime = e.target.value;
    }

    const handleMoleUpTime = (e: any) => {
        setGameState(GameStates.READY);
        // moleUpTime = e.target.value;
    }

    const handleMoleHideTime = (e: any) => {
        setGameState(GameStates.READY);
        // moleHideTime = e.target.value;
    }

    const handleNextMoleMinTime = (e: any) => {
        setGameState(GameStates.READY);
        // nextMoleMinTime = e.target.value;
    }

    const handleNextMoleMaxTime = (e: any) => {
        setGameState(GameStates.READY);
        // nextMoleMaxTime = e.target.value;
    }

    return (
        <div style={Container}>

            <section style={SectionContainer}>
                {/* START SPEEDS */}
                <h2>Myyrien nopeus - lähtönopeudet muuttujille</h2>
                <div style={InputContainer}>
                    <strong>Ylös</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input style={NumberStyle} type="number" name="riseSpeed" step={1} defaultValue={moleRiseTime} onChange={handleMoleRiseTime}/>
                        <label htmlFor="riseSpeed">ms</label>
                    </div>
                </div>

                <div style={InputContainer}>
                    <strong>Kauanko pysyy ylhäällä</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input style={NumberStyle} type="number" name="upTime" step={1} defaultValue={moleUpTime} onChange={handleMoleUpTime}/>
                        <label htmlFor="upTime">ms</label>
                    </div>
                </div>

                <div style={InputContainer}>
                    <strong>Alas</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input style={NumberStyle} type="number" name="removeSpeed" step={1} defaultValue={moleHideTime} onChange={handleMoleHideTime}/>
                        <label htmlFor="removeSpeed">ms</label>
                    </div>
                </div>

                <div style={InputContainer}>
                    <strong>Kuinka nopeasti seuraava myyrä nousee</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input style={NumberStyle} type="number" name="nextMoleSpeedMin" step={1} defaultValue={nextMoleMinTime} onChange={handleNextMoleMinTime}/>
                        <label htmlFor="nextMoleSpeedMin">min ms</label>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input style={NumberStyle} type="number" name="nextMoleSpeedMax" step={1} defaultValue={nextMoleMaxTime} onChange={handleNextMoleMaxTime}/>
                        <label htmlFor="nextMoleSpeedMax">max ms</label>
                    </div>
                </div>
            </section>

            <section style={SectionContainer}>
                {/* GAME SPEED INCREASE */}
                <h2>Pelin kiihtyminen</h2>
                <div style={InputContainer}>
                    <strong>kuinka nopeasti peli kiihtyy (over-time-kerroin, 1:ssä peli ei kiihdy)</strong>
                    <input style={SliderStyle} type="range" step={1} min={1} max={100} value={acceleration} onChange={handleAcceleration} />
                    <span>Kerroin: {acceleration}</span>
                </div>

                <div style={InputContainer}>
                    <strong>Onko kiihtymisen ylärajaa?</strong>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <input style={CheckboxStyle} type="checkbox" name="hasMaxAcceleration" />
                        <label htmlFor='hasMaxAcceleration'>On</label>
                    </div>
                </div>

                <div style={InputContainer}>
                    <strong>Kiihtymisen yläraja</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input style={NumberStyle} type="number" name="accelerationCap" step={0.01} />
                        <label htmlFor="accelerationCap">myyrää / minuutti</label>
                    </div>
                </div>
            </section>

            <section style={SectionContainer}>
                {/* NUMBER OF MOLES IN THE GAME */}
                <h2>Myyrien määrä</h2>
                <div style={InputContainer}>
                    <strong>Max määrä myyriä</strong>
                    <input style={SliderStyle} type="range" step={1} min={1} max={9} value={moleCount} onChange={handleMoleCount} />
                    <span>Max myyrät: {moleCount}</span>
                </div>

                <div style={InputContainer}>
                    <strong>Tapa minkä perusteella myyrät alkaa nousta samanaikaisesti</strong>
                    <div style={RadioStyle}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" name="aika" />
                            <label htmlFor="aika">Ajan perusteella</label>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" name="aika" />
                            <label htmlFor="aika">Pisteiden perusteella</label>
                        </div>
                    </div>
                </div>


                <div style={InputContainer}>
                    <strong>Aika intervalli milloin myyrien määrä moninkertaisuu</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input style={NumberStyle} type="number" name="moleMultiplyIntervalTime" step={0.01} />
                        <label htmlFor="moleMultiplyIntervalTime">ms</label>
                    </div>
                </div>


                <div style={InputContainer}>
                    <strong>Piste intervalli milloin myyrien määrä moninkertaisuu</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input style={NumberStyle} type="number" name="moleMultiplyIntervalPoints" step={0.01} />
                        <label htmlFor="moleMultiplyIntervalPoints">pistettä</label>
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
    width: '60px',
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
}