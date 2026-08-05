import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '32px 24px',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          © {new Date().getFullYear()}{' '}
          <span style={{
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            fontWeight: 700,
          }}>
            Jay Thom
          </span>
          . Built with React + Framer Motion.
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { label: 'GitHub', href: 'https://github.com/ljik95' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/jongikthom' },
            { label: 'Email', href: 'mailto:ljik95@gmail.com' },
          ].map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              whileHover={{ color: '#a78bfa' }}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}
