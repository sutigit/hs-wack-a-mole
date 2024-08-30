import React, { useEffect, useContext, useState, useRef } from 'react'
import { randomMoleExcl } from '@/lib/utils'

import { GameContext, GameStates, MoleIncreaseStrategies } from '../contexts/GameContext'

import MoleHolePad from './MoleHolePad'


export default function PlayArea() {


  const {
    gameState,
    scoreNumber,
    setScoreNumber,
    maxNumOfMoles,
    currentNumOfMoles,
    setCurrentNumOfMoles,
    moleIncreaseStrategy,
    moleIncreaseByTimeInterval,
    moleIncreaseByScoreInterval
  } = useContext(GameContext);

  const moleOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [activeMoles, setActiveMoles] = useState<number[]>([]);
  const [nextScoreMoleIncrease, setNextScoreMoleIncrease] = useState<number>(moleIncreaseByTimeInterval)

  const timeInterval = useRef<NodeJS.Timeout | null>(null)


  // Takes care of starting and ending the game
  useEffect(() => {
    if (gameState === GameStates.STARTED) {
      newMole();
    }

    else if (gameState === GameStates.OVER || gameState === GameStates.READY) {
      // Reset initial values
      setActiveMoles([])
      setCurrentNumOfMoles(1)
      setNextScoreMoleIncrease(moleIncreaseByScoreInterval)
      setScoreNumber(0)
    }

  }, [gameState, moleIncreaseByScoreInterval]);

  // Takes care of spawning new moles
  useEffect(() => {
    if (gameState === GameStates.STARTED) {

      // check if number of active moles is less than what it should be, if so, spawn a new mole
      if (activeMoles && activeMoles?.length < currentNumOfMoles) {
        newMole();
      }
    }

  }, [activeMoles]);

  // Takes care of increasing number of moles BY TIME
  useEffect(() => {
    if (moleIncreaseStrategy === MoleIncreaseStrategies.TIME) {
      const increaseMoles = () => {
        timeInterval.current = setInterval(() => {
          console.log('increasing moles')
          setCurrentNumOfMoles((prev) => {
            if (prev < maxNumOfMoles) {
              return prev + 1
            }
            return prev
          });

        }, moleIncreaseByTimeInterval)
      }

      if (gameState === GameStates.STARTED) {
        increaseMoles();
      } else {
        clearInterval(timeInterval.current!)
      }
    }

  }, [gameState]);


  // Takes care of increasing number of moles BY SCORE
  useEffect(() => {
    if (gameState === GameStates.STARTED) {

      if (moleIncreaseStrategy === MoleIncreaseStrategies.SCORE) {
        if (scoreNumber >= nextScoreMoleIncrease && currentNumOfMoles < maxNumOfMoles) {
          setCurrentNumOfMoles((prev) => prev + 1)
          setNextScoreMoleIncrease((prev) => prev + moleIncreaseByScoreInterval)
        }
      }
    }
  }, [gameState, scoreNumber]);


  // Function to select new random moles
  const newMole = () => {
    // Select new random moles
    const randint: number = randomMoleExcl(activeMoles);
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