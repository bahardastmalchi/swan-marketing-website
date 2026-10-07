'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  MessageCircle,
  MousePointer2,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Footer, Header } from '@/components/site'

type Work = {
  id: string
  number: string
  title: string
  tags: string[]
  description: string
  outcome: string
  videoSrc?: string
  posterSrc?: string
}

const work: Work[] = [
  {
    id: 'real-estate',
    number: '01',
    title: 'Real Estate',
    tags: ['Cinematic', 'Lead Content'],
    description:
      'Property content that turns square metres into a feeling — built to attract qualified attention.',
    outcome: 'Luxury · Leads',
  },
  {
    id: 'restaurants-cafe',
    number: '02',
    title: 'Restaurants & Café',
    tags: ['Hospitality', 'Social'],
    description:
      'Atmosphere, craft and appetite captured as a complete reason to visit.',
    outcome: 'Footfall · Culture',
  },
  {
    id: 'hospitality',
    number: '03',
    title: 'Hospitality',
    tags: ['Lifestyle', 'Destination'],
    description:
      'Destination storytelling designed to make a stay feel essential before the booking happens.',
    outcome: 'Experience · Demand',
  },
  {
    id: 'concerts-music',
    number: '04',
    title: 'Concerts & Music',
    tags: ['Live Show', 'Teaser'],
    description:
      'Fast, high-energy visual coverage that keeps the crowd experience moving after the lights go down.',
    outcome: 'Energy · Reach',
  },
  {
    id: 'automotive',
    number: '05',
    title: 'Automotive',
    tags: ['Luxury', 'Performance'],
    description:
      'Motion, materials and engineering presented with a sharper emotional edge.',
    outcome: 'Desire · Trust',
  },
  {
    id: 'artists-visuals',
    number: '06',
    title: 'Artists Visual Content',
    tags: ['Music', 'AI Storytelling'],
    description:
      'Release visuals, teasers and world-building content for artists who need more than a post.',
    outcome: 'Attention · Identity',
  },
  {
    id: 'product',
    number: '07',
    title: 'Product',
    tags: ['Commercial', 'Motion'],
    description:
      'Detailed product films that make the feature, texture and reason to buy immediately clear.',
    outcome: 'Clarity · Sales',
  },
  {
    id: 'event',
    number: '08',
    title: 'Event',
    tags: ['Coverage', 'Live'],
    description:
      'The room, the people and the moments that make an event worth talking about afterwards.',
    outcome: 'Visibility · Momentum',
  },
  {
    id: 'corporate',
    number: '09',
    title: 'Corporate & Industrial',
    tags: ['B2B', 'Trust'],
    description:
      'Credible content for complex businesses that need to look as capable as they are.',
    outcome: 'Authority · Clarity',
  },
  {
    id: 'fitness',
    number: '10',
    title: 'Fitness',
    tags: ['Lifestyle', 'Performance'],
    description:
      'Disciplined, kinetic content for brands and coaches built around visible results.',
    outcome: 'Performance · Clients',
  },
  {
    id: 'beauty',
    number: '11',
    title: 'Beauty',
    tags: ['Detail', 'Educational'],
    description:
      'Close-up visual work that gives technique, texture and transformation the attention they deserve.',
    outcome: 'Detail · Desire',
  },
  {
    id: 'finance',
    number: '12',
    title: 'Finance & Trading',
    tags: ['Explainer', 'Trust'],
    description:
      'Confident communication for financial brands that need to feel precise, clear and human.',
    outcome: 'Trust · Understanding',
  },
  {
    id: 'ai-content',
    number: '13',
    title: 'AI Content & Visuals',
    tags: ['AI', 'Concept'],
    description:
      'Original visual systems that let ambitious ideas move faster without looking generic.',
    outcome: 'Speed · Originality',
  },
  {
    id: 'logo-motion',
    number: '14',
    title: 'Logo & Logo Motion',
    tags: ['Identity', 'Motion'],
    description:
      'Marks, motion and opening moments that give a brand its own signature behaviour.',
    outcome: 'Recognition · Recall',
  },
  {
    id: 'poster',
    number: '15',
    title: 'Poster',
    tags: ['Campaign', 'Print'],
    description:
      'Graphic communication made to stop the scroll, own a wall and carry a clear message.',
    outcome: 'Attention · Impact',
  },
  {
    id: 'instagram-covers',
    number: '16',
    title: 'Instagram Covers',
    tags: ['Social System', 'Layout'],
    description:
      'A stronger first impression for every Reel and a feed that looks deliberately composed.',
    outcome: 'Consistency · Clicks',
  },
  {
    id: 'story-highlights',
    number: '17',
    title: 'Story Highlights',
    tags: ['Profile', 'Brand System'],
    description:
      'Small profile details turned into a clean and recognisable brand experience.',
    outcome: 'Order · Identity',
  },
]

