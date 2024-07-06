import React from 'react'

export default function Hammer() {
  return (
    <div style={HammerContainer}>
      <div style={HammerHead}></div>
      <div style={HammerShaft}></div>
    </div>
  )
}


const HammerContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
}

const HammerHead = {
  width: '70%',
  height: '50%',
  backgroundColor: '#18253e',
  borderRadius: '5px',
}

const HammerShaft = {
  width: '15%',
  height: '100%',
  backgroundColor: '#18253e',
}