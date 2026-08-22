import { forwardRef, Fragment, useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * Motion vocabulary for the whole site.
 *
 *   Reveal     — content rises a short distance and fades in.
 *   MaskLine   — a line of display type slides up out of an overflow mask.
 *   SplitWords — the same, but word by word with a slight rotation.
 *   Magnetic   — an element leans toward the pointer while it is nearby.
 *
 * Keeping the vocabulary small is deliberate. A page where every element enters
 * differently reads as a demo; a page where everything enters from the same
 * small set of gestures reads as a designed object.
 *
 * `MotionConfig reducedMotion="user"` in App.jsx drops the transforms (keeping
 * the opacity fade) when the OS asks for reduced motion, so nothing here needs
 * its own guard.
 */

export const EASE = [0.16, 1, 0.3, 1]

export const DUR = {
  fast: 0.35,
  base: 0.65,
  slow: 0.95,
}

/** Standard viewport trigger: fire once, a little before the element is centered. */
export const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' }

export const Reveal = forwardRef(function Reveal(
  { children, delay = 0, y = 22, duration = DUR.base, as = 'div', ...rest },
  ref
) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
})

/**
 * One line of display type, revealed from behind a mask.
 *
 * The trigger has to live on the *wrapper*, not the travelling span. At rest the
 * inner span sits 112% below the wrapper, which clips it — and a clipped element
 * never intersects the viewport, so an observer attached to it would wait
 * forever. The wrapper is unclipped, so it fires on time and hands the state
 * down through variants.
 */
export function MaskLine({ children, delay = 0, duration = DUR.slow, className }) {
  return (
    <motion.span
      className={['mask', className].filter(Boolean).join(' ')}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <motion.span
        style={{ display: 'block' }}
        variants={{ hidden: { y: '112%' }, visible: { y: '0%' } }}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

/** Same as MaskLine but plays on mount rather than on scroll — for the hero. */
export function MaskLineOnLoad({ children, delay = 0, duration = DUR.slow, className }) {
  return (
    <span className={['mask', className].filter(Boolean).join(' ')}>
      <motion.span
        style={{ display: 'block' }}
        initial={{ y: '112%' }}
        animate={{ y: '0%' }}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/**
 * A heading revealed word by word, each word rising out of its own mask with a
 * small rotation so the line assembles rather than simply appearing.
 *
 * Words, never letters: per-letter animation on a long heading reads as a tech
 * demo, and it shreds the line for screen readers. Here the full string stays
 * intact in an sr-only node and the animated words are hidden from the a11y
 * tree.
 */
export function SplitWords({ text, delay = 0, stagger = 0.055, className }) {
  const words = String(text).split(' ')

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
          // The separating space lives *outside* the mask: a trailing space
          // inside an overflow-hidden inline-block collapses, and the words
          // would run together.
          <Fragment key={`${word}-${i}`}>
            <span className="mask mask--inline">
              <motion.span
                style={{ display: 'inline-block', transformOrigin: '0% 100%' }}
                variants={{
                  hidden: { y: '108%', rotate: 4 },
                  visible: { y: '0%', rotate: 0 },
                }}
                transition={{ duration: DUR.slow, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </motion.span>
  )
}

/**
 * Leans toward the pointer while it is nearby, then springs back. Applied
 * sparingly — the two hero buttons and the nav resume link — so it reads as
 * attention to detail rather than a gimmick applied to everything.
 */
export function Magnetic({ children, strength = 0.32, radius = 90, className }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    if (Math.hypot(dx, dy) > radius + Math.max(r.width, r.height) / 2) return
    x.set(dx * strength)
    y.set(dy * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x, y, display: 'inline-flex' }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </motion.span>
  )
}

/**
 * The numbered index row: 02 / SELECTED WORK / ————————
 *
 * The number drifts against the scroll and the rule draws itself across. Every
 * section uses this one implementation, so the numbering reads as a system.
 */
export function SectionIndex({ index, label }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const numY = useTransform(scrollYProgress, [0, 1], [14, -14])

  return (
    <Reveal className="sec-index" y={12} duration={DUR.fast} ref={ref}>
      <motion.span className="sec-index__num" style={{ y: numY }}>
        {index}
      </motion.span>
      <span>{label}</span>
      <motion.span
        className="sec-index__rule"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.1, delay: 0.12, ease: EASE }}
      />
    </Reveal>
  )
}

/**
 * Section header: numbered index row, serif title assembled word by word, and
 * an optional lead.
 */
export function SectionHead({ index, label, title, lead, className }) {
  return (
    <div className={['sec-head', className].filter(Boolean).join(' ')}>
      <SectionIndex index={index} label={label} />

      <h2 className="sec-title">
        <SplitWords text={title} delay={0.06} />
      </h2>

      {lead && (
        <Reveal className="sec-lead" delay={0.2} y={16}>
          {lead}
        </Reveal>
      )}
    </div>
  )
}
