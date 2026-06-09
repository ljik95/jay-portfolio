import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const VALUE_PROPS = [
  {
    icon: '⬡',
    color: '#7c3aed',
    title: 'Systems Thinker',
    desc: 'I don\'t just write features — I look at the whole system. Whether migrating a platform to a monorepo or designing a serverless pipeline, I optimize for long-term scalability and team velocity.',
  },
  {
    icon: '◈',
    color: '#ec4899',
    title: 'Measurable Impact',
    desc: 'I track outcomes, not output. My work has delivered 30% performance improvements and 50% reductions in manual processing time — engineering decisions backed by real data.',
  },
  {
    icon: '◎',
    color: '#06b6d4',
    title: 'Cross-Functional Collaborator',
    desc: 'I\'ve consistently bridged the gap between engineering, product, and design. Complex user requirements become clean, production-ready code — on time and built to last.',
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="about" className="section" style={{
      background: 'linear-gradient(180deg, transparent 0%, rgba(6,182,212,0.03) 50%, transparent 100%)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 64,
          alignItems: 'center',
        }}>
          {/* Left: Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              Engineering that{' '}
              <span style={{ color: '#f1f5f9' }}>actually ships</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: 20 }}>
              I'm a full-stack software engineer with 7+ years turning complex problems into clean,
              scalable solutions. My background spans frontend-heavy product work in React and TypeScript,
              backend systems in Python and Node.js, and cloud infrastructure on AWS.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: 32 }}>
              At Corteva Agriscience I grew from shipping individual features to leading
              platform-level architectural decisions — the kind that reduce page load times, eliminate
              manual bottlenecks, and set the team up to move faster for years to come.
            </p>
          </motion.div>

          {/* Right: Value props */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {VALUE_PROPS.map((vp, i) => (
              <motion.div
                key={vp.title}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 + 0.2 }}
                whileHover={{
                  borderColor: `${vp.color}40`,
                  background: 'rgba(255,255,255,0.05)',
                  x: 4,
                }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px 24px',
                  display: 'flex', gap: 16, alignItems: 'flex-start',
                  transition: 'all 0.25s',
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  background: `${vp.color}15`,
                  border: `1px solid ${vp.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', color: vp.color,
                }}>
                  {vp.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>
                    {vp.title}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.65 }}>
                    {vp.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
