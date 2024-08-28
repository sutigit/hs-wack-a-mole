import React, { useEffect, useContext, useState } from 'react'
import { randomMoleExcl } from '@/lib/utils'

import { GameContext, GameStates } from '../contexts/GameContext'

import MoleHolePad from './MoleHolePad'

export default function PlayArea() {

  // const [timeOutHandle, setTimeOutHandle] = useState<NodeJS.Timeout | null>(null)
  const moleOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [activeMoles, setActiveMoles] = useState<number[]>([]);
  const [shouldBeNumOfMoles, setShouldBeNumOfMoles] = useState(1);

  const {
    gameState,
    setScoreNumber,
  } = useContext(GameContext);

  useEffect(() => {
    if (gameState === GameStates.STARTED) {
      newMole();
    }

    else if (gameState === GameStates.OVER || gameState === GameStates.READY) {
      // Reset initial values
      setActiveMoles([])
      setScoreNumber(0)
    }

  }, [gameState]);


  useEffect(() => {
    if (gameState === GameStates.STARTED) {

      // check if number of active moles is less than what it should be, if so, spawn a new mole
      if (activeMoles && activeMoles?.length < shouldBeNumOfMoles) {
        newMole();
      }
    }

  }, [activeMoles]);

  const newMole = () => {
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