"use client"

import { useEffect, useRef } from "react"

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full window size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    handleResize()
    window.addEventListener("resize", handleResize)

    // Star properties
    const stars: Star[] = []
    const starCount = Math.floor((canvas.width * canvas.height) / 10000) // Adjust density
    
    // Star class
    class Star {
      x: number
      y: number
      size: number
      opacity: number
      blinkSpeed: number
      maxOpacity: number
      
      constructor(width: number, height: number) {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 2 + 0.5
        this.opacity = Math.random()
        this.blinkSpeed = Math.random() * 0.05
        this.maxOpacity = 0.5 + Math.random() * 0.5
      }
      
      update() {
        this.opacity += this.blinkSpeed
        
        if (this.opacity > this.maxOpacity || this.opacity < 0) {
          this.blinkSpeed = -this.blinkSpeed
        }
      }
      
      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(152, 255, 152, ${this.opacity})`
        ctx.fill()
      }
    }
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star(canvas.width, canvas.height))
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw and update stars
      stars.forEach(star => {
        star.update()
        star.draw()
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-black to-gray-900"
    />
  )
}