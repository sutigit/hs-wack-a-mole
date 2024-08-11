'use client';
import { useState } from 'react';


export default function Page() {   
    const [acceleration, setAcceleration] = useState(30);
    const [moleCount, setMoleCount] = useState(1);

    const handleAcceleration = (e: any) => {
        setAcceleration(e.target.value);
    }

    const handleMoleCount = (e: any) => {
        setMoleCount(e.target.value);
    }

    return (
        <div style={Container}>

            <section style={SectionContainer}>
                {/* START SPEEDS */}
                <h2>Myyrien nopeus - lähtönopeudet muuttujille</h2>
                <div style={InputContainer}>
                    <strong>Ylös</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px"}}>
                        <input style={NumberStyle} type="number" name="riseSpeed" step={0.01} />
                        <label htmlFor="riseSpeed">ms</label>
                    </div>
                </div>

                <div style={InputContainer}>
                    <strong>Kauanko pysyy ylhäällä</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px"}}>
                        <input style={NumberStyle} type="number" name="upTime" step={0.01} />
                        <label htmlFor="upTime">ms</label>
                    </div>
                </div>

                <div style={InputContainer}>
                    <strong>Alas</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px"}}>
                        <input style={NumberStyle} type="number" name="removeSpeed" step={0.01} />
                        <label htmlFor="removeSpeed">ms</label>
                    </div>
                </div>

                <div style={InputContainer}>
                    <strong>Kuinka nopeasti seuraava myyrä nousee</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px"}}>
                        <input style={NumberStyle} type="number" name="nextMoleSpeedMin" step={0.01} />
                        <label htmlFor="nextMoleSpeedMin">min ms</label>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px"}}>
                        <input style={NumberStyle} type="number" name="nextMoleSpeedMax" step={0.01} />
                        <label htmlFor="nextMoleSpeedMax">max ms</label>
                    </div>
                </div>
            </section>

            <section style={SectionContainer}>
                {/* GAME SPEED INCREASE */}
                <h2>Pelin kiihtyminen</h2>
                <div style={InputContainer}>
                    <strong>kuinka nopeasti peli kiihtyy (over-time-kerroin)</strong>
                    <input style={SliderStyle} type="range" step={1} min={20} max={60} value={acceleration} onChange={handleAcceleration} />
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
                    <div style={{ display: "flex", alignItems: "center", gap: "5px"}}>
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
                    <div style={{ display: "flex", alignItems: "center", gap: "5px"}}>
                        <input style={NumberStyle} type="number" name="moleMultiplyIntervalTime" step={0.01} />
                        <label htmlFor="moleMultiplyIntervalTime">ms</label>
                    </div>
                </div>


                <div style={InputContainer}>
                    <strong>Piste intervalli milloin myyrien määrä moninkertaisuu</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px"}}>
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