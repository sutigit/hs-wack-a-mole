import React, { useEffect, useContext, useState } from 'react'

import { GameContext, GameStates } from '../contexts/GameContext'

import MoleHolePad from './MoleHolePad'

export default function PlayArea() {

  // const [timeOutHandle, setTimeOutHandle] = useState<NodeJS.Timeout | null>(null)
  const [activeMoles, setActiveMoles] = useState<number[] | null>(null)

  const {
    gameState,
    setScoreNumber,
  } = useContext(GameContext)

  useEffect(() => {
    if (gameState === GameStates.STARTED) {
      // 1000ms delay to start spawning moles
      setTimeout(() => {
        nextMole()
      }, 1000)
    }

    else if (gameState === GameStates.OVER || gameState === GameStates.READY) {
      // Reset initial values
      setActiveMoles(null)
      setScoreNumber(0)
    }

  }, [gameState])


  const nextMole = () => {

    // Select new random mole ------------
    // generate random number 0-8
    const randint1 = Math.floor(Math.random() * 9)
    // const randint2 = Math.floor(Math.random() * 9)
    // Set the new mole
    setActiveMoles([randint1])
  }


  return (
    <div style={Container}>
      <section style={GridContainer}>
        <MoleHolePad selected={!!activeMoles?.includes(0)} />
        <MoleHolePad selected={!!activeMoles?.includes(1)} />
        <MoleHolePad selected={!!activeMoles?.includes(2)} />
        <MoleHolePad selected={!!activeMoles?.includes(3)} />
        <MoleHolePad selected={!!activeMoles?.includes(4)} />
        <MoleHolePad selected={!!activeMoles?.includes(5)} />
        <MoleHolePad selected={!!activeMoles?.includes(6)} />
        <MoleHolePad selected={!!activeMoles?.includes(7)} />
        <MoleHolePad selected={!!activeMoles?.includes(8)} />
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