const filters = ['All', ...work.map((item) => item.title)]

const stats = [
  {
    value: '581K+',
    label: 'People reached',
    icon: Users,
  },
  {
    value: '1.29M',
    label: 'Impressions',
    icon: Eye,
  },
  {
    value: '11K+',
    label: 'Conversations',
    icon: MessageCircle,
  },
  {
    value: '16,291',
    label: 'Link clicks',
    icon: MousePointer2,
  },
]

export default function PortfolioPage() {
  const [active, setActive] = useState('All')

  const selectedWork = useMemo(
    () =>
      active === 'All'
        ? work
        : work.filter((item) => item.title === active),
    [active],
  )

  return (
    <>
      <Header />

      <main className="internal-page swan-portfolio-page">
        <section className="portfolio-hero-v2">
          <div className="portfolio-hero-topline">
            <span>Selected work / 2026</span>
            <span>Dubai · Worldwide</span>
          </div>

          <div className="portfolio-hero-grid">
            <div className="portfolio-hero-title">
              <p className="portfolio-eyebrow">
                The SWAN creative archive
              </p>

              <h1>
                Work that gives
                <br />
                brands a <em>pulse.</em>
              </h1>
            </div>

            <div className="portfolio-hero-side">
              <div
                className="portfolio-hero-symbol"
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
                <i>SWAN</i>
              </div>

              <p>
                A visual archive of strategy, content and campaigns made
                to earn attention — then turn it into momentum.
              </p>

              <span>
                17 disciplines · One creative standard
              </span>
            </div>
          </div>

          <div className="portfolio-hero-baseline">
            <span>A more beautiful business world.</span>

            <a href="#portfolio-collection">
              Explore the collection
              <ArrowRight size={15} />
            </a>
          </div>
        </section>

        <section
          id="portfolio-collection"
          className="portfolio-filter-wrap"
          aria-label="Filter portfolio work"
        >
          <div className="portfolio-collection-heading">
            <p className="portfolio-eyebrow">
              The collection
            </p>

            <span aria-live="polite" aria-atomic="true">
              {String(selectedWork.length).padStart(2, '0')}
              {' / '}
              {active === 'All'
                ? 'Creative disciplines'
                : active}
            </span>
          </div>

          <div className="portfolio-filter">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={
                  active === filter ? 'is-active' : ''
                }
                aria-pressed={active === filter}
              >
                {filter}

                {filter === 'All' && (
                  <span>
                    {String(work.length).padStart(2, '0')}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        <section
          className={`portfolio-work-grid ${
            selectedWork.length === 1 ? 'is-filtered' : ''
          }`}
          aria-label="Portfolio collection"
        >
          {selectedWork.map((item) => (
            <article
              id={item.id}
              className="portfolio-work-card"
              key={item.id}
            >
              <div
                className={`portfolio-video-frame ${
                  item.videoSrc ? 'has-video' : ''
                }`}
              >
                {item.videoSrc ? (
                  <video
                    key={item.videoSrc}
                    controls
                    playsInline
                    preload="none"
                    poster={item.posterSrc}
                    aria-label={`${item.title} portfolio video`}
                  >
                    <source src={item.videoSrc} />
                    Your browser does not support embedded video.
                  </video>
                ) : (
                  <>
                    {item.posterSrc ? (
                      // Local and remote portfolio images can be added
                      // without requiring Next.js image configuration.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className="portfolio-poster"
                        src={item.posterSrc}
                        alt={`${item.title} creative showcase`}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div
                        className="portfolio-placeholder-art"
                        aria-hidden="true"
                      >
                        <div className="portfolio-art-lines">
                          <i />
                          <i />
                          <i />
                        </div>

                        <span className="portfolio-art-word">
                          SWAN
                        </span>

                        <span className="portfolio-art-caption">
                          A considered point of view.
                        </span>
                      </div>
                    )}

                    <div className="portfolio-frame-top">
                      <span>SW / {item.number}</span>
                      <span>Selected discipline</span>
                    </div>

                    <div className="portfolio-frame-bottom">
                      <span>@swan.mrkting</span>

                      <span className="portfolio-media-status">
                        {item.posterSrc
                          ? 'Preview image'
                          : 'Film space reserved'}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="portfolio-card-copy">
                <div className="portfolio-tag-row">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="portfolio-card-title">
                  <h2>{item.title}</h2>
                  <span>{item.number}</span>
                </div>

                <p>{item.description}</p>

                <div className="portfolio-card-bottom">
                  <span>{item.outcome}</span>

                  <Link
                    href={`/contact?discipline=${encodeURIComponent(
                      item.title,
                    )}`}
                    aria-label={`Discuss a ${item.title} project`}
                    className="portfolio-card-contact"
                  >
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="portfolio-proof">
          <div className="portfolio-proof-topline">
            <p className="portfolio-eyebrow">
              Performance / Meta Advertising
            </p>

            <TrendingUp
              size={18}
              strokeWidth={1.3}
              aria-hidden="true"
            />
          </div>

          <div className="portfolio-proof-head">
            <h2>
              Creative that performs
              <br />
              beyond the <em>feed.</em>
            </h2>

            <p>
              When insight, targeting and a clear visual point of view
              work together, attention becomes a measurable business
              asset.
            </p>
          </div>

          <div className="portfolio-proof-stats">
            {stats.map(({ value, label, icon: Icon }, index) => (
              <div
                className="portfolio-stat"
                key={label}
              >
                <div className="portfolio-stat-top">
                  <Icon
                    size={18}
                    strokeWidth={1.3}
                    aria-hidden="true"
                  />

                  <span>0{index + 1}</span>
                </div>

                <strong>{value}</strong>

                <span className="portfolio-stat-label">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="portfolio-proof-lower">
            <div className="portfolio-performance-story">
              <p className="portfolio-eyebrow">
                From attention to action
              </p>

              <div className="portfolio-performance-path">
                <div>
                  <span>01 / Visibility</span>
                  <strong>Be seen.</strong>
                </div>

                <ArrowRight
                  size={16}
                  aria-hidden="true"
                />

                <div>
                  <span>02 / Engagement</span>
                  <strong>Start a conversation.</strong>
                </div>

                <ArrowRight
                  size={16}
                  aria-hidden="true"
                />

                <div>
                  <span>03 / Action</span>
                  <strong>Make the next move.</strong>
                </div>
              </div>

              <p className="portfolio-performance-caption">
                A strategic framework — not a conversion funnel or a
                comparison of campaign metrics.
              </p>
            </div>

            <div className="portfolio-proof-note">
              <span>Reported cost per result</span>

              <strong>
                <small>AED</small> 0.51
              </strong>

              <p>
                The supplied campaign figures include 16,291 link clicks
                and more than 11,000 conversations.
              </p>
            </div>
          </div>

          <p className="portfolio-proof-disclaimer">
            Figures shown relate to the supplied campaign results.
            Outcomes vary by brief, audience, budget and campaign period.
          </p>
        </section>

        <section className="portfolio-close">
          <div>
            <p className="portfolio-eyebrow">
              Your next chapter
            </p>

            <h2>
              Build something
              <br />
              <em>impossible to ignore.</em>
            </h2>
          </div>

          <div className="portfolio-close-side">
            <p>
              Bring us your ambition.
              <br />
              Let’s give it a distinctive direction.
            </p>

            <Link
              href="/contact"
              className="portfolio-project-button"
            >
              Start a project
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
