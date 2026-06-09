import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILL_CATEGORIES = [
  {
    label: 'Frontend',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.3)',
    icon: '◈',
    skills: ['TypeScript', 'React', 'Vue', 'HTML', 'CSS'],
  },
  {
    label: 'Backend',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.3)',
    icon: '⬡',
    skills: ['Python', 'NodeJS', 'PostgreSQL', 'REST API'],
  },
  {
    label: 'DevOps & Cloud',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.3)',
    icon: '◎',
    skills: ['AWS Lambda', 'Terraform', 'CI/CD', 'Git'],
  },
  {
    label: 'Practices',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
    icon: '◆',
    skills: ['Agile Methodologies', 'Test Driven Development', 'Monorepo Architecture', 'Integration Testing'],
  },
]

function SkillCategory({ cat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{
        borderColor: `${cat.color}40`,
        background: 'rgba(255,255,255,0.05)',
        boxShadow: `0 0 40px ${cat.glow}`,
      }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 28px',
        transition: 'all 0.3s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner glow */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 120, height: 120,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${cat.color}20, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: `${cat.color}18`,
          border: `1px solid ${cat.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem', color: cat.color,
        }}>
          {cat.icon}
        </div>
        <h3 style={{
          fontSize: '0.95rem', fontWeight: 700,
          color: cat.color,
        }}>
          {cat.label}
        </h3>
      </div>

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {cat.skills.map((skill, si) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + si * 0.05 + 0.2 }}
            whileHover={{
              scale: 1.08,
              background: `${cat.color}25`,
              boxShadow: `0 0 12px ${cat.color}40`,
            }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '6px 14px',
              borderRadius: 50,
              cursor: 'default',
              transition: 'all 0.2s',
              display: 'inline-block',
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section id="skills" className="section" style={{
      background: 'linear-gradient(180deg, transparent 0%, rgba(124,58,237,0.04) 50%, transparent 100%)',
    }}>
      <div className="container">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <span className="section-label">Capabilities</span>
          <h2 className="section-title">
            Technical{' '}
            <span style={{ color: '#06b6d4' }}>Skills</span>
          </h2>
          <p className="section-subtitle">
            A full-stack toolkit honed across 7+ years of production engineering.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
        }}>
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCategory key={cat.label} cat={cat} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
