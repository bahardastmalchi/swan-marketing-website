'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Target,
  Clapperboard,
  CheckCircle2,
  CalendarDays,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { Header, Footer } from '@/components/site'
import { contact, positioning, closingStatement } from '@/data/content'

const pillars = [
  {
    num: '01',
    title: 'Strategy',
    desc: 'We define clear direction, market positioning, and commercial goals before anything starts. No guesswork.',
    icon: Target,
  },
  {
    num: '02',
    title: 'Content',
    desc: 'We produce high-end visuals, scenarios, and editorial aesthetics designed to represent your brand with prestige.',
    icon: Clapperboard,
  },
  {
    num: '03',
    title: 'Advertising',
    desc: 'Targeted paid acquisition campaigns calibrated specifically to generate qualified leads and measurable commercial returns.',
    icon: TrendingUp,
  },
  {
    num: '04',
    title: 'Execution',
    desc: 'From initial calendar planning to final posting, our structured framework handles the heavy lifting completely.',
    icon: Zap,
  },
]

const growthCases = [
  {
    duration: '1 Month',
    start: '86',
    end: '1,167',
    percentage: '+1,257%',
    focus: 'Growth & Direct Sales',
    tag: 'Rapid Foundation',
  },
  {
    duration: '5 Months',
    start: '0',
    end: '9,367',
    percentage: 'From Zero',
    focus: 'Brand Reach & Conversions',
    tag: 'Cold Launch',
  },
  {
    duration: '7 Months',
    start: '794',
    end: '7,424',
    percentage: '+835%',
    focus: 'Content Depth & Consistency',
    tag: 'Sustained Authority',
  },
]

const actionSteps = [
  {
    step: '01',
    title: 'Initial Planning & Architecture',
    timeline: 'Week 1 of Each Month',
    desc: 'One full week dedicated to scenario development, market research, strategic scripting, and calendar scheduling. (Themes and visual identity established in Month 1; no posting during this foundation phase to ensure pristine quality).',
  },
  {
    step: '02',
    title: 'Filming & Studio Production',
    timeline: 'Production Phase',
    desc: 'On-location filming days calibrated to your package tier. All required brand assets, props, and talent are organized upfront for an effortless recording experience.',
  },
  {
    step: '03',
    title: 'Streamlined Approval Protocol',
    timeline: 'Pre-Distribution',
    desc: 'Each visual asset passes through an agile review cycle. Quick, seamless client sign-offs ensure the release schedule remains precise and uninterrupted.',
  },
  {
    step: '04',
    title: 'Hands-Off Full-Service Management',
    timeline: 'Continuous',
    desc: 'Swan Marketing assumes complete ownership of copy, publishing, audience response, and community signals — freeing your internal team entirely.',
  },
  {
    step: '05',
    title: 'Client Collaboration & Data Input',
    timeline: 'Partnership Synergy',
    desc: 'High-impact campaigns thrive on timely business updates and assets from you. We dynamically tune every campaign based on your real-time stock and priorities.',
  },
]

