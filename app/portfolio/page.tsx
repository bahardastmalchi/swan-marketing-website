'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  ArrowRight,
  TrendingUp,
  MousePointerClick,
  Users,
  Eye,
  Sparkles,
} from 'lucide-react'
import { Header, Footer } from '@/components/site'

type Category = {
  id: string
  index: string
  title: string
  tags: string[]
  copy: string
  meta: string
  videoSrc?: string
  posterSrc?: string
}

const categories: Category[] = [
  {
    id: 'real-estate',
    index: '01',
    title: 'Real Estate',
    tags: ['Cinematic', 'Typography', 'Motion Design'],
    copy: 'High-quality property visuals engineered to attract the right audience and generate qualified leads for agencies and agents.',
    meta: 'Lead generation · Scale',
  },
  {
    id: 'restaurants-cafe',
    index: '02',
    title: 'Restaurants & Café',
    tags: ['Cinematic', 'Motiongraphy', 'Advertising'],
    copy: 'Visuals that capture the full experience — atmosphere, craft and appetite — built to attract customers and drive footfall.',
    meta: 'Hospitality · Social presence',
  },
  {
    id: 'hospitality',
    index: '03',
    title: 'Hospitality',
    tags: ['Event Coverage', 'Motiongraphy', 'Typography'],
    copy: 'Visual storytelling of destinations and lifestyle that inspires interest, draws visitors and elevates tourism brands.',
    meta: 'Tourism · Experience',
  },
  {
    id: 'concerts-music',
    index: '04',
    title: 'Concerts & Music',
    tags: ['Teaser', 'Event Coverage', 'Live Show'],
    copy: 'Capturing the energy, crowd and performance of live shows — content designed to highlight the experience at scale.',
    meta: 'Live events · Energy',
  },
  {
    id: 'automotive',
    index: '05',
    title: 'Automotive',
    tags: ['Cinematic', 'Typography', 'Photography'],
    copy: 'Performance-driven visual storytelling that showcases design, luxury and driving experience to build trust and inspire buyers.',
    meta: 'Enthusiasts · Leads',
  },
  {
    id: 'ai-music',
    index: '06',
    title: 'Artists Visual Content',
    tags: ['Teaser', 'AI Storytelling', 'Lyric Video'],
    copy: 'Teasers, storytelling videos and lyric visuals that support releases and attract attention for music projects.',
    meta: 'Music · Promotion',
  },
  {
    id: 'product',
    index: '07',
    title: 'Product',
    tags: ['Live Action', 'Motiongraphy', 'Promotional'],
    copy: 'Detailed product visuals for digital platforms that highlight features, build trust and drive sales.',
    meta: 'Digital · Sales',
  },
  {
    id: 'event',
    index: '08',
    title: 'Event',
    tags: ['Event Coverage', 'Corporate', 'Live'],
    copy: 'From preparation to live coverage, content that captures atmosphere, people and key moments to boost visibility.',
    meta: 'Visibility · Coverage',
  },
  {
    id: 'corporate-industrial',
    index: '09',
    title: 'Corporate & Industrial',
    tags: ['Showcase', 'Explainer', 'Trust'],
    copy: 'Clear, professional content that presents operations properly, communicates clearly, and strengthens credibility.',
    meta: 'B2B · Credibility',
  },
  {
    id: 'fitness',
    index: '10',
    title: 'Fitness',
    tags: ['Event', 'Lifestyle', 'Performance'],
    copy: 'Content for gyms and coaches focused on performance, discipline and results — built to attract clients.',
    meta: 'Performance · Clients',
  },
  {
    id: 'beauty',
    index: '11',
    title: 'Beauty',
    tags: ['Showcase', 'Educational', 'Detail'],
    copy: 'Detail-focused visuals for makeup artists and skincare brands that highlight technique, results and presentation.',
    meta: 'Detail · Clients',
  },
  {
    id: 'finance-trading',
    index: '12',
    title: 'Finance & Trading',
    tags: ['Typography', 'Explain', 'Trust'],
    copy: 'Clear, professional content that communicates services simply and builds trust with the audience.',
    meta: 'Trust · Clarity',
  },
  {
    id: 'ai-content',
    index: '13',
    title: 'AI Content & Visuals',
    tags: ['AI', 'Concepts', 'Scalable'],
    copy: 'AI-generated visuals and concepts enabling faster, scalable production and unique creative outputs.',
    meta: 'Scale · Creative',
  },
  {
    id: 'logo-motion',
    index: '14',
    title: 'Logo & Logo Motion',
    tags: ['Logo', 'Logo Motion', 'Identity'],
    copy: 'Logo design, variations and animated intros that present your brand clearly and consistently across platforms.',
    meta: 'Identity · Motion',
  },
  {
    id: 'poster',
    index: '15',
    title: 'Poster',
    tags: ['Announcement', 'Poster', 'Event'],
    copy: 'Announcement posters and campaign artwork that capture the full event experience and attention at scale.',
    meta: 'Campaign · Attention',
  },
  {
    id: 'instagram-covers',
    index: '16',
    title: 'Instagram Covers',
    tags: ['Reel Covers', 'Layout', 'Consistent'],
    copy: 'Clean, consistent covers for posts and reels that make your feed look professional and attractive.',
    meta: 'Feed · Consistency',
  },
  {
    id: 'story-highlights',
    index: '17',
    title: 'Story Highlights',
    tags: ['Story Icons', 'Brand', 'Organized'],
    copy: 'Story highlight covers and icons that keep your profile clean, organized and aligned with your brand.',
    meta: 'Profile · Branding',
  },
]

