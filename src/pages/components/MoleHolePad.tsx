import React from 'react'

import Mole from './Mole'

export default function MoleHole({isSpawned, moleType, handleMoleHit}: {isSpawned: boolean, moleType: string, handleMoleHit: (newPoints: number) => void}) {
  return (
    <div style={Container}>
        <div style={MoleHolePad}>
            <div style={Hole}></div>
            <Mole 
                isActive={isSpawned}
                type={moleType}
                handleMoleHit={handleMoleHit}
            />
        </div>
    </div>
  )
}

const Container: React.CSSProperties = {
    boxSizing: 'border-box',
    padding: '20px',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
}

const MoleHolePad: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    backgroundColor: '#CDD9FF',
    borderRadius: '10px',
    padding: '12px',
    boxSizing: 'border-box',
    position: 'relative',
}

const Hole: React.CSSProperties = {
    position: 'absolute',
    bottom: '12px',
    width: '75%',
    height: '18%',
    backgroundColor: '#06114F',
    borderRadius: '20px',
}
