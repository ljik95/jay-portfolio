import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { EASE, Reveal, SectionHead } from '../lib/motion'

const WORK = [
  {
    id: 'monorepo',
    title: 'Monorepo platform migration',
    role: 'Architecture lead',
    org: 'Corteva Agriscience',
    desc: 'Owned the migration of a core front-end platform from a scattered multi-repo setup to a single Nx monorepo. I defined the module boundaries, built the shared tooling, and drove adoption across three product teams — then parallelized and cached the pipeline so the bigger repo built faster than the small ones had.',
    impact: [
      'Page load time down 30%',
      'JavaScript bundle size down 45%',
      'CI build times down 40% via parallelization and caching',
      '~2,000 lines of duplicated code retired; adopted by 3 teams',
    ],
    tags: ['TypeScript', 'React', 'Nx', 'Webpack', 'CI/CD'],
    link: null,
  },
  {
    id: 'design-system',
    title: 'A design system, from scratch',
    role: 'Front-end infrastructure',
    org: 'Corteva Agriscience',
    desc: 'Built the shared component library the org had been missing: 50+ production components with Storybook documentation and automated accessibility checks wired into CI, so a regression fails the build rather than reaching a user. The handoff between design and engineering stopped being a translation step.',
    impact: [
      '50+ components in production across 3 teams',
      'New-feature UI work down roughly 60%',
      'Design-to-code handoff time cut in half',
      'Accessibility checks enforced in CI, not reviewed by hand',
    ],
    tags: ['React', 'TypeScript', 'Storybook', 'Accessibility', 'Design systems'],
    link: null,
  },
  {
    id: 'pipeline',
    title: 'Serverless data pipeline',
    role: 'Infrastructure & backend',
    org: 'Corteva Agriscience',
    desc: 'Replaced a manual, error-prone workflow with a fully serverless pipeline defined in code. Reproducible, auditable, and zero-ops after launch — it has been running unattended for over two years.',
    impact: [
      '50K+ records processed per daily run',
      '99% uptime across 2+ years in production',
      'Manual processing time cut in half',
      'Infrastructure fully described in Terraform',
    ],
    tags: ['Python', 'AWS Lambda', 'Terraform', 'IaC'],
    link: null,
  },
  {
    id: 'analyst',
    title: 'AI portfolio analyst',
    role: 'Personal project',
    org: null,
    desc: 'A conversational analyst for investment portfolios. Upload a brokerage CSV and ask about returns, risk exposure, or sector concentration in plain language — an LLM agent answers with tool access to live market data and SEC filings, streaming the response as it reasons.',
    impact: [
      'Claude agent with tool calling over market, EDGAR, and news data',
      'RAG pipeline on PostgreSQL + pgvector for filing retrieval',
      'Next.js 14 App Router front end with streamed responses',
      'Containerized with Docker Compose; CI on GitHub Actions',
    ],
    tags: ['Next.js', 'TypeScript', 'FastAPI', 'LangChain', 'pgvector', 'Docker'],
    link: 'https://github.com/ljik95/stock-portfolio-analyst',
  },
]

function WorkItem({ item, index, open, onToggle }) {
  const [hover, setHover] = useState(false)
  const num = String(index + 1).padStart(2, '0')
  const panelId = `work-panel-${item.id}`

  return (
    <Reveal
      className="work__item"
      delay={index * 0.06}
      data-hot={hover}
      data-open={open}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      <span className="work__wash" aria-hidden="true" />

      <button
        className="work__row"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="work__num">{num}</span>
        <span className="work__title">{item.title}</span>
        <span className="work__meta mono">
          {item.role}
          {item.org && ` · ${item.org}`}
        </span>
        <span className="work__toggle" aria-hidden="true" />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            className="work__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="work__panel-inner">
              <span aria-hidden="true" />
              <div className="work__detail">
                <div>
                  <p className="work__desc">{item.desc}</p>
                  <div className="work__tags">
                    {item.tags.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                  {item.link && (
                    <a
                      className="work__link link-draw mono"
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View source
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>

                <div>
                  <div className="mono" style={{ color: 'var(--accent)', marginBottom: 12 }}>
                    Impact
                  </div>
                  <ul className="impact">
                    {item.impact.map((line) => (
                      <li className="impact__row" key={line}>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  )
}

export default function Work() {
  // Accordion — one row open at a time, and nothing open to begin with.
  const [openId, setOpenId] = useState(null)

  // The first row opens itself once the list scrolls into view, so the visitor
  // watches it happen and learns the rows are interactive. It fires once, and
  // it backs off if they have already opened something themselves — being
  // overridden by the animation you triggered is the worst version of this.
  const listRef = useRef(null)
  const listInView = useInView(listRef, { once: true, margin: '0px 0px -25% 0px' })
  const autoOpened = useRef(false)
  const touched = useRef(false)

  useEffect(() => {
    if (!listInView || autoOpened.current) return undefined
    autoOpened.current = true
    const t = setTimeout(() => {
      if (!touched.current) setOpenId(WORK[0].id)
    }, 520)
    return () => clearTimeout(t)
  }, [listInView])

  const toggle = (id) => {
    touched.current = true
    setOpenId((cur) => (cur === id ? null : id))
  }

  return (
    <section id="work" className="section">
      <div className="shell">
        <SectionHead
          index="02"
          label="Selected work"
          title="Four things I owned end to end."
          lead="The architecture calls, and the numbers that moved because of them. Open any row for the detail."
        />

        <div className="work__list" ref={listRef}>
          {WORK.map((item, i) => (
            <WorkItem
              key={item.id}
              item={item}
              index={i}
              open={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
