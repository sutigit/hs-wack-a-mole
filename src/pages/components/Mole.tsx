import React, { useEffect, useRef, useState } from 'react'
import { useSpring, animated, useSpringRef } from '@react-spring/web'

import Hammer from './Hammer'

export default function Mole({isActive, type, handleMoleHit}: {isActive: boolean, type: string, handleMoleHit: (newPoints: number) => void}) {

    const [canHit, setCanHit] = useState<boolean>(false);
    const [scoreValue, setScoreValue] = useState<number>(10);

    // Refs
    const moleRef = useRef<HTMLDivElement>(null);
    const molePadRef = useRef<HTMLDivElement>(null);
    const hammerRef = useRef<HTMLDivElement>(null);

    // Mole animation
    const moleSpringApi = useSpringRef();
    const moleSpring = useSpring({
        ref: moleSpringApi,
        from: MolePosDown,
        config: {
            duration: 200,
        },
    });

    // Hammer animation
    const hammerSpringApi = useSpringRef();
    const hammerSpring = useSpring({ref: hammerSpringApi});

    // Type styling
    const typeSpringApi = useSpringRef();
    const typeSpring = useSpring({
        ref: typeSpringApi,
        from: MoleBasic,
    });


    // Mole type styling
    let MoleType: React.CSSProperties;

    if (type === 'basic') {
        MoleType = MoleBasic;
    } else if (type === 'gold') {
        MoleType = MoleGold;
    }


    useEffect(() => {
        if (isActive) {
            setCanHit(true);

            // set score value
            if (type === 'gold') {
                setScoreValue(30);
            } else {
                setScoreValue(10); // default
            }

            moleSpringApi.start({
                to: MolePosUp,
            });

            typeSpringApi.start({
                to: MoleType,
                immediate: true,
                reset: true,
            });
        } else {
            moleSpringApi.start({
                to: MolePosDown,
                delay: 150,
                onRest: () => {
                    setCanHit(false);
                    setScoreValue(10); // default
                }
            });
        }
    }, [isActive]);



    const handleMouseDown = () => {
        if (canHit) {
            // Handle mole hit ---------
            handleMoleHit(scoreValue);
            setCanHit(false);


            // Animate hammer ---------
            const molePadBottom = molePadRef.current?.getBoundingClientRect().bottom || 0;
            const moleTop = moleRef.current?.getBoundingClientRect().top || 0;
            const calcPos = molePadBottom - moleTop - 20;
            hammerSpringApi.start({
                from: { transform: `rotate(-40deg)`, opacity: 0, bottom: calcPos},
                to: [
                    { transform: `rotate(-90deg)`, opacity: 1},
                    { transform: `rotate(-80deg)`, opacity: 1 },
                    { transform: `rotate(-80deg)`, opacity: 0 },
                ],
                config: {
                    duration: 100,
                },
                reset: true,
            });
        }
    }

    return (
        <div style={Container}>
            <div ref={molePadRef} style={MolePad} onMouseDown={handleMouseDown}>
                <animated.div ref={moleRef} style={{...MoleCommonStyle, ...moleSpring, ...typeSpring}}></animated.div>
            </div>
            <animated.div ref={hammerRef} style={{...HammerWrapper, ...hammerSpring}}>
                <Hammer />
            </animated.div>
        </div>
    )
}

const MolePosDown = { transform: 'translateY(100%)' }; // Mole is hidden at the bottom of the mole pad
const MolePosUp = { transform: 'translateY(0%)' }; // Mole is fully visible on the mole pad

const Container: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'relative',
}

const HammerWrapper: React.CSSProperties = {
    position: 'absolute',
    bottom: '0',
    left: '40%',
    width: '100%',
    aspectRatio: '1 / 1',
    pointerEvents: 'none',
    opacity: 0,
}

const MolePad: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    overflow: 'hidden',
    cursor: 'pointer',
}

const MoleCommonStyle: React.CSSProperties = {
    width: '50%',
    height: '80%', // Mole height!
    borderRadius: '15px 15px 0 0',
}

const MoleBasic: React.CSSProperties = {
    backgroundColor: '#B26E63',
}

const MoleGold: React.CSSProperties = {
    backgroundColor: '#F3B61F',
}

