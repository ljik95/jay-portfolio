import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * TypeLine — the hero statement types itself out.
 *
 * Two decisions worth knowing about:
 *
 * 1. Nothing is appended. Every character is in the DOM from the first frame;
 *    characters past the cursor are just dimmed. So the line never reflows, the
 *    layout below it never jumps, and there is no cumulative layout shift to
 *    pay for at load.
 *
 * 2. The animated characters are `aria-hidden` and the whole string is repeated
 *    in an `sr-only` node. A screen reader gets one clean sentence instead of
 *    fifty-odd single-character spans.
 *
 * Under `prefers-reduced-motion` the line renders complete on the first frame
 * and the replay control simply does nothing visible.
 */

const CHAR_MS = 26 // base pace
const JITTER_MS = 34 // extra, randomised — an even cadence reads robotic
const PAUSE_MS = 260 // held at punctuation and line ends

export default function TypeLine({ lines, startDelay = 0, onDone }) {
  const reduced = useReducedMotion()

  // Flatten to a character list once; each entry remembers its line, whether it
  // is accented, and whether the cursor should linger on it.
  const chars = useMemo(() => {
    const out = []
    lines.forEach((segments, lineIndex) => {
      segments.forEach((seg) => {
        for (const ch of seg.text) {
          out.push({
            ch,
            em: !!seg.em,
            line: lineIndex,
            pause: ch === ',' || ch === '.' || ch === '—',
          })
        }
      })
      if (lineIndex < lines.length - 1) {
        out.push({ ch: '\n', line: lineIndex, br: true, pause: true })
      }
    })
    return out
  }, [lines])

  const total = chars.length
  const [count, setCount] = useState(reduced ? total : 0)
  const [running, setRunning] = useState(false)
  const timer = useRef(null)

  const plain = useMemo(
    () => lines.map((segs) => segs.map((s) => s.text).join('')).join(' '),
    [lines]
  )

  const stop = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }, [])

  const run = useCallback(
    (from = 0) => {
      stop()
      if (reduced) {
        setCount(total)
        onDone?.()
        return
      }
      setRunning(true)
      let i = from
      const step = () => {
        i += 1
        setCount(i)
        if (i >= total) {
          setRunning(false)
          onDone?.()
          return
        }
        const c = chars[i - 1]
        const wait =
          (c?.pause ? PAUSE_MS : 0) + CHAR_MS + Math.random() * JITTER_MS
        timer.current = setTimeout(step, wait)
      }
      timer.current = setTimeout(step, 0)
    },
    [chars, onDone, reduced, stop, total]
  )

  useEffect(() => {
    if (reduced) {
      setCount(total)
      return undefined
    }
    setCount(0)
    timer.current = setTimeout(() => run(0), startDelay)
    return stop
  }, [reduced, run, startDelay, stop, total])

  const replay = () => {
    setCount(0)
    run(0)
  }

  const done = count >= total

  return (
    <div className="type">
      <span className="sr-only">{plain}</span>

      <p className="hero__statement type__text" aria-hidden="true">
        {chars.map((c, i) => {
          if (c.br) return <br key={`br-${i}`} />
          return (
            <span
              key={`${c.ch}-${i}`}
              className={[
                'type__char',
                i < count ? 'is-typed' : 'is-ghost',
                c.em ? 'is-em' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {c.ch === ' ' ? ' ' : c.ch}
              {i === count - 1 && !done && <i className="type__caret" />}
            </span>
          )
        })}
        {done && !reduced && <i className="type__caret type__caret--rest" />}
      </p>

      <button
        className="type__replay mono"
        onClick={replay}
        disabled={running}
        aria-label="Replay the typing animation"
      >
        <span className="type__replay-icon" aria-hidden="true">↻</span>
        Replay
      </button>
    </div>
  )
}
