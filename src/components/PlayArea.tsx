import React, { useEffect, useContext, useState } from 'react'
import { randomBetween, randomMoleExcl } from '@/lib/utils'

import { GameContext, GameStates } from '../contexts/GameContext'

import MoleHolePad from './MoleHolePad'

export default function PlayArea() {

  // const [timeOutHandle, setTimeOutHandle] = useState<NodeJS.Timeout | null>(null)
  const moleOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [activeMoles, setActiveMoles] = useState<number[]>([]);
  const [shouldBeNumOfMoles, setShouldBeNumOfMoles] = useState(2);

  const {
    gameState,
    setScoreNumber,
    nextMoleMinTime,
    nextMoleMaxTime,
  } = useContext(GameContext);

  useEffect(() => {
    if (gameState === GameStates.STARTED) {
      // 1000ms delay to start spawning moles
      newMole(1000);
    }

    else if (gameState === GameStates.OVER || gameState === GameStates.READY) {
      // Reset initial values
      setActiveMoles([])
      setScoreNumber(0)
    }

  }, [gameState]);


  useEffect(() => {
    if (gameState === GameStates.STARTED) {
      console.log('Active moles:', activeMoles)

      // check if number of active moles is less than what it should be, if so, spawn a new mole
      if (activeMoles && activeMoles?.length < shouldBeNumOfMoles) {
        const newtime = randomBetween(nextMoleMinTime, nextMoleMaxTime)
        newMole(newtime);
      }
    }

  }, [activeMoles]);

  const newMole = (time: number) => {
      // Select new random moles
      const randint = randomMoleExcl(activeMoles);
      setActiveMoles([...activeMoles, randint])
  }


  return (
    <div style={Container}>
      <section style={GridContainer}>
        {
          moleOptions.map((moleIndex) => (
            <MoleHolePad
              key={moleIndex}
              selected={!!activeMoles?.includes(moleIndex)}
              activeMoles={activeMoles}
              setActiveMoles={setActiveMoles}
              moleIndex={moleIndex}
            />
          ))}
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