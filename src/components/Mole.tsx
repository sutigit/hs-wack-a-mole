import React, { useEffect, useRef, useState, useContext } from 'react'
import { useSpring, animated, useSpringRef } from '@react-spring/web'

// Context
import { GameContext, GameStates } from '../contexts/GameContext'


import Hammer from './Hammer'
import HitFeedback from './HitFeedBack'

export default function Mole() {
    // Context states
    const {
        scoreNumber,
        setScoreNumber,
        gameState,
        setGameState,

        // NEW SPAWN SYSTEM
        moleRiseTime,
        moleUpTime,
        moleHideTime,
        nextMoleMinTime,
        nextMoleMaxTime,
    } = useContext(GameContext)

    // States
    const [moleType, setMoleType] = useState<string>('basic')
    const [canHit, setCanHit] = useState<boolean>(true)

    // Refs
    const moleRef = useRef<HTMLDivElement>(null);
    const molePadRef = useRef<HTMLDivElement>(null);
    const hammerRef = useRef<HTMLDivElement>(null);

    // Refs for game logic
    const isHitRef = useRef<boolean>(false);
    const moleTypeRef = useRef<string>('basic');

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

    // Hit feedback animation
    const hitFeedbackSpringApi = useSpringRef();
    // set initial hit feedback properties
    const hitFeedbackSpring = useSpring({
        ref: hitFeedbackSpringApi,
        from: { transform: `translateY(-100%)`, opacity: 0 },
    });




    // Logic and animation functions --------------------
    const logicMoleRise = () => {
        // Animate how the mole rises from the mole pad
        // and start next animation
        moleSpringApi.start({
            to: MolePosUp,
            config: {
                duration: Math.floor(moleRiseTime),
            },
            onRest: () => logicMoleRemove(),
        });
    }


    const logicMoleRemove = () => {
        // Animation and functions when mole uptime expires and it starts to hide
        moleSpringApi.start({
            to: MolePosDown,

            // determines how long the mole stays up
            delay: Math.floor(moleUpTime),

            // animates the mole hide
            config: {
                duration: Math.floor(moleHideTime),
            },

            // this logic starts when the mole is hidden
            onRest: () => {
                setCanHit(false);

                // Check if the missed mole is a gold or basic mole
                // Condition needs to be checked via refs, since animation is sent to HOC
                if (moleTypeRef.current === 'gold' || moleTypeRef.current === 'basic') {

                    // THIS HERE, determines if the game is over by missing a mole hit
                    // There is a 200ms delay to check if the mole is hit
                    // without delay, the game over trigger is unreliable
                    setTimeout(() => {
                        if (!isHitRef.current) {
                            // Game Over
                            setGameState(GameStates.OVER);
                        }
                    }, 200);
                }

                // Trigger next mole
            },
        })
    }
    


    // Pure animation functions --------------------
    const animateMoleRemoveOnHit = () => {
        // Separate animation for mole remove on hit
        moleSpringApi.start({
            to: MolePosDown,
            delay: 100,
            config: {
                duration: Math.floor(moleHideTime),
            },
        });
    }

    const animateHammer = () => {
        // Swinging animation for the hammer
        const molePadBottom = molePadRef.current?.getBoundingClientRect().bottom || 0;
        const moleTop = moleRef.current?.getBoundingClientRect().top || 0;
        const calcPos = molePadBottom - moleTop - 20;

        hammerSpringApi.start({
            from: { transform: `rotate(-40deg)`, opacity: 0, bottom: calcPos},
            to: [
                { transform: `rotate(-90deg)`, opacity: 1 },
                { transform: `rotate(-80deg)`, opacity: 1 },
                { transform: `rotate(-80deg)`, opacity: 0 },
            ],
            config: {
                duration: 100,
            },
            reset: true,
        });
    }

    const animateScore = () => {
        // Animation for the score number that appears when the mole is hit
        const molePadBottom = molePadRef.current?.getBoundingClientRect().bottom || 0;
        const moleTop = moleRef.current?.getBoundingClientRect().top || 0;
        const calcPos = molePadBottom - moleTop - 20;

        hitFeedbackSpringApi.start({
            from: { transform: `translateY(-120%)`, opacity: 0, bottom: calcPos },
            to: [
                { transform: `translateY(-160%)`, opacity: 1 },
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

        // Randomize mole type --------------------
        const rand = Math.random();

        // TODO: migrate to probability ratios to global settings
        switch (true) {
            case rand <= 0.2:
                // The refs are for controlling the game in animations
                moleTypeRef.current = 'gold';
                setMoleType('gold');
                break;
            case rand <= 0.4:
                // The refs are for controlling the game in animations
                moleTypeRef.current = 'spike';
                setMoleType('spike');
                break;
            default:
                // The refs are for controlling the game in animations
                moleTypeRef.current = 'basic';
                setMoleType('basic');
        }
        
        // Start mole rise logic
        logicMoleRise();
    }, []);

    useEffect(() => {
        if (gameState == GameStates.READY || gameState == GameStates.OVER) {
            // cancel animations
            moleSpringApi.stop();
            hammerSpringApi.stop();
            hitFeedbackSpringApi.stop();
        }
    }, [gameState])


    const handleMoleHit = () => {
        if (canHit) {
            moleSpringApi.stop();

            isHitRef.current = true;
            setCanHit(false)

            
            animateHammer();
            
            if (moleType === 'gold' || moleType === 'basic') {
                // Add score
                const score = moleType === 'gold' ? 30 : 10;
                setScoreNumber(scoreNumber + score);
                animateScore();
                animateMoleRemoveOnHit();

                // Trigger next mole HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEREEEEEEEEEEEEEEEEEEEEEEE!!!!

            } else if (moleType === 'spike') {
                // Game Over
                setTimeout(() => {
                    setGameState(GameStates.OVER);
                }, 300);
            }
        }
    }

    const Mole = () => {
        if (moleType === 'gold') {
            return (
                // Gold Mole
                <animated.div ref={moleRef} style={{...moleSpring, ...MoleGold}} /> 
            )
        } 
        else if (moleType === 'spike') {
            return (
                // Spike Mole
                <animated.div ref={moleRef} style={{...moleSpring, ...MoleSpike }}>
                    {/* Made using https://svg-path.com/ */}
                    <svg 
                        width="100%" 
                        height="100%" 
                        viewBox="0 0 100 100" 
                        preserveAspectRatio='none' 
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill="#000000" d="
                            M 0 0 
                            L 0 100 
                            L 100 100 
                            L 100 0 
                            L 70 20 
                            L 50 0 
                            L 30 20 
                            Z"
                        ></path>
                    </svg>
                </animated.div>
            )
        } 
        else if ( moleType === 'basic') {
            return (
                // Basic Mole
                <animated.div ref={moleRef} style={{...moleSpring, ...MoleBasic}} />
            )
        }
    }

    return (
        <div style={Container}>

            {/* Mole */}
            <div ref={molePadRef} style={MoleWrapper} onMouseDown={handleMoleHit}>
                <Mole />
            </div>

            {/* Hammer */}
            <animated.div ref={hammerRef} style={{ ...HammerWrapper, ...hammerSpring }}>
                <Hammer />
            </animated.div>

            {/* Hit feedback, shows score */}
            <animated.div style={{ ...HitFeedbackWrapper, ...hitFeedbackSpring }}>
                <HitFeedback hitScore={moleTypeRef.current === 'gold' ? 30 : 10} />
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

    // disable all touch feedback
    WebkitTapHighlightColor: 'transparent', // For WebKit browsers
    msTouchAction: 'manipulation', // For Microsoft browsers
    touchAction: 'manipulation', // Standard property
}

const HammerWrapper: React.CSSProperties = {
    position: 'absolute',
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

const MoleWrapper: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    overflow: 'hidden',

}

const MoleBasic: React.CSSProperties = {
    backgroundColor: '#B26E63',
    width: '50%',
    height: '80%', // Mole height!
    borderRadius: '15px 15px 0 0',
}

const MoleGold: React.CSSProperties = {
    backgroundColor: '#F3B61F',
    width: '50%',
    height: '80%', // Mole height!
    borderRadius: '15px 15px 0 0',
}

const MoleSpike: React.CSSProperties = {
    width: '50%',
    height: '80%', // Mole height!
}

