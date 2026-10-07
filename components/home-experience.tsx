'use client'

import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { projects, services } from '@/data/content'

/* ---------- Editable data (replace with real numbers) ---------- */
const STATS = [
  { to: 120, suffix: '+', label: 'Campaigns launched' },
  { to: 48, suffix: 'M', label: 'Organic views generated' },
  { to: 35, suffix: '+', label: 'Brands & creators' },
  { to: 6, suffix: '', label: 'Core disciplines' },
]
const SERVICE_NOTES = [
  'Positioning and direction before a single post is made.',
  'Identity systems that stay recognisable at every size.',
  'Short-form content built to be watched to the end.',
  'Paid and organic growth, measured week by week.',
  'Websites that load fast and convert on purpose.',
  'Creators, models and talent matched to the brief.',
]
const MONTHS = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7']
const CLIENT = [100, 128, 171, 240, 330, 455, 612]
const BASELINE = [100, 104, 109, 113, 118, 122, 127]

function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen] as const
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [ref, seen] = useInView<HTMLSpanElement>()
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!seen) return
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1600, 1)
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, to])
  return <span ref={ref}>{v}{suffix}</span>
}

const MANIFESTO = 'We believe the best work is both considered and alive: a clear idea, given a point of view, then set in motion.'
const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setP(1); return }
    let raf = 0
    const calc = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const span = r.height - vh
      setP(clamp01(span > 120 ? -r.top / span : (vh * 0.85 - r.top) / (vh * 0.7)))
    }
    const q = () => { if (!raf) raf = requestAnimationFrame(calc) }
    q()
    window.addEventListener('scroll', q, { passive: true })
    window.addEventListener('resize', q)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', q); window.removeEventListener('resize', q) }
  }, [])
  return [ref, p] as const
}

