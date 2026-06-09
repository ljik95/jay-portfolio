import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// NOTE TO JAY: Replace or add personal/OSS projects. The first four are derived from your
// professional work. Add a fifth card for any personal/OSS projects + swap in real GitHub links.
const PROJECTS = [
  {
    title: 'Frontend Platform Monorepo Migration',
    type: 'Architecture Lead',
    company: 'Corteva Agriscience',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.25)',
    description:
      'Owned the full architectural migration of a core front-end platform from a multi-repo structure to a unified monorepo. Defined module boundaries, established shared tooling, and drove adoption across multiple engineering teams.',
    impact: [
      '30% reduction in page load time',
      'JS bundle size reduced by 45%',
      'CI/CD build times cut by 40% via parallelization',
      'Adopted by 3 product teams; ~2,000 lines of duplicate code eliminated',
    ],
    tags: ['TypeScript', 'React', 'Monorepo', 'Webpack', 'CI/CD', 'Nx'],
    link: null,
  },
  {
    title: 'Shared Component Library',
    type: 'Frontend Infrastructure',
    company: 'Corteva Agriscience',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.25)',
    description:
      'Designed and shipped a reusable component library from scratch to standardize UI patterns across the engineering org. Included full documentation, Storybook integration, and automated accessibility checks in CI.',
    impact: [
      '50+ production components across 3 product teams',
      'New feature UI dev time reduced by 60%',
      'Reduced design-to-code handoff time by half',
    ],
    tags: ['React', 'TypeScript', 'Storybook', 'Accessibility', 'Design System'],
    link: null,
  },
  {
    title: 'Agricultural Data Pipeline',
    type: 'Infrastructure & Backend',
    company: 'Corteva Agriscience',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.25)',
    description:
      'Designed and deployed a fully serverless data pipeline to automate a high-volume manual workflow. Built end-to-end with infrastructure as code — reproducible, auditable, and zero-ops after launch.',
    impact: [
      '50% reduction in manual processing time',
      'Processes 50K+ records per daily run',
      '99% pipeline uptime over 2+ years in production',
    ],
    tags: ['Python', 'AWS Lambda', 'Terraform', 'Data Pipeline', 'IaC'],
    link: null,
  },
  {
    title: 'Core Web Vitals Performance Overhaul',
    type: 'Performance Engineering',
    company: 'Corteva Agriscience',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.25)',
    description:
      'Led a focused performance sprint to address degraded Core Web Vitals across the main user-facing application. Audited render bottlenecks, lazy-loaded heavy routes, and optimized asset delivery and caching headers.',
    impact: [
      'LCP improved from 4.3s to 1.7s (60% faster)',
      'CLS reduced from 0.31 to 0.04',
      '22% increase in average user session duration post-launch',
    ],
    tags: ['React', 'Web Vitals', 'Lighthouse', 'Lazy Loading', 'Performance'],
    link: null,
  },
  {
    title: 'Your Personal / OSS Project',
    type: 'Personal / Open Source',
    company: null,
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.25)',
    description:
      'Add a personal project, open source contribution, or side build here. Even a small project with a live demo or GitHub link is a major signal to hiring managers — it shows you code for the love of it.',
    impact: [
      'Shows initiative outside of work',
      'Demonstrates code quality and personal taste',
      'Link to live demo or GitHub repo',
    ],
    tags: ['Your Stack', 'Here'],
    link: null,
    placeholder: true,
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{
        y: -6,
        borderColor: `${project.color}40`,
        boxShadow: `0 24px 60px ${project.glow}`,
      }}
      style={{
        background: project.placeholder
          ? `repeating-linear-gradient(
              -45deg,
              rgba(245,158,11,0.03),
              rgba(245,158,11,0.03) 10px,
              transparent 10px,
              transparent 20px
            ), var(--bg-card)`
          : 'var(--bg-card)',
        border: `1px solid ${project.placeholder ? 'rgba(245,158,11,0.2)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '32px',
        transition: 'all 0.35s',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top color band */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 3,
        background: `linear-gradient(90deg, ${project.color}, ${project.color}44)`,
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
            color: project.color, letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            {project.type}
          </span>
          {project.company && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              color: 'var(--text-muted)', marginLeft: 8,
            }}>
              @ {project.company}
            </span>
          )}
        </div>
        {project.link && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: project.color }}
            style={{
              color: 'var(--text-muted)', fontSize: '1.1rem',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
          >
            ↗
          </motion.a>
        )}
      </div>

      <h3 style={{
        fontSize: '1.1rem', fontWeight: 800,
        marginBottom: 14, color: 'var(--text-primary)',
        lineHeight: 1.3,
      }}>
        {project.title}
      </h3>

      <p style={{
        color: 'var(--text-secondary)', fontSize: '0.88rem',
        lineHeight: 1.7, marginBottom: 20,
        opacity: project.placeholder ? 0.6 : 1,
        fontStyle: project.placeholder ? 'italic' : 'normal',
      }}>
        {project.description}
      </p>

      {/* Impact bullets */}
      <div style={{
        background: `${project.color}08`,
        border: `1px solid ${project.color}20`,
        borderRadius: 10, padding: '14px 16px',
        marginBottom: 20,
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          color: project.color, letterSpacing: '0.1em',
          marginBottom: 8,
        }}>
          IMPACT
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {project.impact.map((item, i) => (
            <li key={i} style={{
              display: 'flex', gap: 8, alignItems: 'baseline',
              color: 'var(--text-secondary)', fontSize: '0.82rem',
            }}>
              <span style={{ color: project.color, fontSize: '0.6rem', flexShrink: 0 }}>▶</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 'auto' }}>
        {project.tags.map((tag) => (
          <span key={tag} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: project.color,
            background: `${project.color}12`,
            border: `1px solid ${project.color}25`,
            padding: '3px 10px', borderRadius: 20,
          }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <span className="section-label">Featured Work</span>
          <h2 className="section-title">
            Things I've <span style={{ color: '#f59e0b' }}>Built</span>
          </h2>
          <p className="section-subtitle">
            A look at the architecture decisions and systems I've owned end-to-end.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 24,
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
