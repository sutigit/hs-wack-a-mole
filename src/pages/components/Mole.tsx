import React, { useEffect, useRef, useState, useContext } from 'react'
import { useSpring, animated, useSpringRef } from '@react-spring/web'

// Context
import { GameContext } from '../contexts/GameContext'

import Hammer from './Hammer'

export default function Mole() {
    // Context states
    const { 
        moleLCT,
        moleSWI,
        scoreNumber,
        setScoreNumber,
    } = useContext(GameContext)

    // States
    const [canHit, setCanHit] = useState<boolean>(true);

    // Refs
    const moleRef = useRef<HTMLDivElement>(null);
    const molePadRef = useRef<HTMLDivElement>(null);
    const hammerRef = useRef<HTMLDivElement>(null);

    // Mole animation
    const moleSpringApi = useSpringRef();
    // set initial mole properties
    const moleSpring = useSpring({
        ref: moleSpringApi,
        from: MolePosDown,
    });

    // Hammer animation
    const hammerSpringApi = useSpringRef();
    // set initial hammer properties
    const hammerSpring = useSpring({
        ref: hammerSpringApi,
        from: { transform: `rotate(-40deg)`, opacity: 0},
    });


    // TODO: migrate to global settings
    const moleSpringRatio = 0.12;
    const moleRestRatio = 0.7;


    // Animation Functions
    const moleRise = () => {
        moleSpringApi.start({
            to: MolePosUp,
            config: {
                duration: Math.floor(moleLCT.current * moleSpringRatio),
            },
            onRest: () => moleRemove(),
        });
    }


    const moleRemove = () => {
        moleSpringApi.start({
            to: MolePosDown,
            delay: Math.floor(moleLCT.current * moleRestRatio),
            config: {
                duration: Math.floor(moleLCT.current * moleSpringRatio),
            },
            onRest: () => {
                setCanHit(false);
            },
        });
    }

    const moleRemoveOnHit = () => {
        moleSpringApi.start({
            to: MolePosDown,
            delay: 100,
            config: {
                duration: Math.floor(moleLCT.current * moleSpringRatio),
            },
        });
    }

    const animateHammer = () => {
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

    useEffect(() => {
        // Check if refs are not null
        if (!moleRef.current || !molePadRef.current || !hammerRef.current) return;

        console.log('Mole component mounted', moleLCT.current, moleSWI.current);

        // on component mount
        const randomSpawnTimeWindow = moleSWI.current - moleLCT.current;
        const randomSpawnTime = Math.floor(Math.random() * randomSpawnTimeWindow);

        const tmHandle = setTimeout(() => {
            moleRise();
        }, randomSpawnTime);

        return () => {
            clearTimeout(tmHandle);
        }
    }, []);

    const handleMouseDown = () => {
        if (canHit) {
            // Hit the mole
            animateHammer();
            moleRemoveOnHit();
            setCanHit(false);
            
            // Add score
            setScoreNumber(scoreNumber + 10);
        }

    }

    return (
        <div style={Container}>
            
            {/* Mole */}
            <div ref={molePadRef} style={MoleContainer} onMouseDown={handleMouseDown}>
                <animated.div ref={moleRef} style={{...MoleCommonStyle, ...moleSpring, ...MoleBasic}}></animated.div>
            </div>
            
            {/* Hammer */}
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

const MoleContainer: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    overflow: 'hidden',
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

