import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { EASE } from '../lib/motion'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [stuck, setStuck] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  })

  // Solidify the bar once the hero's top edge is gone, and flip it to the
  // inverted palette while the dark closing spread is passing underneath —
  // otherwise a light bar floats over a black page and the seam shows.
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setStuck(window.scrollY > 40)
      const contact = document.getElementById('contact')
      if (contact) {
        const { top, bottom } = contact.getBoundingClientRect()
        const line = 34 // half the nav height — the bar's own midline
        setDark(top <= line && bottom > line)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Active section. rootMargin biases the trigger line to a third of the way
  // down the viewport, which matches where the eye actually sits when reading.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-33% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Lock the page while the mobile menu is open, and close it on Escape.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />

      <nav className="nav" data-stuck={stuck} data-theme={dark ? 'dark' : 'light'} aria-label="Primary">
        <div className="shell nav__inner">
          <a className="nav__mark mono" href="#top" aria-label="Jay Thom — back to top">
            <span className="nav__dot" aria-hidden="true" />
            Jay Thom
          </a>

          <div className="nav__links mono">
            {LINKS.map((link) => (
              <a
                key={link.id}
                className="nav__link"
                href={`#${link.id}`}
                data-active={active === link.id}
                aria-current={active === link.id ? 'true' : undefined}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav__pill"
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                )}
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav__actions">
            <a
              className="btn btn--ghost btn--down nav__cta"
              href="/Jay_Thom_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
              <span className="btn__arrow" aria-hidden="true">↓</span>
            </a>

            <button
              className="nav__burger"
              data-open={open}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.id}
                className="menu__link"
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06 * i, ease: EASE }}
              >
                <span className="menu__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </motion.a>
            ))}

            <motion.a
              className="btn btn--solid btn--down"
              style={{ marginTop: 32, alignSelf: 'flex-start' }}
              href="/Jay_Thom_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36, ease: EASE }}
            >
              Download resume
              <span className="btn__arrow" aria-hidden="true">↓</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
