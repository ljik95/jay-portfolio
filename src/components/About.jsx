import { Reveal, SectionIndex, SplitWords } from '../lib/motion'

const FACTS = [
  { key: 'Based', val: 'Champaign, Illinois — open to remote or relocation' },
  { key: 'Front end', val: 'React · TypeScript · Design systems · Web performance' },
  { key: 'Back end', val: 'Node · Python · PostgreSQL · REST APIs' },
  { key: 'Infra', val: 'AWS Lambda · Terraform · CI/CD · Docker' },
  { key: 'Studied', val: 'B.S. Chemistry, UIUC · Fullstack Academy immersive' },
]

const PRINCIPLES = [
  {
    title: 'Systems thinking, not ticket throughput',
    desc: "I don't stop at the feature. Restructuring a front-end platform or designing a serverless data pipeline, I'm optimizing for what's still true in two years — module boundaries that hold, and a codebase the team can move quickly inside.",
  },
  {
    title: 'Outcomes I can point at',
    desc: 'I instrument the work, watch what actually changes for users and for the team, and let that evidence pick the next decision. Every number on this page came from something I measured before and after.',
  },
  {
    title: 'Comfortable in the ambiguity',
    desc: "Seven years sitting between engineering, product, and design has made me good at the messy part: turning a half-formed requirement into something scoped, shipped on schedule, and still standing after real users get to it.",
  },
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="shell about__grid">
        {/* --- Sticky aside ---------------------------------------------- */}
        <div className="about__aside">
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <SectionIndex index="01" label="About" />
            <h2 className="sec-title">
              <SplitWords text="I optimize for the next engineer." delay={0.06} />
            </h2>
          </div>

          <Reveal className="facts" delay={0.2}>
            {FACTS.map((f) => (
              <div className="fact" key={f.key}>
                <span className="fact__key mono">{f.key}</span>
                <span className="fact__val">{f.val}</span>
              </div>
            ))}
          </Reveal>
        </div>

        {/* --- Body ------------------------------------------------------ */}
        <div>
          <Reveal className="prose">
            Full-stack, and I mean it in both directions. React and TypeScript
            at the point where front-end decisions start to compound — module
            boundaries, shared tooling, bundle budgets, the CI that keeps all
            three honest — and the Node, Python, and PostgreSQL services behind
            them, on infrastructure I wrote in Terraform.
          </Reveal>

          <Reveal className="prose" delay={0.1}>
            At Corteva Agriscience I moved from shipping individual features to
            owning platform-level decisions on both sides of the API: the kind
            that cut page load times by a third, retire a manual workflow
            entirely, and leave three product teams moving faster years later. I
            write the standards down, then I mentor people through them.
          </Reveal>

          <div className="principles">
            {PRINCIPLES.map((p, i) => (
              <Reveal className="principle" key={p.title} delay={i * 0.08}>
                <span className="principle__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="principle__title">{p.title}</h3>
                  <p className="principle__desc">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
