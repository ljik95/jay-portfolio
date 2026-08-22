import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/**
 * Cursor — a hairline ring trailing a small ink dot.
 *
 * Built from the same parts as the rest of the page: one-pixel rules, warm ink,
 * a single accent, and mono micro-labels. No filled discs, no colour washes,
 * nothing larger than a section number. It should read as the page's own
 * pointer rather than a widget sitting on top of it.
 *
 * It also flips to paper tones over the inverted closing spread — an ink ring
 * on a near-black background is invisible.
 *
 * Guard rails, because a custom cursor is the fastest way to make a site
 * unusable if you get it wrong:
 *   - Only on devices with a real hovering pointer. Touch never sees it, and
 *     the CSS that hides the native arrow is behind the same media query.
 *   - Disabled entirely under `prefers-reduced-motion`.
 *   - Purely additive. Keyboard focus rings, tab order, and every hit target
 *     are untouched; nothing depends on the ring being visible.
 */

export default function Cursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState({ variant: 'default', label: '', tone: 'light' })
  const [visible, setVisible] = useState(false)
  const seen = useRef(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 340, damping: 32, mass: 0.45 })
  const ringY = useSpring(y, { stiffness: 340, damping: 32, mass: 0.45 })

  useEffect(() => {
    if (reduced) return undefined
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const apply = () => setEnabled(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [reduced])

  useEffect(() => {
    if (!enabled) return undefined
    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!seen.current) {
        seen.current = true
        setVisible(true)
      }

      const el = e.target instanceof Element ? e.target : null
      const tone = el?.closest('.contact, .footer') ? 'dark' : 'light'

      const row = el?.closest('.work__row')
      if (row) {
        const open = row.getAttribute('aria-expanded') === 'true'
        setState({ variant: 'label', label: open ? 'Close' : 'Open', tone })
        return
      }
      if (el?.closest('a, button, [role="button"]')) {
        setState({ variant: 'link', label: '', tone })
        return
      }
      if (el?.closest('p, li, h1, h2, h3, .prose, .exp__bullet')) {
        setState({ variant: 'text', label: '', tone })
        return
      }
      setState({ variant: 'default', label: '', tone })
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onDown = () => setState((s) => ({ ...s, pressed: true }))
    const onUp = () => setState((s) => ({ ...s, pressed: false }))

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      <motion.span
        className="cur-dot"
        aria-hidden="true"
        data-tone={state.tone}
        style={{ x, y, opacity: visible ? 1 : 0 }}
      />
      <motion.span
        className="cur-ring"
        aria-hidden="true"
        data-variant={state.variant}
        data-tone={state.tone}
        data-pressed={state.pressed ? 'true' : 'false'}
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        {state.label && (
          <span className="cur-ring__label mono">{state.label}</span>
        )}
      </motion.span>
    </>
  )
}
