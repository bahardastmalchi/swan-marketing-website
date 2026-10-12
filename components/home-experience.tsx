'use client'

import Link from 'next/link'
import { ArrowDown, ArrowUpRight, MessageCircle, Play } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { projects, services } from '@/data/content'

const STATS = [
  { to: 120, suffix: '+', label: 'Campaigns launched' },
  { to: 48, suffix: 'M', label: 'Organic views generated' },
  { to: 35, suffix: '+', label: 'Brands & creators' },
  { to: 7, suffix: '', label: 'Core disciplines' },
]

const SERVICE_NOTES = [
  'Positioning and direction before a single post is made.',
  'Identity systems that stay recognisable at every size.',
  'Short-form content built to be watched to the end.',
  'Paid and organic growth, measured week by week.',
  'Websites that load fast and convert on purpose.',
  'Creators, models and talent matched to the brief.',
  'Curated models, stylists and makeup matched to your campaign.',
]

/* 7th row of "What we do" — same shape as the services coming from data/content */
const EXTRA_SERVICE = { number: '07', title: 'Model Network, Makeup & Stylists' }

const MONTHS = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7']
const CLIENT = [100, 128, 171, 240, 330, 455, 612]
const BASELINE = [100, 104, 109, 113, 118, 122, 127]

const MANIFESTO =
  'Great content is only half the job. We bring the right people to your door and turn their attention into enquiries, bookings and clients.'

const WHATSAPP_NUMBER = '971569114768'
const WHATSAPP_DISPLAY = '+971 56 911 4768'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Swan, I'd like to get more leads for my business. Can we talk?",
)}`

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const coord = (value: number) =>
  (Math.abs(value) < 0.0005 ? 0 : value).toFixed(3)

function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (!('IntersectionObserver' in window)) {
      setSeen(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, seen] as const
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [ref, seen] = useInView<HTMLSpanElement>()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!seen) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to)
      return
    }

    let frame = 0
    const start = performance.now()

    const tick = (time: number) => {
      const progress = clamp01((time - start) / 1600)
      setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))))

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [seen, to])

  return <span ref={ref}>{value}{suffix}</span>
}

function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return
    }

    let frame = 0

    const calculate = () => {
      frame = 0
      const element = ref.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const height = window.innerHeight
      const span = rect.height - height

      setProgress(
        clamp01(
          span > 120
            ? -rect.top / span
            : (height * 0.85 - rect.top) / (height * 0.7),
        ),
      )
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(calculate)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return [ref, progress] as const
}

function Manifesto() {
  const [ref, p] = useSectionProgress<HTMLElement>()
  const words = MANIFESTO.split(' ')
  const fill = clamp01((p - 0.08) / 0.55)
  const reveal = clamp01((p - 0.3) / 0.6) * words.length
  const RX = 200
  const RY = 92
  const angle = p * Math.PI * 2

  const dotX = coord(RX * Math.cos(angle))
  const dotY = coord(RY * Math.sin(angle))

  return (
    <section className="hx-mf" ref={ref}>
      <div className="hx-mf-stage">
        <div className="hx-mf-top">
          <span>04 / Let&apos;s talk</span>
          <span className="hx-mf-geo">Dubai 25.20°N 55.27°E</span>
          <span>{p < 0.5 ? 'Attention' : 'Leads'}</span>
        </div>

        <div className="hx-mf-grid">
          <div className="hx-mf-copy">
            <h2>
              <span className="hx-mf-l1">Turn attention</span>
              <span
                className="hx-mf-l2"
                style={{ '--fill': `${fill * 100}%` } as CSSProperties}
              >
                into real leads.
              </span>
            </h2>

            <p aria-label={MANIFESTO}>
              {words.map((word, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  style={{ opacity: 0.18 + 0.82 * clamp01(reveal - i) }}
                >
                  {word}{' '}
                </span>
              ))}
            </p>

            <div className="hx-mf-cta">
              <a
                className="hx-wa"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chat with Swan on WhatsApp, ${WHATSAPP_DISPLAY}`}
              >
                <span className="hx-wa-ico">
                  <MessageCircle size={18} aria-hidden="true" />
                </span>
                <span className="hx-wa-text">
                  <strong>Chat on WhatsApp</strong>
                  <small>{WHATSAPP_DISPLAY}</small>
                </span>
                <ArrowUpRight size={16} aria-hidden="true" className="hx-wa-arrow" />
              </a>
              <p className="hx-mf-cta-note">Message us directly. No forms, no waiting.</p>
            </div>
          </div>

          <div className="hx-mf-orbit" aria-hidden="true">
            <svg viewBox="-240 -240 480 480">
              {Array.from({ length: 48 }, (_, i) => {
                const ang = (i / 48) * Math.PI * 2 - Math.PI / 2
                const r2 = i % 12 === 0 ? 220 : 228

                return (
                  <line
                    key={i}
                    x1={coord(Math.cos(ang) * 238)}
                    y1={coord(Math.sin(ang) * 238)}
                    x2={coord(Math.cos(ang) * r2)}
                    y2={coord(Math.sin(ang) * r2)}
                    className={`hx-o-tick ${i / 48 <= p ? 'is-on' : ''}`}
                  />
                )
              })}

              <g transform="rotate(-18)">
                <ellipse rx={150} ry={220} className="hx-o-ring hx-o-ring-soft" />
                <ellipse rx={RX} ry={RY} className="hx-o-ring" />
                <ellipse
                  rx={RX}
                  ry={RY}
                  pathLength={1}
                  strokeDashoffset={coord(1 - p)}
                  className="hx-o-trail"
                />
                <circle cx={dotX} cy={dotY} r={17} className="hx-o-halo" />
                <circle cx={dotX} cy={dotY} r={6.5} className="hx-o-dot" />
              </g>
            </svg>

            <div className="hx-mf-center">
              <strong>{Math.round(p * 100)}</strong>
              <span>growth</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   Service path — a smooth wave with one node per stage.
   Add / remove / reorder stages here: nodes, wave and layout adapt.

   Order follows the standard agency delivery funnel:
   strategy → identity → content → growth → analytics → support.
   ------------------------------------------------------------------ */
