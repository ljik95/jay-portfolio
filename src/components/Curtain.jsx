import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../lib/motion'

/**
 * Curtain — a paper panel over the first paint that lifts away after ~900ms.
 *
 * Rules it follows so it stays a flourish rather than a tax:
 *   - It never blocks content. Everything is already in the DOM and painted
 *     underneath; this is an overlay, not a gate. Crawlers and screen readers
 *     see the page immediately.
 *   - It runs once per browsing session. Coming back from a tab or hitting the
 *     back button does not replay it.
 *   - Under `prefers-reduced-motion` it does not render at all.
 *   - `aria-hidden` throughout, and it releases the scroll lock on exit.
 */

const KEY = 'jt.curtain.seen'
// Kept deliberately short: the curtain sits in front of the largest
// contentful paint, so every extra 100ms here is 100ms of LCP.
const HOLD_MS = 480

export default function Curtain() {
  const reduced = useReducedMotion()

  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false
    try {
      return sessionStorage.getItem(KEY) !== '1'
    } catch {
      // private mode, storage disabled — showing it once is the safe fallback
      return true
    }
  })

  useEffect(() => {
    if (!show || reduced) {
      setShow(false)
      return undefined
    }
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* nothing to do — the curtain just replays next visit */
    }

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => setShow(false), HOLD_MS)

    return () => {
      clearTimeout(t)
      document.body.style.overflow = prev
    }
  }, [reduced, show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="curtain"
          aria-hidden="true"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="curtain__inner shell">
            <motion.span
              className="curtain__mark mono"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="curtain__dot" />
              Jay Thom — Senior Software Engineer
            </motion.span>

            <span className="curtain__rule">
              <motion.span
                className="curtain__rule-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: HOLD_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
              />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
