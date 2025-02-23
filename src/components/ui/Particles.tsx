'use client'

import { useEffect, useRef } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
}

export default function Particles({
  className = '',
  quantity = 80,
  staticity = 30,
  ease = 30,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useMousePosition()
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const particles = useRef<any[]>([])
  const animationFrame = useRef<number>()

  useEffect(() => {
    if (mousePosition.x !== null && mousePosition.y !== null) {
      mouse.current.x = mousePosition.x
      mouse.current.y = mousePosition.y
    }
  }, [mousePosition.x, mousePosition.y])

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const createParticles = () => {
      const particles: any[] = []
      for (let i = 0; i < quantity; i++) {
        particles.push({
          x: Math.random() * canvasRef.current!.width,
          y: Math.random() * canvasRef.current!.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 2 + 1,
        })
      }
      return particles
    }

    particles.current = createParticles()

    const animate = () => {
      if (!canvasRef.current || !ctx) return

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      particles.current.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvasRef.current!.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvasRef.current!.height) particle.vy *= -1

        const dx = mouse.current.x - particle.x
        const dy = mouse.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < staticity) {
          const angle = Math.atan2(dy, dx)
          const force = (staticity - distance) / staticity
          particle.vx += Math.cos(angle) * force / ease
          particle.vy += Math.sin(angle) * force / ease
        }

        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrame.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [quantity, staticity, ease, refresh])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
    />
  )
} 