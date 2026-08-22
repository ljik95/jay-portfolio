import { Fragment } from 'react'
import { Reveal, SectionHead } from '../lib/motion'

const GROUPS = [
  {
    key: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'SQL'],
  },
  {
    key: 'Front end',
    items: [
      'React',
      'Next.js',
      'Vue',
      'Redux',
      'State management',
      'Storybook',
      'Vite',
      'Accessibility',
      'HTML',
      'CSS',
    ],
  },
  {
    key: 'Back end',
    items: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'REST APIs'],
  },
  {
    // TDD and integration testing moved here from Practices — they were the
    // only two entries doing double duty, and they read as testing, not habits.
    key: 'Testing',
    items: [
      'Jest',
      'Vitest',
      'React Testing Library',
      'Playwright',
      'Test-driven development',
      'Integration testing',
    ],
  },
  {
    key: 'Cloud & DevOps',
    items: ['AWS Lambda', 'Terraform', 'Docker', 'Datadog', 'CI/CD', 'Git'],
  },
  {
    key: 'AI engineering',
    items: [
      'LLM agents',
      'Tool calling',
      'RAG',
      'LangChain',
      'pgvector',
      'Claude',
      'Cursor',
    ],
  },
  {
    key: 'Practices',
    items: ['Code review', 'Technical writing', 'Agile', 'Mentoring'],
  },
]

const EDUCATION = [
  {
    school: 'Fullstack Academy',
    where: 'Chicago, IL · 2018–2019',
    note: 'Full-time software engineering immersive. Built web and mobile apps with JavaScript, React, React Native, SQL, and HTML/CSS.',
  },
  {
    school: 'University of Illinois at Urbana-Champaign',
    where: 'Champaign, IL · 2013–2018',
    note: 'B.S. in Chemistry. Moved into software after discovering programming mid-degree — the lab work is where the habit of measuring before and after came from.',
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="shell">
        <SectionHead
          index="04"
          label="Capabilities"
          title="What I reach for."
        />

        <div className="skills__list">
          {GROUPS.map((group, gi) => (
            <Reveal className="skill-row" key={group.key} delay={gi * 0.06}>
              <span className="skill-row__key mono">{group.key}</span>
              <span className="skill-row__items">
                {group.items.map((item, i) => (
                  <Fragment key={item}>
                    <span className="skill">{item}</span>
                    {i < group.items.length - 1 && (
                      <span className="skill-sep" aria-hidden="true">·</span>
                    )}
                  </Fragment>
                ))}
              </span>
            </Reveal>
          ))}
        </div>

        <div className="edu">
          {EDUCATION.map((e, i) => (
            <Reveal className="edu__item" key={e.school} delay={i * 0.08}>
              <h4>{e.school}</h4>
              <span className="edu__where mono">{e.where}</span>
              <p className="edu__note">{e.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
