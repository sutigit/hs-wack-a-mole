import React, { useEffect, useRef, useState, useContext } from 'react'
import { useSpring, animated, useSpringRef } from '@react-spring/web'

// Context
import { GameContext, GameStates } from '../contexts/GameContext'

import Hammer from './Hammer'
import HitFeedback from './HitFeedBack'

export default function Mole() {
    // Context states
    const { 
        moleLCT,
        moleSWI,
        scoreNumber,
        setScoreNumber,
        setGameState,
    } = useContext(GameContext)


    // Refs
    const moleRef = useRef<HTMLDivElement>(null);
    const molePadRef = useRef<HTMLDivElement>(null);
    const hammerRef = useRef<HTMLDivElement>(null);

    // Refs for game logic
    const isHit = useRef<boolean>(false);
    const canHit = useRef<boolean>(true);
    const moleType = useRef<string>('basic');

    // Mole animation
    const moleSpringApi = useSpringRef();
    // set initial mole properties
    const moleSpring = useSpring({
        ref: moleSpringApi,
        from: MolePosDown,
    });

    // Mole type animation
    const moleTypeApi = useSpringRef();
    // set initial mole properties
    const moleTypeSpring: any = useSpring({
        ref: moleTypeApi,
        from: MoleBasic,
    });

    // Hammer animation
    const hammerSpringApi = useSpringRef();
    // set initial hammer properties
    const hammerSpring = useSpring({
        ref: hammerSpringApi,
        from: { transform: `rotate(-40deg)`, opacity: 0},
    });

    // Hit feedback animation
    const hitFeedbackSpringApi = useSpringRef();
    // set initial hit feedback properties
    const hitFeedbackSpring = useSpring({
        ref: hitFeedbackSpringApi,
        from: { transform: `translateY(-100%)`, opacity: 0},
    });


    // TODO: migrate to global settings
    const moleSpringRatio = 0.2;
    const moleRestRatio = 0.5;


    // Animation Functions
    const moleRise = () => {
        // Animate mole rise
        moleSpringApi.start({
            to: MolePosUp,
            config: {
                duration: Math.floor(moleLCT.current * moleSpringRatio),
            },
            onRest: () => moleRemove(),
        });
    }


    const moleRemove = () => {
        // Animate mole remove
        moleSpringApi.start({
            to: MolePosDown,
            delay: Math.floor(moleLCT.current * moleRestRatio),
            config: {
                duration: Math.floor(moleLCT.current * moleSpringRatio),
            },
            onRest: () => {
                canHit.current = false;

                // THIS HERE, determines if the game is over by missing a mole hit
                // There is a 200ms delay to check if the mole is hit
                // without delay, the game over trigger is unreliable
                setTimeout(() => {
                    if (!isHit.current) {
                        // Game Over
                        setGameState(GameStates.OVER);
                    }
                }, 200);
            },
        })
    }

    const moleRemoveOnHit = () => {
        // Animate mole remove when hit by hammer
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

    const animateHitFeedback = () => {
        // Animate hit feedback --------
        const molePadBottom = molePadRef.current?.getBoundingClientRect().bottom || 0;
        const moleTop = moleRef.current?.getBoundingClientRect().top || 0;
        const calcPos = molePadBottom - moleTop - 20;

        hitFeedbackSpringApi.start({
            from: { transform: `translateY(-120%)`, opacity: 0, bottom: calcPos},
            to: [
                { transform: `translateY(-160%)`, opacity: 1},
                { transform: `translateY(-180%)`, opacity: 0 },
            ],
            delay: 120,
            config: {
                duration: 300,
            },
            reset: true,
        });
    }

    useEffect(() => {
        // Check if refs are not null
        if (!moleRef.current || !molePadRef.current || !hammerRef.current) return;

        // random mole type
        // TODO: migrate to global settings
        const probability = 0.2;
        if (Math.random() <= probability) {
            moleType.current = 'gold';
            moleTypeApi.start({ 
                to: MoleGold,
                immediate: true,
            });
        }

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
        if (canHit.current) {
            // Hit the mole
            moleSpringApi.stop();
            
            canHit.current = false;
            isHit.current = true;

            animateHammer();
            animateHitFeedback();
            moleRemoveOnHit();
            
            // Add score
            const score = moleType.current === 'gold' ? 30 : 10;
            setScoreNumber(scoreNumber + score);
        }

    }

    return (
        <div style={Container}>
            
            {/* Mole */}
            <div ref={molePadRef} style={MoleContainer} onMouseDown={handleMouseDown}>
                <animated.div ref={moleRef} style={{...MoleCommonStyle, ...moleSpring, ...moleTypeSpring}}></animated.div>
            </div>
            
            {/* Hammer */}
            <animated.div ref={hammerRef} style={{...HammerWrapper, ...hammerSpring}}>
                <Hammer />
            </animated.div>

            {/* Hit feedback, show score */}
            <animated.div style={{...HitFeedbackWrapper, ...hitFeedbackSpring}}>
                <HitFeedback hitScore={moleType.current === 'gold' ? 30 : 10}/>
            </ animated.div>
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
    userSelect: 'none',
}

const HitFeedbackWrapper: React.CSSProperties = {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    textAlign: 'center',
    pointerEvents: 'none',
    userSelect: 'none',
    zIndex: 1,
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

