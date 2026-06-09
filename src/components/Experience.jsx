import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EXPERIENCES = [
  {
    company: 'Corteva Agriscience',
    location: 'Champaign, IL',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.25)',
    roles: [
      {
        title: 'Full-Stack Software Engineer II',
        period: 'Aug 2021 — Present',
        bullets: [
          'Owned the architectural design and led the full migration of a core front-end platform to a monorepo — drove a 30% page load improvement, reduced JS bundle size by 45%, and cut CI build times by 40% through parallelization and aggressive caching strategies.',
          'Designed and shipped a shared component library adopted by 3 product teams, reducing new feature UI development time by 60% and eliminating over 2,000 lines of duplicate component code across the codebase.',
          'Designed and deployed a serverless data pipeline (Python + AWS Lambda + Terraform), eliminating a critical manual bottleneck, cutting processing time by 50%.',
          'Mentored junior engineers through code reviews, pair programming, and architectural walkthroughs — Established team coding standards later adopted org-wide.',
        ],
        tags: ['TypeScript', 'React', 'Python', 'AWS Lambda', 'Terraform', 'Monorepo', 'IaC'],
      },
      {
        title: 'Full-Stack Software Engineer I',
        period: 'Nov 2019 — Aug 2021',
        bullets: [
          'Built and maintained core features for a global agricultural management application serving 15,000+ active users, shipping production-ready TypeScript/React code in a fast-moving agile environment.',
          'Drove test coverage from 38% to 82% by championing TDD practices across the team — reduced critical bug rate by 35% and halved average time spent in QA cycles.',
          'Partnered closely with product managers and designers to translate ambiguous requirements into clean, well-documented code — consistently shipping on time with a near-zero regression rate.',
        ],
        tags: ['TypeScript', 'React', 'Agile', 'REST API', 'TDD'],
      },
    ],
  },
  {
    company: 'Tech for Korea',
    location: 'Remote',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.25)',
    roles: [
      {
        title: 'Front End Engineer Intern',
        period: 'Oct 2018 — Mar 2019',
        bullets: [
          'Modernized UI architectures across 4+ projects — implemented comprehensive redesigns that improved user task completion rate by 28% and introduced unit testing practices that reduced regression bugs by 40%.',
        ],
        tags: ['JavaScript', 'React', 'Unit Testing', 'UI/UX'],
      },
    ],
  },
]

function ExperienceCard({ exp, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      style={{ position: 'relative', paddingLeft: 40 }}
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
        style={{
          position: 'absolute', left: -8, top: 24,
          width: 16, height: 16, borderRadius: '50%',
          background: exp.color,
          boxShadow: `0 0 20px ${exp.glow}`,
          zIndex: 2,
        }}
      />

      {/* Company header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <h3 style={{
            fontSize: '1.4rem', fontWeight: 800,
            color: exp.color,
          }}>
            {exp.company}
          </h3>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}>
            {exp.location}
          </span>
        </div>
      </div>

      {/* Roles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {exp.roles.map((role, ri) => (
          <motion.div
            key={ri}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 + ri * 0.1 + 0.3 }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '24px 28px',
              transition: 'border-color 0.3s, background 0.3s',
              position: 'relative',
              overflow: 'hidden',
            }}
            whileHover={{
              borderColor: `${exp.color}40`,
              background: 'rgba(255,255,255,0.06)',
            }}
          >
            {/* Accent bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: 3, height: '100%',
              background: exp.color,
              borderRadius: '4px 0 0 4px',
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {role.title}
                </h4>
                {role.current && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    color: '#34d399',
                    background: 'rgba(52,211,153,0.12)',
                    border: '1px solid rgba(52,211,153,0.3)',
                    padding: '2px 8px', borderRadius: 20,
                    letterSpacing: '0.06em',
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: '#34d399',
                      boxShadow: '0 0 6px #34d399',
                      animation: 'pulse-glow 2s ease-in-out infinite',
                      display: 'inline-block',
                    }} />
                    CURRENT
                  </span>
                )}
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                color: 'var(--text-muted)',
                background: 'rgba(255,255,255,0.04)',
                padding: '4px 10px', borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.07)',
                whiteSpace: 'nowrap',
              }}>
                {role.period}
              </span>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {role.bullets.map((b, bi) => (
                <li key={bi} style={{ display: 'flex', gap: 10, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <span style={{ color: exp.color, flexShrink: 0, marginTop: 2, fontSize: '0.7rem' }}>▶</span>
                  {b}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {role.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                  color: exp.color,
                  background: `${exp.color}15`,
                  border: `1px solid ${exp.color}30`,
                  padding: '3px 10px', borderRadius: 20,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <span className="section-label">Career</span>
          <h2 className="section-title">
            Work <span style={{ color: '#7c3aed' }}>Experience</span>
          </h2>
          <p className="section-subtitle">
            7+ years building production-grade software across global teams.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, #7c3aed, #06b6d4, transparent)',
            opacity: 0.3,
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>

        {/* Education */}
        <EducationSection />
      </div>
    </section>
  )
}

const EDUCATION = [
  {
    school: 'Fullstack Academy',
    location: 'Chicago, IL',
    degree: 'Full Stack Software Engineering',
    period: '2018 – 2019',
    desc: 'Top-ranked, full-time program. Built real-world web & mobile apps with JavaScript, React, React Native, SQL, HTML/CSS.',
    color: '#f59e0b',
  },
  {
    school: 'University of Illinois at Urbana-Champaign',
    location: 'Champaign, IL',
    degree: 'B.S. Chemistry',
    period: '2013 – 2018',
    desc: 'Originally on a pre-dental track — until I discovered programming and realized I\'d found something I actually loved. The analytical rigor from chemistry translated directly into engineering, and I\'ve never looked back.',
    color: '#ec4899',
  },
]

function EducationSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{ marginTop: 80 }}
    >
      <span className="section-label">Education</span>
      <h2 className="section-title" style={{ marginBottom: 32 }}>
        Academic <span style={{ color: '#f59e0b' }}>Background</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {EDUCATION.map((ed, i) => (
          <motion.div
            key={ed.school}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            whileHover={{ borderColor: `${ed.color}40`, background: 'rgba(255,255,255,0.06)' }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '24px 28px',
              transition: 'all 0.3s',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: 3,
              background: `linear-gradient(90deg, ${ed.color}, ${ed.color}44)`,
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{ed.school}</h4>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ed.period}</span>
            </div>
            <div style={{
              fontWeight: 600, fontSize: '0.88rem',
              color: ed.color, marginBottom: 10,
            }}>
              {ed.degree}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{ed.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