export default function About() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <>
      <Header />

      <main className="internal-page about-page">
        {/* Editorial Hero */}
        <section className="about-hero">
          <div className="about-hero-content">
            <div className="about-badge">
              <Sparkles size={13} />
              <span>Swan Marketing Agency · Dubai</span>
            </div>
            <h1>
              We build brands <em>the right way.</em>
            </h1>
            <p className="about-lead">
              At Swan, we combine clear strategic direction, high-production visual content, and structured execution to help visionary businesses grow, command authority, and dominate their category in Dubai and internationally.
            </p>
            <div className="about-hero-meta">
              <span>Strategy</span>
              <span className="dot" />
              <span>Content</span>
              <span className="dot" />
              <span>Growth</span>
              <span className="dot" />
              <span>Talent</span>
            </div>
          </div>
        </section>

        {/* 4 Pillars Section */}
        <section className="about-section pillars-section">
          <div className="section-head-minimal">
            <span className="eyebrow">01 / Core Methodology</span>
            <h2>Everything we do is planned, purposeful, and aligned with real results.</h2>
          </div>

          <div className="pillars-grid">
            {pillars.map((item) => {
              const Icon = item.icon
              return (
                <div className="pillar-card" key={item.num}>
                  <div className="pillar-top">
                    <span className="pillar-num">{item.num}</span>
                    <div className="pillar-icon">
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Verified Growth Metrics Section */}
        <section className="about-section growth-section">
          <div className="growth-backdrop" />
          <div className="growth-container">
            <div className="growth-header">
              <span className="eyebrow light">02 / Proven Track Record</span>
              <h2>Data-Backed Social Architecture.</h2>
              <p>
                We manage and scale accounts through consistent content, clear positioning, and structured execution. Here is how that discipline converts in practice:
              </p>
            </div>

            <div className="growth-cards-grid">
              {growthCases.map((c, idx) => (
                <div className="growth-card" key={idx}>
                  <div className="growth-tag-row">
                    <span className="growth-badge">{c.tag}</span>
                    <span className="growth-duration">{c.duration}</span>
                  </div>

                  <div className="growth-numbers">
                    <div className="count-unit">
                      <small>Initial</small>
                      <strong>{c.start}</strong>
                    </div>
                    <div className="growth-arrow">→</div>
                    <div className="count-unit highlight">
                      <small>Scaled</small>
                      <strong>{c.end}</strong>
                    </div>
                  </div>

                  <div className="growth-footer">
                    <span className="growth-pct">{c.percentage}</span>
                    <span className="growth-focus">{c.focus}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="growth-footer-note">
              <span>@swan.mrkting</span>
              <p>Consistent content & posting · Growth & active engagement · Systematic page development</p>
            </div>
          </div>
        </section>

        {/* Action Plan / 5-Phase Roadmap */}
        <section className="about-section roadmap-section">
          <div className="section-head-minimal">
            <span className="eyebrow">03 / Operational Rhythm</span>
            <h2>The Swan Action Plan</h2>
            <p className="roadmap-sub">
              Predictability produces excellence. Our 5-phase monthly cycle guarantees zero guesswork and effortless delivery for our clients.
            </p>
          </div>

          <div className="roadmap-layout">
            {/* Timeline Selector */}
            <div className="roadmap-nav">
              {actionSteps.map((step, index) => (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`roadmap-nav-item ${activeStep === index ? 'active' : ''}`}
                >
                  <span className="nav-step-num">{step.step}</span>
                  <div className="nav-step-info">
                    <strong>{step.title}</strong>
                    <small>{step.timeline}</small>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Display Panel */}
            <div className="roadmap-display-panel">
              <div className="display-card">
                <div className="display-meta">
                  <span className="step-tag">Phase {actionSteps[activeStep].step}</span>
                  <span className="timeline-tag">{actionSteps[activeStep].timeline}</span>
                </div>
                <h3>{actionSteps[activeStep].title}</h3>
                <p className="display-desc">{actionSteps[activeStep].desc}</p>
                <div className="display-highlights">
                  <div className="highlight-pill">
                    <ShieldCheck size={16} />
                    <span>Quality-First Execution</span>
                  </div>
                  <div className="highlight-pill">
                    <CalendarDays size={16} />
                    <span>Strict Milestones</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dubai Studio Manifesto */}
        <section className="about-section manifesto-banner">
          <div className="manifesto-grid">
            <div>
              <span className="eyebrow">Our Dubai Presence</span>
              <h2>“{closingStatement}”</h2>
            </div>
            <div className="manifesto-right">
              <p>{positioning}</p>
              <p>
                Operating from Opal Tower in Business Bay, Swan partners with founders, leaders, and enterprise brands seeking strategic distinction and aesthetic leadership.
              </p>
              <div className="manifesto-actions">
                <Link href="/contact" className="button button-dark">
                  <span>Initiate Consultation</span>
                  <ArrowUpRight size={15} />
                </Link>
                <Link href="/portfolio" className="text-link">
                  <span>View Selected Works</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
