import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'

/**
 * Marquee — a band of the stack that drifts sideways, and reacts to how fast
 * you are scrolling.
 *
 * Scroll velocity feeds two things: the band speeds up (and flips direction
 * when you scroll up), and it skews slightly, so a fast flick through the page
 * visibly drags on it. Scroll-linked rather than time-linked motion is what
 * makes it feel connected to the reader instead of decorating around them.
 *
 * Under `prefers-reduced-motion` it renders as a static, centred line of the
 * same content.
 */

const ITEMS = [
  'TypeScript',
  'React',
  'Design systems',
  'Nx monorepo',
  'Storybook',
  'Accessibility',
  'Web performance',
  'LLM agents',
  'RAG',
  'Node.js',
  'Python',
  'PostgreSQL',
  'AWS Lambda',
  'Terraform',
  'CI/CD',
  'Datadog',
  'Test-driven development',
]

/** Keep a number inside [min, max) — the copies wrap seamlessly. */
function wrap(min, max, v) {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

function Row() {
  return (
    <span className="marquee__row" aria-hidden="true">
      {ITEMS.map((item) => (
        <span className="marquee__item" key={item}>
          {item}
          <span className="marquee__dot">·</span>
        </span>
      ))}
    </span>
  )
}

export default function Marquee({ baseVelocity = -2.6 }) {
  const reduced = useReducedMotion()

  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)

  const smooth = useSpring(scrollVelocity, {
    damping: 48,
    stiffness: 380,
  })
  // Map raw scroll velocity onto a multiplier. Clamped so a trackpad fling
  // cannot launch the band across the screen.
  const factor = useTransform(smooth, [-1800, 0, 1800], [-4, 0, 4], {
    clamp: true,
  })
  const skew = useTransform(smooth, [-1800, 0, 1800], [4, 0, -4], { clamp: true })
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    let move = direction.current * baseVelocity * (delta / 1000)

    // Scrolling up drags the band the other way.
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1

    move += direction.current * move * f
    baseX.set(baseX.get() + move)
  })

  // Four copies, wrapped over a quarter of the total width.
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)

  if (reduced) {
    return (
      <div className="marquee marquee--static">
        <div className="marquee__track">
          <Row />
        </div>
      </div>
    )
  }

  return (
    <div className="marquee">
      <motion.div className="marquee__track" style={{ x, skewX: skew }}>
        <Row />
        <Row />
        <Row />
        <Row />
      </motion.div>
    </div>
  )
}
