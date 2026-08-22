import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

/**
 * HeroGrid — twelve hairlines that draw themselves downward on load and then
 * sit still.
 *
 * This is the hero's only background element now that the pointer field is
 * gone. It is structural rather than decorative: the same twelve-column frame
 * the layout is built on, made briefly visible. It animates once, costs one
 * paint, and never responds to the pointer — the typing line owns the
 * interaction, and two things competing for attention in one viewport is what
 * makes a page feel busy rather than considered.
 */

const COLUMNS = 12

export default function HeroGrid() {
  return (
    <div className="hero__grid" aria-hidden="true">
      <div className="hero__grid-inner">
        {Array.from({ length: COLUMNS + 1 }, (_, i) => (
          <motion.span
            key={i}
            className="hero__grid-line"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 1.4,
              delay: 0.35 + i * 0.045,
              ease: EASE,
            }}
          />
        ))}
      </div>
    </div>
  )
}
