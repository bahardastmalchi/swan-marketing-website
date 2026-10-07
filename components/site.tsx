'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import {
  closingStatement,
  contact,
  navItems,
  positioning,
  services,
} from '@/data/content'

function isCurrentPath(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

/* Always start a page at the top (works even with html { scroll-behavior: smooth }) */
function scrollTop(smooth: boolean) {
  const root = document.documentElement
  const prev = root.style.scrollBehavior
  root.style.scrollBehavior = smooth ? 'smooth' : 'auto'
  window.scrollTo(0, 0)
  requestAnimationFrame(() => { root.style.scrollBehavior = prev })
}

export function Logo({ caption = false }: { caption?: boolean }) {
  const pathname = usePathname()
  return (
    <Link
      href="/"
      className={`wordmark${caption ? ' brand-lockup' : ''}`}
      aria-label="Swan Marketing — back to top of home"
      onClick={(e) => { if (pathname === '/') { e.preventDefault(); scrollTop(true) } }}
    >
      <img src="/logo.png" alt="Swan Marketing" />
      {caption && <span className="brand-caption" aria-hidden="true">Swan Marketing</span>}
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [tone, setTone] = useState<'light' | 'dark'>('light')
  const ref = useRef<HTMLElement>(null)
  const pathname = usePathname()

  function closeMenu() {
    setOpen(false)
  }

  /* clicking the link of the page you are already on scrolls to its top */
  function go(e: MouseEvent<HTMLAnchorElement>, href: string) {
    closeMenu()
    if (pathname === href) { e.preventDefault(); scrollTop(true) }
  }

  /* every route change starts at the top */
  const first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    if (window.location.hash) return
    scrollTop(false)
    const t = setTimeout(() => scrollTop(false), 80)
    return () => clearTimeout(t)
  }, [pathname])

  /* Glass adapts: reads the colour of whatever section sits under the header */
  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const h = ref.current
      if (!h) return
      const r = h.getBoundingClientRect()
      const under = document.elementsFromPoint(window.innerWidth / 2, r.top + r.height / 2).find((e) => !h.contains(e))
      let node: Element | null = under ?? null
      while (node) {
        const m = getComputedStyle(node).backgroundColor.match(/[\d.]+/g)
        if (m && (m.length < 4 || parseFloat(m[3]) > 0.5)) {
          const [R, G, B] = m.map(Number)
          setTone((0.2126 * R + 0.7152 * G + 0.0722 * B) / 255 < 0.45 ? 'dark' : 'light')
          return
        }
        node = node.parentElement
      }
      setTone('light')
    }
    const queue = () => { if (!raf) raf = requestAnimationFrame(read) }
    queue()
    const t = setTimeout(queue, 300)
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
    }
  }, [pathname])

  function glow(e: PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <header ref={ref} data-tone={tone} onPointerMove={glow} className={`site-header swan-glass${open ? ' menu-is-open' : ''}`}>
      <div className="header-inner">
        <div className="header-brand">
          <Logo caption />
        </div>



        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = isCurrentPath(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => go(e, item.href)}
                className={active ? 'is-active' : undefined}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Link className="header-cta" href="/contact">
          <span className="cta-dot" aria-hidden="true" />
          <span>Book a Consultation</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>

        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>

      </div>

      {open && (
        <div className="mobile-menu" id="mobile-navigation" role="dialog" aria-label="Mobile navigation">
          <div className="mobile-menu-top">
            <p className="eyebrow">Swan / Navigation</p>
            <span>Dubai, UAE</span>
          </div>

          <nav className="mobile-menu-links" aria-label="Mobile navigation links">
            {navItems.map((item) => {
              const active = isCurrentPath(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => go(e, item.href)}
                  className={active ? 'is-active' : undefined}
                  aria-current={active ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              )
            })}
          </nav>

          <Link className="button button-light mobile-menu-cta" href="/contact" onClick={closeMenu}>
            <span>Book a Consultation</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      )}
    </header>
  )
}

export function Footer() {
  const pathname = usePathname()

  return (
    <footer className="footer">
      <div className="footer-line" />

      {pathname === '/contact' && (
        <div className="footer-lead footer-lead-contact">
          <p className="eyebrow">Ready to build something extraordinary?</p>
          <h2>Let&apos;s create what&apos;s next.</h2>
          <Link className="button button-dark" href="/contact">
            Book a Consultation
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      )}

      <div className="footer-grid">
        <div>
          <Logo />
          <p className="footer-note">
            {positioning}
            <br />
            {closingStatement}
          </p>
        </div>

        <div>
          <p className="footer-label">Explore</p>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <p className="footer-label">Capabilities</p>
          {services.slice(0, 5).map((service) => (
            <Link key={service.number} href="/services">
              {service.title}
            </Link>
          ))}
        </div>

        <div>
          <p className="footer-label">Dubai studio</p>
          <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`https://${contact.website}`}>{contact.website}</a>
          <span>{contact.address}</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 SWAN. All rights reserved.</span>
        <span>Dubai, UAE</span>
        <span>
          <Link href="/privacy">Privacy</Link>
          {' · '}
          <Link href="/terms">Terms</Link>
        </span>
      </div>
    </footer>
  )
}

export function PageIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: ReactNode
  copy?: string
}) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {copy && <p className="intro-copy">{copy}</p>}
    </section>
  )
}

export { isCurrentPath }