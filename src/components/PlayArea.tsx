import React, { useEffect, useContext, useState, useRef } from 'react'
import { randomMoleExcl } from '@/lib/utils'

import { GameContext, GameStates, MoleIncreaseStrategies } from '../contexts/GameContext'

import MoleHolePad from './MoleHolePad'


export default function PlayArea() {


  const {
    gameState,
    scoreNumber,
    gameSpeedRef,
    setGameSpeedMeter,
    setAvgMoleLifeTimeMultiplier,
    setScoreNumber,
    maxNumOfMoles,
    currentNumOfMoles,
    setCurrentNumOfMoles,
    moleIncreaseStrategy,
    moleIncreaseByTimeInterval,
    moleIncreaseByScoreInterval,
    avgMoleLifeTimeReducer,
    hasSpeedCap,
    gameSpeedCap,
  } = useContext(GameContext);

  const moleOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [activeMoles, setActiveMoles] = useState<number[]>([]);
  const [nextScoreMoleIncrease, setNextScoreMoleIncrease] = useState<number>(moleIncreaseByTimeInterval)

  const moleIncreaseInterval = useRef<NodeJS.Timeout | null>(null)
  const gameAccelerateInterval = useRef<NodeJS.Timeout | null>(null)


  // Takes care of starting and ending the game
  useEffect(() => {
    if (gameState === GameStates.STARTED) {
      setScoreNumber(0)
      newMole();
    }

    else if (gameState === GameStates.OVER || gameState === GameStates.READY) {
      // TODO: automate this
      // Reset initial values
      setActiveMoles([])
      setCurrentNumOfMoles(1)
      setNextScoreMoleIncrease(moleIncreaseByScoreInterval)
      setAvgMoleLifeTimeMultiplier(1)
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
    if (gameState === GameStates.STARTED && moleIncreaseStrategy === MoleIncreaseStrategies.TIME) {
      moleIncreaseInterval.current = setInterval(() => {
        setCurrentNumOfMoles((prev) => {
          if (prev < maxNumOfMoles) {
            return prev + 1
          }
          return prev
        });

      }, moleIncreaseByTimeInterval)
    } else {
      clearInterval(moleIncreaseInterval.current!)
    }

    // Keep only gameState dependency when doing time intervals
  }, [gameState]);


  // Takes care of increasing number of moles BY SCORE
  useEffect(() => {
    if (gameState === GameStates.STARTED && moleIncreaseStrategy === MoleIncreaseStrategies.SCORE) {
      if (scoreNumber >= nextScoreMoleIncrease) {
        setCurrentNumOfMoles((prev) => {
          if (prev < maxNumOfMoles) {
            return prev + 1
          }
          return prev
        });

        setNextScoreMoleIncrease((prev) => prev + moleIncreaseByScoreInterval)
      }
    }
  }, [gameState, scoreNumber]);


  // Takes care of accelerating the game
  useEffect(() => {
    if (gameState === GameStates.STARTED) {
      gameAccelerateInterval.current = setInterval(() => {
        setAvgMoleLifeTimeMultiplier((prevMultiplier) => {          
          const newMultiplier = prevMultiplier - (avgMoleLifeTimeReducer / 100)
          const speedCap = hasSpeedCap ? gameSpeedCap : Infinity;
          if (gameSpeedRef.current < speedCap && newMultiplier > 0) {
            return newMultiplier;
          }
          return prevMultiplier
        });
        setGameSpeedMeter(gameSpeedRef.current)
      }, 2000)

    } else {
      clearInterval(gameAccelerateInterval.current!)
    }

    // Keep only gameState dependency when doing time intervals
  }, [gameState]);


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