type Stage = { title: string; items: [string, string, string] }

const STAGES: Stage[] = [
  {
    title: 'Strategic Foundation',
    items: ['Market Research & Insights', 'Brand Positioning & Messaging', 'Strategic Planning & Roadmaps'],
  },
  {
    title: 'Brand Identity & Creative Direction',
    items: ['Comprehensive Brand Identity', 'Visual & Verbal Guidelines', 'Creative Direction & Concepts'],
  },
  {
    title: 'Content Production & Execution',
    items: [
      'Photography, Videography & Motion Graphics',
      'Model, Stylist & Talent Network',
      'Location Scouting & Production Setup',
    ],
  },
  {
    title: 'Digital Marketing & Growth',
    items: [
      'Social Media Management & Advertising',
      'SEO, Website Development & Optimization',
      'Lead Generation & Performance Marketing',
    ],
  },
  {
    title: 'Analytics & Continuous Improvement',
    items: [
      'Data-Driven Performance Analytics',
      'Campaign Monitoring & Optimization',
      'Customer Feedback & Insight Loops',
    ],
  },
  {
    title: 'Client Solutions & Support',
    items: [
      'End-to-End Business Consulting',
      'Full Project Management & Support',
      'Ongoing Business Development & Optimization',
    ],
  },
]

/* Wave geometry (SVG units). Nodes alternate peak / trough and the curve has a
   horizontal tangent at every node, so it is one smooth line. It begins with a
   flat lead-in, so there is no kink at the start. */
const WV_W = 1200
const WV_H = 200
const WV_X0 = 180
const WV_STEP = 168
const WV_TOP = 40
const WV_BOT = 160
const WV_CARD = 320

const WV_NODES = STAGES.map((_, i) => ({
  x: WV_X0 + i * WV_STEP,
  y: i % 2 === 0 ? WV_TOP : WV_BOT,
}))

function buildWavePath() {
  const first = WV_NODES[0]
  const last = WV_NODES[WV_NODES.length - 1]
  let d = `M 60 ${first.y} L ${first.x} ${first.y}`

  for (let i = 1; i < WV_NODES.length; i++) {
    const a = WV_NODES[i - 1]
    const b = WV_NODES[i]
    const h = (b.x - a.x) / 2
    d += ` C ${a.x + h} ${a.y} ${b.x - h} ${b.y} ${b.x} ${b.y}`
  }

  return `${d} L ${WV_W - 60} ${last.y}`
}

