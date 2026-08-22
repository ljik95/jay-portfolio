import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import { Reveal, SectionIndex, SplitWords } from '../lib/motion'

const ROLES = [
  {
    id: 'corteva-2',
    company: 'Corteva Agriscience',
    short: 'Engineer II',
    role: 'Full-Stack Software Engineer II',
    dates: 'Aug 2021 — Jun 2026',
    place: 'Champaign, IL',
    bullets: [
      <>
        Led the migration of a core front-end platform from a multi-repo setup to
        a unified <b>Nx monorepo</b>, defining the module boundaries and shared
        tooling now used by three product teams. Page load time fell{' '}
        <b>30%</b>, JS bundle size <b>45%</b>, and CI build times <b>40%</b>{' '}
        through parallelization and caching.
      </>,
      <>
        Designed a serverless data pipeline in <b>Python, AWS Lambda, and
        Terraform</b> to replace a manual workflow. It processes{' '}
        <b>50K+ records</b> per daily run and has held <b>99% uptime</b> over two
        years, cutting manual processing time in half.
      </>,
      <>
        Built a shared component library from scratch — <b>50+ components</b>,
        Storybook docs, and accessibility checks in CI. New-feature UI work
        dropped about <b>60%</b>, and design-to-code handoff was cut in half.
      </>,
      <>
        Mentored junior engineers through code review, pairing, and architecture
        walkthroughs, and authored the team's coding standards —{' '}
        <b>later adopted org-wide</b>.
      </>,
    ],
  },
  {
    id: 'corteva-1',
    company: 'Corteva Agriscience',
    short: 'Engineer I',
    role: 'Full-Stack Software Engineer I',
    dates: 'Nov 2019 — Aug 2021',
    place: 'Champaign, IL',
    bullets: [
      <>
        Built and maintained core features for a global agricultural management
        app serving <b>15,000+ active users</b>, shipping production TypeScript
        and React.
      </>,
      <>
        Raised test coverage from <b>38% to 82%</b> by introducing TDD across the
        team, which cut the critical-bug rate <b>35%</b> and roughly halved time
        spent in QA.
      </>,
      <>
        Worked directly with PMs and designers to turn ambiguous requirements
        into features that shipped on schedule.
      </>,
    ],
  },
  {
    id: 'tfk',
    company: 'Tech for Korea',
    short: 'Intern',
    role: 'Front-End Engineer Intern',
    dates: 'Oct 2018 — Mar 2019',
    place: 'Remote',
    bullets: [
      <>
        Rebuilt the UI architecture on four projects and introduced the team's
        first unit tests. The redesigns lifted task-completion rates{' '}
        <b>28%</b> and the tests cut regression bugs <b>40%</b>.
      </>,
    ],
  },
]

function Entry({ role, index, onActive }) {
  const ref = useRef(null)
  // A band across the middle of the viewport: whichever entry crosses it drives
  // the sticky rail on the left.
  const inView = useInView(ref, { margin: '-42% 0px -42% 0px' })

  useEffect(() => {
    if (inView) onActive(role.id)
  }, [inView, role.id, onActive])

  return (
    <Reveal className="exp__entry" ref={ref} delay={index * 0.05}>
      <div className="exp__head">
        <div>
          <span className="exp__co">{role.company}</span>
          <h3 className="exp__role">{role.role}</h3>
        </div>
        <span className="exp__dates">
          {role.dates} · {role.place}
        </span>
      </div>

      <ul className="exp__bullets">
        {role.bullets.map((b, i) => (
          <li className="exp__bullet" key={i}>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

export default function Experience() {
  const [active, setActive] = useState(ROLES[0].id)
  const sectionRef = useRef(null)

  // A hairline beside the rail that fills as you move through the section —
  // it turns the sticky column into a progress indicator rather than a label.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 55%', 'end 65%'],
  })
  const fill = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section id="experience" className="section" ref={sectionRef}>
      <div className="shell exp__grid">
        <div className="exp__aside">
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <SectionIndex index="03" label="Experience" />
            <h2 className="sec-title">
              <SplitWords text="Seven years, one long arc." delay={0.06} />
            </h2>
          </div>

          {/* Sticky rail — tracks where you are in the section. */}
          <div className="rail" aria-hidden="true">
            <span className="rail__track">
              <motion.span className="rail__fill" style={{ scaleY: fill }} />
            </span>
            {ROLES.map((r) => (
              <div className="rail__item" key={r.id} data-active={active === r.id}>
                <span className="rail__tick" />
                <span>
                  <span className="rail__co">{r.company}</span>
                  <span className="rail__yrs">
                    {r.short} · {r.dates}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="exp__list">
          {ROLES.map((r, i) => (
            <Entry key={r.id} role={r} index={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  )
}
