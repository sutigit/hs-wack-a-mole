import React from 'react'

export default function HitFeedBack({hitScore}: {hitScore: number}) {
  return (
    <div style={HitFeedbackStyle}>{hitScore}</div>
  )
}

const HitFeedbackStyle: React.CSSProperties = {
    fontSize: '1.9rem',
    fontWeight: 'bold',
}