/* Scroll-driven manifesto: "movement" fills with ink while a dot travels its orbit */
function Manifesto() {
  const [ref, p] = useSectionProgress<HTMLElement>()
  const words = MANIFESTO.split(' ')
  const fill = clamp01((p - 0.08) / 0.55)
  const reveal = clamp01((p - 0.3) / 0.6) * words.length
  const RX = 200, RY = 92
  const a = p * Math.PI * 2
  return (
    <section className="hx-mf" ref={ref}>
      <div className="hx-mf-stage">
        <div className="hx-mf-top"><span>04 / How we think</span><span className="hx-mf-geo">Dubai 25.20°N 55.27°E</span><span>{p < 0.5 ? 'Meaning' : 'Movement'}</span></div>
        <div className="hx-mf-grid">
          <div className="hx-mf-copy">
            <h2>
              <span className="hx-mf-l1">Make meaning.</span>
              <span className="hx-mf-l2" style={{ '--fill': `${fill * 100}%` } as React.CSSProperties}>Make movement.</span>
            </h2>
            <p aria-label={MANIFESTO}>
              {words.map((w, i) => <span key={i} aria-hidden="true" style={{ opacity: 0.18 + 0.82 * clamp01(reveal - i) }}>{w} </span>)}
            </p>
            <ul className="hx-mf-pills" aria-hidden="true">
              {[['Considered', 0.3], ['Alive', 0.55], ['In motion', 0.8]].map(([l, th]) => <li key={l as string} className={p >= (th as number) ? 'is-on' : ''}>{l}</li>)}
            </ul>
          </div>
          <div className="hx-mf-orbit" aria-hidden="true">
            <svg viewBox="-240 -240 480 480">
              {Array.from({ length: 48 }, (_, i) => {
                const ang = (i / 48) * Math.PI * 2 - Math.PI / 2
                const r2 = i % 12 === 0 ? 220 : 228
                return <line key={i} x1={Math.cos(ang) * 238} y1={Math.sin(ang) * 238} x2={Math.cos(ang) * r2} y2={Math.sin(ang) * r2} className={`hx-o-tick ${i / 48 <= p ? 'is-on' : ''}`} />
              })}
              <g transform="rotate(-18)">
                <ellipse rx={150} ry={220} className="hx-o-ring hx-o-ring-soft" />
                <ellipse rx={RX} ry={RY} className="hx-o-ring" />
                <ellipse rx={RX} ry={RY} pathLength={1} strokeDashoffset={1 - p} className="hx-o-trail" />
                <circle cx={RX * Math.cos(a)} cy={RY * Math.sin(a)} r={17} className="hx-o-halo" />
                <circle cx={RX * Math.cos(a)} cy={RY * Math.sin(a)} r={6.5} className="hx-o-dot" />
              </g>
            </svg>
            <div className="hx-mf-center"><strong>{Math.round(p * 100)}</strong><span>in motion</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Work path: a wave that draws as you scroll ---------- */
const FLOW = [
  { title: 'Your Vision', lead: 'At Swan, we take the time to understand your goals, your market, and your direction.' },
  { title: 'Our Direction', lead: 'We build a clear strategy that gives your brand structure and removes guesswork.', list: ['Market research and insights', 'Brand positioning and messaging', 'Strategic planning and roadmaps'] },
  { title: 'Strong Strategy', lead: 'Every step is planned to support real and consistent results.', note: 'Throughout our partnership, we stay in close contact with regular sessions to share ideas, set goals, and define clear next steps. We review everything together, improve what\u2019s needed, and keep the strategy simple, clear, and focused on results.' },
]
const H_PATH = 'M0 120 C50 120 50 50 100 50 C300 50 300 170 500 170 C700 170 700 50 900 50 C1050 50 1050 120 1200 120'
const V_PATH = 'M60 0 C60 100 84 100 84 200 C84 400 36 400 36 600 C36 800 84 800 84 1000 C84 1100 60 1100 60 1200'
const H_NODE = [{ x: 100, y: 50 }, { x: 500, y: 170 }, { x: 900, y: 50 }]
const V_NODE = [{ x: 84, y: 200 }, { x: 36, y: 600 }, { x: 84, y: 1000 }]

function WorkPath() {
  const box = useRef<HTMLDivElement>(null)
  const hRef = useRef<SVGPathElement>(null)
  const vRef = useRef<SVGPathElement>(null)
  const [p, setP] = useState(0)
  const [vert, setVert] = useState(false)
  const [pt, setPt] = useState({ hx: 0, hy: 120, vx: 60, vy: 0 })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 800px)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sync = () => setVert(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    let raf = 0
    const calc = () => {
      raf = 0
      const el = box.current, h = hRef.current, v = vRef.current
      if (!el || !h || !v) return
      const r = el.getBoundingClientRect()
      const next = reduce ? 1 : clamp01((window.innerHeight * 0.7 - r.top) / (r.height * 0.9 + 1))
      try {
        const a = h.getPointAtLength(h.getTotalLength() * next)
        const b = v.getPointAtLength(v.getTotalLength() * next)
        setPt({ hx: a.x, hy: a.y, vx: b.x, vy: b.y })
      } catch { /* ignore */ }
      setP(next)
    }
    const q = () => { if (!raf) raf = requestAnimationFrame(calc) }
    q()
    window.addEventListener('scroll', q, { passive: true })
    window.addEventListener('resize', q)
    return () => { cancelAnimationFrame(raf); mq.removeEventListener('change', sync); window.removeEventListener('scroll', q); window.removeEventListener('resize', q) }
  }, [])

  const on = (i: number) => (vert ? pt.vy >= V_NODE[i].y - 4 : pt.hx >= H_NODE[i].x - 4)
  const pos = (hx: number, hy: number, vx: number, vy: number) =>
    ({ '--dx': `${hx / 12}%`, '--dy': `${hy / 2.2}%`, '--mx': `${vx / 1.2}%`, '--my': `${vy / 12}%` }) as React.CSSProperties

  return (
    <section className="hx-path">
      <div className="section-marker"><span>04.1</span><span>How we work</span></div>
      <div className="hx-path-head"><p className="eyebrow">Strategy</p><h2>A path with a direction.</h2></div>
      <div className="hx-flow" ref={box}>
        <div className="hx-flow-line" data-vert={vert}>
          <svg className="hx-flow-h" viewBox="0 0 1200 220" aria-hidden="true">
            <path d={H_PATH} className="hx-flow-base" />
            <path ref={hRef} d={H_PATH} pathLength={1} strokeDashoffset={1 - p} className="hx-flow-trail" />
          </svg>
          <svg className="hx-flow-v" viewBox="0 0 120 1200" preserveAspectRatio="none" aria-hidden="true">
            <path d={V_PATH} className="hx-flow-base hx-flow-base-v" />
            <path ref={vRef} d={V_PATH} pathLength={1} strokeDashoffset={1 - p} className="hx-flow-trail hx-flow-base-v" />
          </svg>
          {FLOW.map((_, i) => <span key={i} className={`hx-node ${on(i) ? 'is-on' : ''}`} style={pos(H_NODE[i].x, H_NODE[i].y, V_NODE[i].x, V_NODE[i].y)} />)}
          <span className="hx-flow-dot" style={pos(pt.hx, pt.hy, pt.vx, pt.vy)} />
        </div>
        <div className="hx-flow-cards">
          {FLOW.map((s, i) => (
            <article key={s.title} className={`hx-step ${on(i) ? 'is-on' : ''}`}>
              <h3>{s.title}</h3>
              <p className="hx-step-lead">{s.lead}</p>
              {s.list && <div className="hx-step-extra"><span className="hx-step-label">Our services</span><ul>{s.list.map(l => <li key={l}>{l}</li>)}</ul></div>}
              {s.note && <div className="hx-step-extra"><span className="hx-step-label">Note</span><p className="hx-step-note">{s.note}</p></div>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function GrowthChart() {
  const [ref, seen] = useInView<HTMLDivElement>(0.35)
  const [active, setActive] = useState(MONTHS.length - 1)
  const W = 640, H = 300, PX = 36, PY = 28, MAX = 650
  const x = (i: number) => PX + (i * (W - PX * 2)) / (MONTHS.length - 1)
  const y = (v: number) => H - PY - (v / MAX) * (H - PY * 2)
  const line = (d: number[]) => d.map((v, i) => `${i ? 'L' : 'M'}${x(i)} ${y(v)}`).join(' ')
  return (
    <div ref={ref} className={`hx-chart ${seen ? 'is-in' : ''}`}>
      <div className="hx-chart-readout">
        <div><small>Client index · {MONTHS[active]}</small><strong>{CLIENT[active]}</strong></div>
        <div><small>Market baseline</small><strong className="is-dim">{BASELINE[active]}</strong></div>
        <div><small>Difference</small><strong>+{Math.round(((CLIENT[active] - BASELINE[active]) / BASELINE[active]) * 100)}%</strong></div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Client growth compared with market baseline over seven months">
        {[0, 200, 400, 600].map(g => <g key={g}><line x1={PX} x2={W - PX} y1={y(g)} y2={y(g)} className="hx-grid" /><text x={0} y={y(g) + 3} className="hx-axis">{g}</text></g>)}
        <path d={`${line(CLIENT)} L${x(CLIENT.length - 1)} ${H - PY} L${x(0)} ${H - PY} Z`} className="hx-area" />
        <path d={line(BASELINE)} pathLength={1} className="hx-line-base" />
        <path d={line(CLIENT)} pathLength={1} className="hx-line-main" />
        <line x1={x(active)} x2={x(active)} y1={PY} y2={H - PY} className="hx-cursor" />
        <circle cx={x(active)} cy={y(CLIENT[active])} r={6} className="hx-dot" />
        {MONTHS.map((m, i) => (
          <g key={m}>
            <text x={x(i)} y={H - 6} textAnchor="middle" className="hx-axis">{m}</text>
            <rect x={x(i) - 28} y={0} width={56} height={H} fill="transparent" tabIndex={0} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} style={{ cursor: 'crosshair' }} aria-label={`${m}: ${CLIENT[i]}`} />
          </g>
        ))}
      </svg>
      <p className="hx-chart-note">Illustrative engagement index, start = 100. Hover a month to compare.</p>
    </div>
  )
}

export function HomeExperience() {
  const [pointer, setPointer] = useState({ x: 50, y: 50 })
  const [svc, setSvc] = useState(0)
  useEffect(() => {
    const move = (event: PointerEvent) => setPointer({ x: (event.clientX / window.innerWidth) * 100, y: (event.clientY / window.innerHeight) * 100 })
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])
  const list = services.slice(0, 6)
  const current = list[svc]
  return <>
    {/* 01 — HERO (unchanged) */}
    <section className="swan-hero" style={{ '--pointer-x': `${pointer.x}%`, '--pointer-y': `${pointer.y}%` } as React.CSSProperties}>
      <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
      <div className="hero-giant-word" aria-hidden="true">SWAN</div>
      <div className="hero-signal"><span>Dubai</span><span>Creative / Digital</span><span>01—07</span></div>
      <div className="hero-installation"><div className="installation-image" /><div className="installation-reflection" /></div>
      <div className="swan-hero-copy"><p className="eyebrow">A Dubai-based digital marketing & creative agency</p><h1>Make your brand <i>matter.</i></h1><p className="hero-deck">Strategy, content, growth and talent for ambitious people and brands.</p><div className="hero-actions"><Link href="/contact" className="button button-dark">Book a Consultation <ArrowUpRight size={15} /></Link><Link href="/portfolio" className="text-link">Explore our work <ArrowUpRight size={15} /></Link></div></div>
      <div className="hero-footer"><span>Move through the signal</span><ArrowDown size={15} /><span className="hero-caption">Brands / People / Bright tomorrows</span></div>
    </section>

    {/* 02 — INTRODUCTION + COUNTERS */}
    <section className="swan-introduction section">
      <div className="section-marker"><span>02</span><span>Introduction</span></div>
      <div className="hx-intro">
        <div className="hx-intro-head"><p className="eyebrow">The Swan point of view</p><h2>We turn ideas, brands, stories and businesses into <em>visible experiences.</em></h2></div>
        <div className="hx-intro-side"><p>Swan brings strategic clarity, creative energy and commercial thinking together to create work that moves people.</p><Link href="/about" className="text-link">Meet Swan <ArrowUpRight size={15} /></Link></div>
      </div>
      <div className="hx-stats">{STATS.map(s => <div className="hx-stat" key={s.label}><strong><Counter to={s.to} suffix={s.suffix} /></strong><span>{s.label}</span></div>)}</div>
    </section>

    {/* 03 — SERVICES: interactive index + video stage */}
    <section className="signal-section section">
      <div className="section-marker"><span>03</span><span>What we do</span></div>
      <div className="signal-heading"><p className="eyebrow">One studio. Many ways to move.</p><h2>From first thought<br /><em>to lasting signal.</em></h2></div>
      <div className="hx-services">
        <ul className="hx-service-list">
          {list.map((s, i) => (
            <li key={s.number}>
              <Link href="/services" className={`hx-service-row ${i === svc ? 'is-active' : ''}`} onMouseEnter={() => setSvc(i)} onFocus={() => setSvc(i)}>
                <span className="hx-service-num">{s.number}</span>
                <span className="hx-service-text">
                  <span className="hx-service-name">{s.title}</span>
                  <span className="hx-service-note">{SERVICE_NOTES[i]}</span>
                </span>
                <span className="hx-service-go"><ArrowUpRight size={16} /></span>
              </Link>
            </li>
          ))}
        </ul>
        <aside className="hx-stage" aria-live="polite">
          <div className="hx-stage-frame">
            {/* VIDEO SLOT — drop <video> here, keep the 9:16 frame */}
            <span className="hx-stage-num">{current.number}</span>
            <span className="hx-stage-play"><Play size={18} fill="currentColor" /></span>
          </div>
          <p className="hx-stage-caption"><strong>{current.title}</strong>{SERVICE_NOTES[svc]}</p>
        </aside>
      </div>
    </section>

    {/* 04 — MANIFESTO (scroll-driven) */}
    <Manifesto />
    <WorkPath />

    {/* 05 — PROOF: growth chart */}
    <section className="hx-proof">
      <div className="hx-proof-copy">
        <p className="eyebrow">05 / Proof of work</p>
        <h2>Growth you can <em>read</em> in a line.</h2>
        <p>Every engagement starts with a baseline and a target. We report against both, every month, in plain numbers.</p>
        <Link href="/portfolio" className="button button-light">See the results <ArrowUpRight size={15} /></Link>
      </div>
      <GrowthChart />
    </section>

    {/* 06 — SELECTED WORK: vertical video rail */}
    <section className="work-section section">
      <div className="section-marker"><span>06</span><span>Selected work</span></div>
      <div className="section-head editorial-head"><div><p className="eyebrow">A few things we have made</p><h2>Work with a pulse.</h2></div><Link href="/portfolio" className="text-link">View all work <ArrowUpRight size={15} /></Link></div>
      <div className="hx-rail" tabIndex={0} aria-label="Selected work, scroll horizontally">
        {projects.map((p, i) => (
          <Link href={`/portfolio/${p.slug}`} className="hx-card" key={p.slug}>
            <div className="hx-card-video">
              {/* VIDEO SLOT — replace this div's contents with <video> */}
              <span className="hx-card-idx">0{i + 1}</span>
              <span className="hx-card-play"><Play size={16} fill="currentColor" /></span>
            </div>
            <div className="hx-card-meta"><span>{p.category}</span><ArrowUpRight size={14} /></div>
            <h3>{p.title}</h3>
          </Link>
        ))}
        <Link href="/portfolio" className="hx-card hx-card-more"><span>View all work</span><ArrowUpRight size={28} /></Link>
      </div>
    </section>

    {/* 07 — CTA */}
    <section className="home-cta hx-cta">
      <div className="hx-cta-top"><span>07 / The next frame</span><span>Opal Tower, Business Bay, Dubai</span></div>
      <div className="hx-cta-main">
        <h2 className="hx-cta-title">Let&apos;s create <em>what&apos;s next.</em></h2>
        <div className="hx-cta-side">
          <p>Tell us where your brand is and where it should be. We&apos;ll reply with a clear first step.</p>
          <Link href="/contact" className="hx-cta-button"><span>Book a Consultation</span><i><ArrowUpRight size={16} /></i></Link>
        </div>
      </div>
    </section>
  </>
}

export function HomePage() { return <HomeExperience /> }