const WV_PATH = buildWavePath()

function WorkPath() {
  const flowRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<SVGPathElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const [ready, setReady] = useState(false)
  const [on, setOn] = useState(0)

  useEffect(() => {
    const flow = flowRef.current
    const trail = trailRef.current
    const dot = dotRef.current
    if (!flow || !trail || !dot) return

    const len = trail.getTotalLength()

    // where along the path each node sits (0..1)
    const fractions = WV_NODES.map((node) => {
      let lo = 0
      let hi = len
      for (let k = 0; k < 24; k++) {
        const mid = (lo + hi) / 2
        if (trail.getPointAtLength(mid).x < node.x) lo = mid
        else hi = mid
      }
      return hi / len
    })

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0

    const update = () => {
      frame = 0
      const rect = flow.getBoundingClientRect()
      const p = reduce
        ? 1
        : clamp01((window.innerHeight * 0.7 - rect.top) / (rect.height * 0.8 + 1))

      trail.style.strokeDashoffset = String(1 - p)

      const pt = trail.getPointAtLength(p * len)
      dot.style.left = `${(pt.x / WV_W) * 100}%`
      dot.style.top = `${(pt.y / WV_H) * 100}%`

      setOn(fractions.filter((f) => p >= f - 0.005).length)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    setReady(true)
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <section className="wv-section" aria-labelledby="wv-title">
      <div className="section-marker">
        <span>04.1</span>
        <span>How we work</span>
      </div>

      <div className="wv-head">
        <p className="eyebrow">Our services</p>
        <h2 id="wv-title">A path with a direction.</h2>
      </div>

      <div ref={flowRef} className={`wv-flow${ready ? ' is-ready' : ''}`}>
        <div className="wv-line" aria-hidden="true">
          <svg viewBox={`0 0 ${WV_W} ${WV_H}`} preserveAspectRatio="xMidYMid meet">
            <path className="wv-base" d={WV_PATH} />
            <path ref={trailRef} className="wv-trail" d={WV_PATH} pathLength={1} />
          </svg>

          {WV_NODES.map((node, i) => (
            <span
              key={i}
              className={`wv-node${on > i ? ' is-on' : ''}`}
              style={{
                left: `${(node.x / WV_W) * 100}%`,
                top: `${(node.y / WV_H) * 100}%`,
              }}
            />
          ))}

          <span ref={dotRef} className="wv-dot" />
        </div>

        <ol className="wv-stages">
          {STAGES.map((stage, i) => (
            <li
              key={stage.title}
              className={`wv-stage ${i % 2 === 0 ? 'is-top' : 'is-bottom'}${on > i ? ' is-on' : ''}`}
              style={
                { '--c': Math.round((WV_NODES[i].x - WV_CARD / 2) / 4) + 1 } as CSSProperties
              }
            >
              <span className="wv-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{stage.title}</h3>
              <ul>
                {stage.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function GrowthChart() {
  const [ref, seen] = useInView<HTMLDivElement>(0.35)
  const [active, setActive] = useState(MONTHS.length - 1)
  const W = 640
  const H = 300
  const PX = 36
  const PY = 28
  const MAX = 650

  const x = (i: number) => PX + (i * (W - PX * 2)) / (MONTHS.length - 1)
  const y = (value: number) => H - PY - (value / MAX) * (H - PY * 2)

  const line = (data: number[]) =>
    data.map((value, i) => `${i ? 'L' : 'M'}${coord(x(i))} ${coord(y(value))}`).join(' ')

  const delta = Math.round(
    ((CLIENT[active] - BASELINE[active]) / BASELINE[active]) * 100,
  )

  return (
    <div ref={ref} className={`hx-chart ${seen ? 'is-in' : ''}`}>
      <div className="hx-chart-readout">
        <div>
          <small>Client index · {MONTHS[active]}</small>
          <strong>{CLIENT[active]}</strong>
        </div>
        <div>
          <small>Market baseline · {MONTHS[active]}</small>
          <strong className="is-dim">{BASELINE[active]}</strong>
        </div>
        <div>
          <small>Client vs baseline · {MONTHS[active]}</small>
          <strong>+{delta}%</strong>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Client growth compared with market baseline over seven months"
      >
        {[0, 200, 400, 600].map((value) => (
          <g key={value}>
            <line
              x1={PX}
              x2={W - PX}
              y1={coord(y(value))}
              y2={coord(y(value))}
              className="hx-grid"
            />
            <text x={0} y={coord(y(value) + 3)} className="hx-axis">
              {value}
            </text>
          </g>
        ))}

        <path
          d={`${line(CLIENT)} L${coord(x(CLIENT.length - 1))} ${H - PY} L${coord(x(0))} ${H - PY} Z`}
          className="hx-area"
        />
        <path d={line(BASELINE)} pathLength={1} className="hx-line-base" />
        <path d={line(CLIENT)} pathLength={1} className="hx-line-main" />
        <line
          x1={coord(x(active))}
          x2={coord(x(active))}
          y1={PY}
          y2={H - PY}
          className="hx-cursor"
        />
        <circle
          cx={coord(x(active))}
          cy={coord(y(CLIENT[active]))}
          r={6}
          className="hx-dot"
        />

        {MONTHS.map((month, i) => (
          <g key={month}>
            <text x={coord(x(i))} y={H - 6} textAnchor="middle" className="hx-axis">
              {month}
            </text>
            <rect
              x={coord(x(i) - 28)}
              y={0}
              width={56}
              height={H}
              fill="transparent"
              tabIndex={0}
              role="button"
              aria-label={`${month}: client ${CLIENT[i]}, baseline ${BASELINE[i]}`}
              aria-pressed={active === i}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setActive(i)
                }
              }}
              style={{ cursor: 'crosshair' }}
            />
          </g>
        ))}
      </svg>

      <p className="hx-chart-note">
        Illustrative engagement index, both lines indexed to 100 at M1.
        Hover or focus a month to compare.
      </p>
    </div>
  )
}

export function HomeExperience() {
  const [pointer, setPointer] = useState({ x: 50, y: 50 })
  const [svc, setSvc] = useState(0)

  useEffect(() => {
    const move = (event: PointerEvent) => {
      setPointer({
        x: (event.clientX / Math.max(window.innerWidth, 1)) * 100,
        y: (event.clientY / Math.max(window.innerHeight, 1)) * 100,
      })
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  const list = [...services.slice(0, 6), EXTRA_SERVICE]
  const current = list[svc] ?? list[0]

  return (
    <>
      <section
        className="swan-hero"
        style={{
          '--pointer-x': `${pointer.x}%`,
          '--pointer-y': `${pointer.y}%`,
        } as CSSProperties}
      >
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-giant-word" aria-hidden="true">SWAN</div>

        <div className="hero-signal">
          <span>Dubai</span><span>Creative / Digital</span><span>01—07</span>
        </div>

        <div className="hero-installation">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="installation-image"
            src="/logo2.png"
            alt="Swan Agency logo"
            loading="eager"
            decoding="async"
          />
          <div className="installation-reflection" />
        </div>

        <div className="swan-hero-copy">
          <p className="eyebrow">A Dubai-based digital marketing &amp; creative agency</p>
          <h1>Make your brand <i>matter.</i></h1>
          <p className="hero-deck">
            Strategy, content, growth and talent for ambitious people and brands.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="button button-dark">
              Book a Consultation <ArrowUpRight size={15} />
            </Link>
            <Link href="/portfolio" className="text-link">
              Explore our work <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="hero-footer">
          <span>Move through the signal</span>
          <ArrowDown size={15} />
          <span className="hero-caption">Brands / People / Bright tomorrows</span>
        </div>
      </section>

      <section className="swan-introduction section">
        <div className="section-marker"><span>02</span><span>Introduction</span></div>
        <div className="hx-intro">
          <div className="hx-intro-head">
            <p className="eyebrow">The Swan point of view</p>
            <h2>
              We turn ideas, brands, stories and businesses into <em>visible experiences.</em>
            </h2>
          </div>
          <div className="hx-intro-side">
            <p>
              Swan brings strategic clarity, creative energy and commercial thinking
              together to create work that moves people.
            </p>
            <Link href="/about" className="text-link">
              Meet Swan <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="hx-stats">
          {STATS.map((stat) => (
            <div className="hx-stat" key={stat.label}>
              <strong><Counter to={stat.to} suffix={stat.suffix} /></strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="signal-section section">
        <div className="section-marker"><span>03</span><span>What we do</span></div>
        <div className="signal-heading">
          <p className="eyebrow">One studio. Many ways to move.</p>
          <h2>From first thought<br /><em>to lasting signal.</em></h2>
        </div>

        <div className="hx-services">
          <ul className="hx-service-list">
            {list.map((service, i) => (
              <li key={service.number}>
                <Link
                  href="/services"
                  className={`hx-service-row ${i === svc ? 'is-active' : ''}`}
                  onMouseEnter={() => setSvc(i)}
                  onFocus={() => setSvc(i)}
                >
                  <span className="hx-service-num">{service.number}</span>
                  <span className="hx-service-text">
                    <span className="hx-service-name">{service.title}</span>
                    <span className="hx-service-note">{SERVICE_NOTES[i] ?? ''}</span>
                  </span>
                  <span className="hx-service-go"><ArrowUpRight size={16} /></span>
                </Link>
              </li>
            ))}
          </ul>

          {current && (
            <aside className="hx-stage" aria-live="polite">
              <div className="hx-stage-frame">
                {/* Keep this 9:16 frame when adding your video. */}
                <span className="hx-stage-num">{current.number}</span>
                <span className="hx-stage-play">
                  <Play size={18} fill="currentColor" />
                </span>
              </div>
              <p className="hx-stage-caption">
                <strong>{current.title}</strong>
                {SERVICE_NOTES[svc] ?? ''}
              </p>
            </aside>
          )}
        </div>
      </section>

      <Manifesto />
      <WorkPath />

      <section className="hx-proof">
        <div className="hx-proof-copy">
          <p className="eyebrow">05 / Proof of work</p>
          <h2>Growth you can <em>read</em> in a line.</h2>
          <p>
            Every engagement starts with a baseline and a target. We report against
            both, every month, in plain numbers.
          </p>
          <Link href="/portfolio" className="button button-light">
            See the results <ArrowUpRight size={15} />
          </Link>
        </div>
        <GrowthChart />
      </section>

      <section className="work-section section">
        <div className="section-marker"><span>06</span><span>Selected work</span></div>
        <div className="section-head editorial-head">
          <div>
            <p className="eyebrow">A few things we have made</p>
            <h2>Work with a pulse.</h2>
          </div>
          <Link href="/portfolio" className="text-link">
            View all work <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="hx-rail" tabIndex={0} aria-label="Selected work, scroll horizontally">
          {projects.map((project, i) => (
            <Link href={`/portfolio/${project.slug}`} className="hx-card" key={project.slug}>
              <div className="hx-card-video">
                {/* Add your project video here. */}
                <span className="hx-card-idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="hx-card-play"><Play size={16} fill="currentColor" /></span>
              </div>
              <div className="hx-card-meta">
                <span>{project.category}</span><ArrowUpRight size={14} />
              </div>
              <h3>{project.title}</h3>
            </Link>
          ))}
          <Link href="/portfolio" className="hx-card hx-card-more">
            <span>View all work</span><ArrowUpRight size={28} />
          </Link>
        </div>
      </section>

      <section className="home-cta hx-cta">
        <div className="hx-cta-top">
          <span>07 / The next frame</span>
          <span>Opal Tower, Business Bay, Dubai</span>
        </div>
        <div className="hx-cta-main">
          <h2 className="hx-cta-title">
            Let&apos;s create <em>what&apos;s next.</em>
          </h2>
          <div className="hx-cta-side">
            <p>
              Tell us where your brand is and where it should be.
              We&apos;ll reply with a clear first step.
            </p>
            <Link href="/contact" className="hx-cta-button">
              <span>Book a Consultation</span>
              <i><ArrowUpRight size={16} /></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export function HomePage() {
  return <HomeExperience />
}
