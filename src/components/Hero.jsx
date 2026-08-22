import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroGrid from './HeroGrid'
import TypeLine from './TypeLine'
import { EASE, Magnetic, MaskLineOnLoad } from '../lib/motion'

// The statement, as typed segments. `em` marks the accented words.
const STATEMENT = [
  [{ text: 'Interfaces, APIs, infrastructure —' }],
  [{ text: 'built to ' }, { text: 'hold up', em: true }, { text: ' at scale.' }],
]

export default function Hero() {
  const ref = useRef(null)

  // Content lifts and dissolves slightly as the hero leaves — the page feels
  // like one continuous surface rather than a stack of screens.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section className="hero" ref={ref} aria-label="Introduction">
      <HeroGrid />

      <motion.div className="hero__inner" style={{ y, opacity }}>
        <div className="shell">
          {/* --- Eyebrow ------------------------------------------------- */}
          <motion.div
            className="hero__eyebrow mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          >
            <span className="hero__who">
              <span>Senior Software Engineer</span>
              <span className="hero__eyebrow-sep hero__eyebrow-sep--wide">/</span>
              <span className="hero__loc">Champaign, IL — remote or relocation</span>
            </span>

            <span className="hero__status">
              <span className="hero__status-dot" />
              Open to senior roles
            </span>
          </motion.div>

          {/* --- The name is the headline -------------------------------- */}
          <h1 className="hero__name">
            <MaskLineOnLoad delay={0.1} duration={0.75}>Jay Thom</MaskLineOnLoad>
          </h1>

          {/* --- What he does, typed out --------------------------------- */}
          <TypeLine lines={STATEMENT} startDelay={620} />

          {/* --- Lead + actions ------------------------------------------ */}
          <div className="hero__body">
            <motion.p
              className="hero__lead"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.34, ease: EASE }}
            >
              Seven years shipping production software end to end — React and
              TypeScript at the scale where front-end architecture starts to
              matter, Node, Python, and PostgreSQL services behind it, and the
              AWS and Terraform infrastructure it all runs on.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.42, ease: EASE }}
            >
              <Magnetic>
                <a className="btn btn--solid" href="#contact">
                  Get in touch
                  <span className="btn__arrow" aria-hidden="true">↗</span>
                </a>
              </Magnetic>
              {/* The resume lives in the nav, permanently — no need to repeat
                  it here. This slot points at the work instead. */}
              <Magnetic>
                <a className="btn btn--ghost btn--down" href="#work">
                  See the work
                  <span className="btn__arrow" aria-hidden="true">↓</span>
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div
            className="hero__scroll mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
          >
            <span className="hero__scroll-line" aria-hidden="true" />
            Scroll
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
