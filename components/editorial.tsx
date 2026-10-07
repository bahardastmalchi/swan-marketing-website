'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { closingStatement, contact, navItems, positioning, services } from '@/data/content'

export function ImagePlaceholder({ label='Image placeholder', number, caption, aspect='landscape', className='' }: { label?: string; number?: string; caption?: string; aspect?: 'landscape'|'portrait'|'wide'|'square'; className?: string }) {
  return <div className={`image-placeholder image-placeholder-${aspect} ${className}`} aria-label={`${label}${number ? ` ${number}` : ''}`}><span className="placeholder-rule"/><div><small>{number}</small><strong>{label}</strong></div>{caption && <em>{caption}</em>}<span className="placeholder-rule"/></div>
}

export function EditorialHeader({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: string }) { return <section className="editorial-header"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{intro && <p className="editorial-intro">{intro}</p>}</section> }

export function ServiceDetail({ service }: { service: typeof services[number] }) { return <article className="service-detail"><div className="service-detail-top"><span className="service-detail-number">{service.number}</span><div><p className="eyebrow">Capability / {service.number}</p><h2>{service.title}</h2><p className="service-detail-description">{service.description}</p><ul>{service.capabilities.map(capability => <li key={capability}>{capability}</li>)}</ul><Link href="/contact" className="text-link">Discuss this service <ArrowUpRight size={15}/></Link></div></div><ImagePlaceholder label="Service visual" number={service.number} caption="Replace with Swan imagery" aspect={service.number === '02' || service.number === '07' ? 'portrait' : 'landscape'} /></article> }

export function LargeCTA({ eyebrow='Start a conversation', title=<>Let&apos;s create what&apos;s <em>next.</em></>, dark=false }: { eyebrow?: string; title?: ReactNode; dark?: boolean }) { return <section className={`large-cta ${dark ? 'large-cta-dark' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><Link href="/contact" className={`button ${dark ? 'button-light' : 'button-dark'}`}>Book a Consultation <ArrowUpRight size={15}/></Link></section> }

export function LegalPage({ title, children }: { title: string; children: ReactNode }) { return <><section className="legal-header"><p className="eyebrow">Swan / Dubai / Information</p><h1>{title}</h1></section><article className="legal-copy">{children}</article></> }

export function ContactDetails() { return <div className="contact-details"><p className="eyebrow">Dubai studio</p><a href={`tel:${contact.phone}`}>{contact.phone}</a><a href={`mailto:${contact.email}`}>{contact.email}</a><a href={`https://${contact.website}`}>{contact.website}</a><span>{contact.address}</span><p className="contact-note">{positioning}<br/>{closingStatement}</p></div> }
