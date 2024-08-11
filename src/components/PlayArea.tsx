import React, { useEffect, useContext, useState } from 'react'

import {GameContext, GameStates} from '../contexts/GameContext'

import MoleHolePad from './MoleHolePad'


export default function PlayArea() {

  const [timeOutHandle, setTimeOutHandle] = useState<NodeJS.Timeout | null>(null)
  const [luckyNumberMole, setLuckyNumberMole] = useState<number | null>(null)
  
  const {
    moleSWI,
    moleLCT,
    gameState,
    setScoreNumber,
  } = useContext(GameContext)

  useEffect(() => {
    if (gameState === GameStates.STARTED) {
      // Reset initial values
      moleSWI.current = 3000
      moleLCT.current = 2600
      setLuckyNumberMole(null)
      setScoreNumber(0)

      // 1000ms delay to start spawning moles
      nextIntervalSetup(1000)
    }

    else if (gameState === GameStates.OVER) {      
      if (timeOutHandle) {
        clearTimeout(timeOutHandle)
      }
    }

    // Cleanup when component unmounts
    return () => {
      if (timeOutHandle) {
        clearTimeout(timeOutHandle)
      }
    }
  }, [gameState])


  const nextIntervalSetup = (time: number) => {
    const tmHandle = setTimeout(() => {

      // TODO: migrate to global settings
      if (moleSWI.current > 1200) {
        // Mole Spawn Window Interval
        moleSWI.current -= 100
      }

      if (moleLCT.current > 1000) {
        // Mole Life Cycle Time
        moleLCT.current -= 90
      }

      // generate random number 0-8
      const randint = Math.floor(Math.random() * 9)

      // select random mole
      setLuckyNumberMole(randint)

      
      nextIntervalSetup(moleSWI.current) 
    }, time)

    setTimeOutHandle(tmHandle)
  }
  

  return (
    <div style={Container}>
        <section style={GridContainer}>
          <MoleHolePad selected={luckyNumberMole === 0} />
          <MoleHolePad selected={luckyNumberMole === 1} />
          <MoleHolePad selected={luckyNumberMole === 2} />
          <MoleHolePad selected={luckyNumberMole === 3} />
          <MoleHolePad selected={luckyNumberMole === 4} />
          <MoleHolePad selected={luckyNumberMole === 5} />
          <MoleHolePad selected={luckyNumberMole === 6} />
          <MoleHolePad selected={luckyNumberMole === 7} />
          <MoleHolePad selected={luckyNumberMole === 8} />
        </section>
    </div>
  )
}

const Container: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
}

const GridContainer: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)',
  width: '100%',
  aspectRatio: '1 / 1',
}