const metaStats = [
  { label: 'People Reached', value: '581,000+', icon: Users },
  { label: 'Impressions', value: '1.29M', icon: Eye },
  { label: 'Conversations Started', value: '11,000+', icon: Sparkles },
  { label: 'Link Clicks', value: '16,291', icon: MousePointerClick },
]

const FILTERS = [
  'All',
  'Real Estate',
  'Restaurants & Café',
  'Hospitality',
  'Concerts & Music',
  'Automotive',
  'Artists Visual Content',
  'Product',
  'Event',
  'Corporate & Industrial',
  'Fitness',
  'Beauty',
  'Finance & Trading',
  'AI Content & Visuals',
  'Logo & Logo Motion',
  'Poster',
  'Instagram Covers',
  'Story Highlights',
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')

  const visibleCategories = useMemo(() => {
    if (activeFilter === 'All') return categories
    return categories.filter(
      (category) => category.title === activeFilter,
    )
  }, [activeFilter])

  return (
    <>
      <Header />
      <main className="internal-page portfolio-new-page">
        <section className="pf-hero">
          <div className="pf-hero-inner">
            <div className="pf-hero-text">
              <div className="pf-hero-badge">
                <TrendingUp size={13} aria-hidden="true" />
                <span>Portfolio · @swan.mrkting</span>
              </div>
              <h1>
                Work that <em>moves</em> markets.
              </h1>
              <p className="pf-hero-copy">
                From premium real estate and automotive to hospitality,
                live events and AI-driven visuals — Swan produces cinematic
                content across every niche, engineered for attention, trust
                and measurable growth.
              </p>
              <div className="pf-hero-tags">
                <span>{categories.length} disciplines</span>
                <span className="dot" aria-hidden="true" />
                <span>Cinematic production</span>
                <span className="dot" aria-hidden="true" />
                <span>Data-backed results</span>
              </div>
            </div>

            <div className="pf-hero-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/camera.png"
                alt="Swan Marketing cinematic camera"
                className="pf-hero-image"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section
          className="pf-filter-bar"
          aria-label="Filter portfolio categories"
        >
          <div className="pf-filter-scroll">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`pf-filter-chip ${
                  activeFilter === filter ? 'active' : ''
                }`}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section
          className="pf-grid-section"
          aria-label="Selected creative disciplines"
        >
          <div className="pf-grid">
            {visibleCategories.map((category) => (
              <article
                id={category.id}
                className="pf-card"
                key={category.id}
              >
                <div
                  className={`pf-video-slot ${
                    category.videoSrc || category.posterSrc
                      ? 'pf-has-media'
                      : ''
                  }`}
                  aria-label={`${category.title} media showcase`}
                >
                  {category.videoSrc ? (
                    <video
                      key={category.videoSrc}
                      controls
                      playsInline
                      preload="none"
                      poster={category.posterSrc}
                      aria-label={`${category.title} portfolio video`}
                    >
                      <source src={category.videoSrc} />
                      Your browser does not support embedded video.
                    </video>
                  ) : category.posterSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="pf-poster"
                      src={category.posterSrc}
                      alt={`${category.title} showcase`}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                  {!category.videoSrc && (
                    <>
                      <span className="pf-video-index">
                        {category.index}
                      </span>
                      <span className="pf-video-handle">
                        @swan.mrkting
                      </span>
                      <span className="pf-media-caption">
                        {category.posterSrc
                          ? 'Preview image'
                          : 'Film space reserved'}
                      </span>
                    </>
                  )}
                </div>
                <div className="pf-card-body">
                  <div className="pf-card-tags">
                    {category.tags.map((tag) => (
                      <span className="pf-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3>{category.title}</h3>
                  <p>{category.copy}</p>
                  <div className="pf-card-meta">
                    <span>{category.meta}</span>
                    <Link
                      href={`/contact?discipline=${encodeURIComponent(
                        category.title,
                      )}`}
                      className="pf-card-project-link"
                      aria-label={`Discuss a ${category.title} project`}
                    >
                      <ArrowUpRight
                        size={15}
                        className="pf-card-arrow"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pf-meta-section">
          <div className="pf-meta-global-handle">
            @swan.mrkting
          </div>
          <div className="pf-meta-header">
            <span className="eyebrow">
              Proof of Work · Advertising
            </span>
            <h2>Meta Advertising</h2>
            <p>
              A focused Meta strategy connecting brands with the right
              audience — through precise targeting and high-engagement
              creative execution.
            </p>
          </div>
          <div className="pf-meta-stats">
            {metaStats.map((stat) => {
              const Icon = stat.icon
              return (
                <div className="pf-stat-tile" key={stat.label}>
                  <div className="pf-stat-icon">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              )
            })}
          </div>
          <div className="pf-meta-body">
            <div className="pf-campaign-cost">
              <p className="pf-meta-kicker">
                Reported cost per result
              </p>
              <strong>
                <small>AED</small> 0.51
              </strong>
              <p>
                Campaign performance is evaluated against the objectives
                and measurement setup of each brief.
              </p>
            </div>
            <div className="pf-meta-narrative">
              <p className="pf-meta-kicker">
                Campaign impact
              </p>
              <p>
                The supplied campaign figures include{' '}
                <strong>581,000+ people reached</strong>,{' '}
                <strong>1.29M impressions</strong>,{' '}
                <strong>11,000+ conversations</strong> and{' '}
                <strong>16,291 link clicks</strong>.
                These results demonstrate measurable audience engagement.
              </p>
              <p className="pf-results-note">
                Outcomes vary by audience, budget, creative and campaign
                period. These figures do not establish revenue or ROI.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="button button-dark pf-meta-cta"
          >
            <span>Start a growth campaign</span>
            <ArrowRight size={15} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
