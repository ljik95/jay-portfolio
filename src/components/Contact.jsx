import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LINKS = [
  {
    label: 'Email',
    value: 'ljik95@gmail.com',
    href: 'mailto:ljik95@gmail.com',
    icon: '✉',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.4)',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/jongikthom',
    href: 'https://linkedin.com/in/jongikthom',
    icon: 'in',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.4)',
    isText: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/ljik95',
    href: 'https://github.com/ljik95',
    icon: '</>',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.4)',
    isText: true,
  },
  {
    label: 'Phone',
    value: '(253) 886-0919',
    href: 'tel:+12538860919',
    icon: '☎',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.4)',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>
            Let's Connect
          </span>
          <h2 className="section-title">
            Get In <span style={{ color: '#ec4899' }}>Touch</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)', fontSize: '1.05rem',
            maxWidth: 500, margin: '0 auto',
          }}>
            I'm actively looking for Senior Software Engineer and Senior Frontend Developer roles.
            If you have an opportunity, I'd love to talk.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: 20, flexWrap: 'wrap', marginBottom: 56,
        }}>
          {LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              whileHover={{
                y: -6,
                boxShadow: `0 20px 50px ${link.glow}`,
                borderColor: `${link.color}50`,
              }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px 32px',
                textDecoration: 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                minWidth: 200, maxWidth: 260, width: '100%',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: `${link.color}18`,
                border: `1px solid ${link.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: link.isText ? '0.85rem' : '1.3rem',
                fontWeight: link.isText ? 800 : undefined,
                color: link.color,
                fontFamily: link.isText ? 'var(--font-sans)' : undefined,
              }}>
                {link.icon}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                  {link.label}
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {link.value}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(236,72,153,0.1))',
            border: '1px solid rgba(124,58,237,0.25)',
            borderRadius: 'var(--radius-xl)',
            padding: '48px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background decoration */}
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: -40, left: -40,
            width: 160, height: 160, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.2), transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 800, marginBottom: 12 }}>
              Ready to build something{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                great?
              </span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: '1rem' }}>
              I'm available for senior-level roles. Let's talk about how I can contribute to your team.
            </p>
            <motion.a
              href="mailto:ljik95@gmail.com"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(124,58,237,0.6)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                color: '#fff',
                padding: '14px 36px',
                borderRadius: 50,
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              Send Me a Message →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
