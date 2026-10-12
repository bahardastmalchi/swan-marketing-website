import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Footer, Header } from '@/components/site'

type Service = {
  id: string
  short: string
  title: string
  intro: string
  items: [string, string, string] // always exactly 3 -> every card has the same size
}

const services: Service[] = [
  {
    id: 'strategy',
    short: 'Strategy',
    title: 'Strategic Foundation',
    intro: 'A clear strategy that gives your brand structure and removes guesswork.',
    items: ['Market research & insights', 'Brand positioning & messaging', 'Strategic planning & roadmaps'],
  },
  {
    id: 'identity',
    short: 'Brand identity',
    title: 'Brand Identity & Creative Direction',
    intro: 'A consistent image where every visual feels aligned and recognizable.',
    items: ['Logo & brand identity', 'Color systems & typography', 'Brand guidelines & assets'],
  },
  {
    id: 'content',
    short: 'Content',
    title: 'Content Production & Execution',
    intro: 'Content built to perform, from first concept to final delivery.',
    items: ['Concept & shoot planning', 'Production with on-set direction', 'Editing & platform-ready files'],
  },
  {
    id: 'talent',
    short: 'Models & stylists',
    title: 'Model Network, Makeup & Stylists',
    intro: 'Curated talent and styling that fit your brand and campaign.',
    items: ['Influencers, brand faces & models', 'Makeup artists', 'Fashion stylists & hairstylists'],
  },
  {
    id: 'social',
    short: 'Social media',
    title: 'Social Media Management',
    intro: 'Organized, consistent pages that stay active and on-brand.',
    items: ['Content calendars & planning', 'Daily posting & captions', 'Tracking & optimization'],
  },
  {
    id: 'growth',
    short: 'Lead generation',
    title: 'Lead Generation & Digital Growth',
    intro: 'Reach the right audience and turn attention into real leads.',
    items: ['Audience targeting & funnels', 'Campaigns on Meta & Google', 'Landing pages & lead capture'],
  },
  {
    id: 'web',
    short: 'Websites',
    title: 'Website Development',
    intro: 'Clear, modern websites that don’t just look good, they sell.',
    items: ['Design aligned with your brand', 'Simple navigation & structure', 'CTAs, lead capture & booking'],
  },
  {
    id: 'support',
    short: 'Client support',
    title: 'Client Solutions & Support',
    intro: 'More than marketing, through a network of trusted people.',
    items: ['Trusted suppliers & specialists', 'Project support & coordination', 'Business support when needed'],
  },
  {
    id: 'analytics',
    short: 'Analytics',
    title: 'Analytics & Continuous Improvement',
    intro: 'Track what works, fix what doesn’t, keep improving.',
    items: ['Performance tracking & analytics', 'Campaign monitoring & optimization', 'Customer feedback & insights'],
  },
]

export const metadata = {
  title: 'Services | Swan Marketing Agency',
  description: 'From concept to completion, we handle everything. You focus on your vision; we deliver the results.',
}

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main className="sx-page">
        <section className="sx-hero">
          <div className="sx-hero-copy">
            <p className="eyebrow">Our services</p>
            <h1>From concept to completion, we handle everything.</h1>
            <p className="sx-hero-lead">You focus on your vision; we deliver the results.</p>
          </div>
          <div className="sx-hero-visual" style={{ ['--img' as string]: "url('/services/hero.jpg')" }} aria-hidden="true" />
        </section>

        <nav className="sx-index" aria-label="Services">
          {services.map((s, i) => (
            <a key={s.id} href={`#${s.id}`}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {s.short}
            </a>
          ))}
        </nav>

        <section className="sx-list">
          {services.map((s, i) => (
            <article key={s.id} id={s.id} className="sx-card">
              <span className="sx-num">{String(i + 1).padStart(2, '0')}</span>

              <div className="sx-main">
                <h2 className="sx-title">{s.title}</h2>
                <p className="sx-intro">{s.intro}</p>
              </div>

              <ul className="sx-items">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>

              <div className="sx-media" aria-hidden="true" style={{ ['--img' as string]: `url('/services/${s.id}.jpg')` }} />
            </article>
          ))}
        </section>

        <section className="sx-cta">
          <p className="eyebrow">Swan Marketing Agency · @swan.mrkting</p>
          <h2>Let’s Create What’s Next</h2>
          <Link href="/contact" className="button button-dark">
            Get in touch <ArrowRight size={15} />
          </Link>
        </section>
      </main>

      <Footer />
    </>
  )
}