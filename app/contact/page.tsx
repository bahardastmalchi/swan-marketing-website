'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Clock,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import { Header, Footer } from '@/components/site'
import { contact, positioning, closingStatement, services } from '@/data/content'

export default function Contact() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const toggleService = (title: string) => {
    setSelectedServices((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Header />

      <main className="internal-page contact-page">
        {/* Intro Header */}
        <section className="contact-hero-section">
          <div className="contact-hero-inner">
            <div className="contact-tag">
              <Sparkles size={13} />
              <span>Dubai Studio · Client Partnerships</span>
            </div>
            <h1>
              Let&apos;s make your brand <em>impossible to ignore.</em>
            </h1>
            <p className="contact-hero-desc">
              Whether you are launching a new enterprise, elevating an existing brand, or looking for end-to-end creative direction in Dubai — tell us about your ambitions.
            </p>
          </div>
        </section>

        {/* Main Grid */}
        <section className="contact-layout-wrap">
          <div className="contact-layout-grid">
            {/* Left Column: Dubai Studio Hub */}
            <aside className="studio-hub-card">
              <div className="studio-hub-header">
                <span className="hub-badge">Direct Line</span>
                <h2>Dubai Studio</h2>
                <p className="hub-sub">
                  Based in Business Bay, working with ambitious brands across the UAE and globally.
                </p>
              </div>

              <div className="contact-items-list">
                <a href={`tel:${contact.phone}`} className="contact-item-row">
                  <div className="item-icon-box">
                    <Phone size={18} />
                  </div>
                  <div className="item-text-box">
                    <span className="item-label">Telephone</span>
                    <strong className="item-val">{contact.phone}</strong>
                  </div>
                  <ArrowUpRight size={15} className="item-arrow" />
                </a>

                <a href={`mailto:${contact.email}`} className="contact-item-row">
                  <div className="item-icon-box">
                    <Mail size={18} />
                  </div>
                  <div className="item-text-box">
                    <span className="item-label">Direct Inquiries</span>
                    <strong className="item-val">{contact.email}</strong>
                  </div>
                  <ArrowUpRight size={15} className="item-arrow" />
                </a>

                <div className="contact-item-row no-hover">
                  <div className="item-icon-box">
                    <MapPin size={18} />
                  </div>
                  <div className="item-text-box">
                    <span className="item-label">Studio Location</span>
                    <strong className="item-val">{contact.address}</strong>
                    <small className="item-note">Dubai, United Arab Emirates</small>
                  </div>
                </div>

                <div className="contact-item-row no-hover">
                  <div className="item-icon-box">
                    <Clock size={18} />
                  </div>
                  <div className="item-text-box">
                    <span className="item-label">Working Hours</span>
                    <strong className="item-val">Mon — Fri · 9:00 AM — 6:00 PM</strong>
                    <small className="item-note">GST (Gulf Standard Time)</small>
                  </div>
                </div>

                <a
                  href={`https://${contact.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-item-row"
                >
                  <div className="item-icon-box">
                    <Globe size={18} />
                  </div>
                  <div className="item-text-box">
                    <span className="item-label">Official Domain</span>
                    <strong className="item-val">{contact.website}</strong>
                  </div>
                  <ArrowUpRight size={15} className="item-arrow" />
                </a>
              </div>

              {/* Manifesto quote box */}
              <div className="studio-quote-box">
                <p className="quote-tagline">{positioning}</p>
                <p className="quote-closing">“{closingStatement}”</p>
              </div>
            </aside>

            {/* Right Column: Briefing & Consultation Form */}
            <div className="brief-form-card">
              {submitted ? (
                <div className="form-success-box">
                  <CheckCircle2 size={48} className="success-icon" />
                  <h3>Consultation Brief Received</h3>
                  <p>
                    Thank you for reaching out. Our strategy team will review your brief and get back to you within 24 business hours.
                  </p>
                  <button
                    type="button"
                    className="button button-dark"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="custom-brief-form">
                  <div className="form-header-block">
                    <span className="eyebrow">Client Intake</span>
                    <h3>Start a Conversation</h3>
                    <p className="form-subtext">
                      Select the capabilities you require and tell us a bit about your timeline and scope.
                    </p>
                  </div>

                  {/* Capability Chips */}
                  <div className="form-group-block">
                    <label className="field-group-title">
                      What are you looking to create? (Select all that apply)
                    </label>
                    <div className="capability-chips-grid">
                      {services.map((s) => {
                        const isSelected = selectedServices.includes(s.title)
                        return (
                          <button
                            type="button"
                            key={s.number}
                            onClick={() => toggleService(s.title)}
                            className={`capability-chip ${isSelected ? 'active' : ''}`}
                          >
                            <span className="chip-num">{s.number}</span>
                            <span className="chip-title">{s.title}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* User Inputs */}
                  <div className="form-inputs-grid">
                    <div className="input-field-group">
                      <label htmlFor="client-name">Your Name *</label>
                      <input
                        id="client-name"
                        name="name"
                        required
                        placeholder="e.g. Alexander Vance"
                      />
                    </div>

                    <div className="input-field-group">
                      <label htmlFor="client-email">Email Address *</label>
                      <input
                        id="client-email"
                        name="email"
                        type="email"
                        required
                        placeholder="alexander@company.com"
                      />
                    </div>

                    <div className="input-field-group">
                      <label htmlFor="client-company">Brand / Company Name</label>
                      <input
                        id="client-company"
                        name="company"
                        placeholder="Company name or Instagram handle"
                      />
                    </div>

                    <div className="input-field-group">
                      <label htmlFor="client-budget">Estimated Budget (AED / USD)</label>
                      <select id="client-budget" name="budget" defaultValue="">
                        <option value="" disabled>Select approximate range</option>
                        <option value="20k-50k">AED 20,000 — 50,000</option>
                        <option value="50k-100k">AED 50,000 — 100,000</option>
                        <option value="100k+">AED 100,000+</option>
                        <option value="custom">Custom Retainer / Strategic Shoot</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-field-group full-width">
                    <label htmlFor="client-message">Project Overview & Goals *</label>
                    <textarea
                      id="client-message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Share your goals, current stage, target audience, or any deadlines we should know..."
                    />
                  </div>

                  <div className="form-submit-row">
                    <button type="submit" className="button button-dark submit-consult-btn">
                      <span>Send Consultation Brief</span>
                      <ArrowUpRight size={16} />
                    </button>
                    <span className="privacy-hint">
                      Strict confidentiality assured. Direct partner response.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
