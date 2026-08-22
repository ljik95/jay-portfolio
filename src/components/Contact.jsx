import { MaskLine, Reveal, SectionIndex } from '../lib/motion'

const LINKS = [
  {
    key: 'LinkedIn',
    val: 'in/jongikthom',
    href: 'https://linkedin.com/in/jongikthom',
  },
  {
    key: 'GitHub',
    val: 'github.com/ljik95',
    href: 'https://github.com/ljik95',
  },
  {
    key: 'Resume',
    val: 'PDF, one page',
    href: '/Jay_Thom_Resume.pdf',
  },
  {
    key: 'Based in',
    val: 'Champaign, IL — remote or relocation',
    href: null,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="shell">
        <div className="sec-head">
          <SectionIndex index="05" label="Contact" />
        </div>

        <h2 className="contact__title">
          <MaskLine delay={0.05}>Let's build</MaskLine>
          <MaskLine delay={0.13}>
            something <em>that lasts</em>.
          </MaskLine>
        </h2>

        <Reveal className="contact__lead" delay={0.2}>
          I'm looking for Senior Software Engineer and Senior Front-End
          Developer roles — ideally somewhere the architecture is the hard part,
          on either side of the API. If that sounds like your team, I'd like to
          hear about it.
        </Reveal>

        <Reveal delay={0.26}>
          <a className="mail" href="mailto:ljik95@gmail.com">
            ljik95@gmail.com
          </a>
        </Reveal>

        <Reveal className="contact__links" delay={0.32}>
          {LINKS.map((l) => {
            const external = l.href?.startsWith('http')
            const Tag = l.href ? 'a' : 'div'
            return (
              <Tag
                className="contact__link"
                key={l.key}
                href={l.href ?? undefined}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
              >
                <span className="contact__link-key mono">{l.key}</span>
                <span className="contact__link-val">
                  {l.val}
                  {l.href && <span className="arrow" aria-hidden="true">↗</span>}
                </span>
              </Tag>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
