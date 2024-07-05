import React, { useContext, useEffect } from 'react'
import { useSpring, animated, useSpringRef } from '@react-spring/web'

// Context
import {GameContext} from '../contexts/GameContext';

export default function Score() {

  // GameContext
  const { scoreNumber } = useContext(GameContext);

  // Animation
  const scoreSpringApi = useSpringRef();
  const scoreSpring = useSpring({
    ref: scoreSpringApi,
    from: { transform: 'scale(1)'},
    to: [
      { transform: 'scale(1.1)'},
      { transform: 'scale(1)'},
    ],
    config: {
      duration: 100,
      tension: 180, 
      friction: 12
    },
    reset: true,
  });

  useEffect(() => {
    scoreSpringApi.start();
    
  }, [scoreNumber]);

  return (
    <div style={Container}>
        <animated.div style={{...ScoreNumber, ...scoreSpring}}>{scoreNumber}</animated.div>
    </div>
  )
}

const Container: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}

const ScoreNumber: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  fontSize: '4rem',
  padding: '50px',
  color: '#06114F'
}