import { useEffect, useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const ROLES = [
  'Senior Software Engineer',
  'Senior Frontend Developer',
  'Full-Stack Engineer',
  'React & TypeScript Expert',
]

function useTypewriter(words, { enabled = true, speed = 80, pause = 1800 } = {}) {
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const current = words[wordIdx]
    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx((i) => (i + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause, enabled])

  // Reduced motion: skip the animation and just state the primary role.
  if (!enabled) return words[0]
  return words[wordIdx].slice(0, charIdx)
}

const TECH_STACK = ['TypeScript', 'React', 'Next.js', 'Python', 'Node.js', 'AWS', 'Terraform']

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const role = useTypewriter(ROLES, { enabled: !reduceMotion })
  const canvasRef = useRef(null)

  // Particle canvas. Skipped entirely under reduced motion — no rAF loop,
  // no listener, nothing painted.
  useEffect(() => {
    if (reduceMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    // CSS pixel dimensions; the backing store is scaled by DPR below.
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      // Reset before scaling so repeated resizes don't compound the transform.
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        color: ['#7c3aed', '#ec4899', '#06b6d4', '#f59e0b'][Math.floor(Math.random() * 4)],
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > w) p.dx *= -1
        if (p.y < 0 || p.y > h) p.dy *= -1
      })
      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [reduceMotion])

  // Blobs stay visible under reduced motion, they just stop drifting.
  const drift = (x, y, duration, delay = 0) =>
    reduceMotion
      ? {}
      : {
          animate: { x, y },
          transition: { duration, repeat: Infinity, ease: 'easeInOut', delay },
        }

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Particle canvas — decorative only */}
      {!reduceMotion && (
        <canvas ref={canvasRef} aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        }} />
      )}

      {/* Gradient blobs */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div
          {...drift([0, 60, -30, 0], [0, -40, 60, 0], 20)}
          style={{
            position: 'absolute', top: '-10%', left: '-5%',
            width: 600, height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          {...drift([0, -50, 40, 0], [0, 60, -30, 0], 25, 3)}
          style={{
            position: 'absolute', top: '20%', right: '-10%',
            width: 500, height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          {...drift([0, 40, -60, 0], [0, -50, 30, 0], 22, 6)}
          style={{
            position: 'absolute', bottom: '5%', left: '30%',
            width: 450, height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 72 }}>
        <div style={{ maxWidth: 740 }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(124,58,237,0.12)',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: 50, padding: '6px 16px',
              marginBottom: 28,
            }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#06b6d4',
              boxShadow: '0 0 8px #06b6d4',
              animation: 'pulse-glow 2s ease-in-out infinite',
              display: 'inline-block',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
              color: '#a78bfa', letterSpacing: '0.08em',
            }}>
              Open to new opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: 16,
            }}
          >
            Hi, I'm{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 4s ease infinite',
            }}>
              Jay Thom
            </span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.7rem)',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: 24,
              minHeight: '2.2em',
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            {/* The visible text retypes constantly, which a screen reader would
                announce on every keystroke. Hide it and expose a stable label. */}
            <span className="sr-only">{ROLES.join(', ')}</span>
            <span aria-hidden="true" style={{ color: 'var(--grad-3)' }}>{'>'}</span>
            <span aria-hidden="true" style={{ fontFamily: 'var(--font-mono)' }}>{role}</span>
            {!reduceMotion && (
              <span aria-hidden="true" style={{
                display: 'inline-block', width: 3, height: '1.2em',
                background: 'var(--grad-2)',
                borderRadius: 2,
                animation: 'blink 1s step-end infinite',
                marginLeft: 2,
              }} />
            )}
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: 600,
              marginBottom: 40,
            }}
          >
            I architect and ship{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>production-grade full-stack systems</span>{' '}
            — from front-end platforms and design systems to the cloud infrastructure underneath them.
            I care about{' '}
            <span style={{ color: '#a78bfa', fontWeight: 600 }}>clean architecture</span>,{' '}
            <span style={{ color: '#67e8f9', fontWeight: 600 }}>thoughtful user experience</span>, and writing
            code that teams can keep building on for years.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(124,58,237,0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: 50,
                fontSize: '0.95rem',
                fontWeight: 700,
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                border: 'none',
                letterSpacing: '0.02em',
              }}
            >
              View My Work
            </motion.button>
            <motion.a
              href="/Jay_Thom_Resume.pdf"
              download
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--text-primary)',
                padding: '14px 32px',
                borderRadius: 50,
                fontSize: '0.95rem',
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.12)',
                transition: 'all 0.2s',
                letterSpacing: '0.02em',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: '1rem' }}>↓</span> Download Resume
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'transparent',
                color: 'var(--text-secondary)',
                padding: '14px 24px',
                borderRadius: 50,
                fontSize: '0.95rem',
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                border: '1px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              Get In Touch →
            </motion.button>
          </motion.div>

          {/* Tech stack strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              STACK
            </span>
            <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.1)' }} />
            {TECH_STACK.map((t) => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                color: 'var(--text-secondary)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '3px 10px', borderRadius: 20,
              }}>{t}</span>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute', bottom: 32, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          color: 'var(--text-muted)', fontSize: '0.7rem',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
        }}
      >
        <span>SCROLL</span>
        <motion.div
          {...(reduceMotion
            ? {}
            : { animate: { y: [0, 8, 0] }, transition: { duration: 1.5, repeat: Infinity } })}
          style={{
            width: 20, height: 32,
            border: '2px solid rgba(255,255,255,0.15)',
            borderRadius: 10,
            display: 'flex', justifyContent: 'center', paddingTop: 5,
          }}
        >
          <div style={{
            width: 4, height: 8,
            background: 'linear-gradient(to bottom, #7c3aed, #ec4899)',
            borderRadius: 2,
          }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
