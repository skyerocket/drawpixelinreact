import React, { useRef, useEffect } from 'react'

const Canvas = ({ drawing }) => {
  
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.canvas.width = 256
    ctx.canvas.height = 128
    drawing.map((color, i) => {
      ctx.fillStyle = color
      ctx.fillRect(Math.round(i % 256) * 1, Math.floor(i / 256) * 1, 1, 1)
    })  
  }, [])

  return <canvas ref={canvasRef}/>
}

export default Canvas