import React, { useEffect, useRef, useState } from 'react'

import MoleHolePad from './MoleHolePad'
import Score from './Score';



export default function PlayArea() {
  const intervalHandle = useRef<any | null>(null);
  const spawnInterval = useRef<number>(2000);
  
  const [spawnSelect, setSpawnSelect] = useState<number | null>(null);
  const [moleTypeSelect, setMoleTypeSelect] = useState<string>('basic');

  const [scoreNumber, setScoreNumber] = useState<number>(0);

  const randomMoleSelect = () => {
    let randint;

    do {
      // prevent same number from being generated twice
      randint = Math.floor(Math.random() * 9);
    } while (randint === spawnSelect);

    setSpawnSelect(randint);
  }

  const randomMoleTypeSelect = () => {
    setMoleTypeSelect(Math.random() < 0.1 ? 'gold' : 'basic');
  }

  useEffect(() => {

    intervalHandle.current = setInterval(() => {
      
      if (spawnInterval.current > 800) {
        spawnInterval.current -= 60;
        clearInterval(intervalHandle.current);
      }
      randomMoleTypeSelect();
      randomMoleSelect();
    }, spawnInterval.current);

    return () => {
      clearInterval(intervalHandle.current);
    }

  }, [spawnInterval.current]);


  const handleMoleHit = (newPoints: number) => {
    setScoreNumber(scoreNumber + newPoints);
    setSpawnSelect(null);
  }


  return (
    <div style={Container}>
        <Score number={scoreNumber}/>
        <section style={GridContainer}>
          {Array.from({ length: 9 }).map((_, index) => (
            <MoleHolePad
              key={index}
              isSpawned={spawnSelect === index}
              moleType={moleTypeSelect}
              handleMoleHit={handleMoleHit}
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