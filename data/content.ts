export const services = [
  { number: '01', slug: 'strategy-marketing-consulting', title: 'Strategy & Marketing Consulting', description: 'Clear thinking, commercial direction and marketing systems built around where your brand wants to go.', capabilities: ['Brand and marketing direction', 'Commercial clarity', 'Growth planning'] },
  { number: '02', slug: 'brand-identity-visual-systems', title: 'Brand Identity & Visual Systems', description: 'Distinctive identities and visual languages that make ambitious brands impossible to overlook.', capabilities: ['Identity systems', 'Visual language', 'Brand guidelines'] },
  { number: '03', slug: 'content-production', title: 'Content Production', description: 'Photography, film and editorial content created to give your story a point of view.', capabilities: ['Photography', 'Film', 'Editorial content'] },
  { number: '04', slug: 'social-media-management', title: 'Social Media Management', description: 'Thoughtful, consistent social presence that turns attention into an active community.', capabilities: ['Social strategy', 'Content planning', 'Community presence'] },
  { number: '05', slug: 'lead-generation-paid-advertising', title: 'Lead Generation & Paid Advertising', description: 'Performance campaigns designed to create qualified demand and measurable momentum.', capabilities: ['Lead generation', 'Paid advertising', 'Campaign direction'] },
  { number: '06', slug: 'website-design-development', title: 'Website Design & Development', description: 'Digital experiences that feel as considered as the brands they represent.', capabilities: ['Digital direction', 'Website design', 'Website development'] },
  { number: '07', slug: 'modeling-management', title: 'Modeling Management', description: 'Talent direction and management for brands that want to move with confidence.', capabilities: ['Talent direction', 'Modeling management', 'Opportunity development'] },
  { number: '08', slug: 'creative-direction-brand-shoots', title: 'Creative Direction for Brand Shoots', description: 'Full creative direction from first frame to final image, with intention in every detail.', capabilities: ['Creative direction', 'Shoot concepts', 'Visual production'] },
] as const

export const projects = [
  { slug: 'swan-brand-world', title: 'A more beautiful business world', category: 'Brand world / Creative direction', description: 'A Swan brand world exploring the relationship between strategy, image, talent and a more beautiful business world.', services: ['Brand Identity & Visual Systems', 'Creative Direction for Brand Shoots'], gallery: 3 },
  { slug: 'the-editorial-campaign', title: 'The editorial campaign', category: 'Content / Production', description: 'An editorial campaign built around a clear point of view, considered content and the details that make a story stay.', services: ['Content Production', 'Creative Direction for Brand Shoots'], gallery: 3 },
  { slug: 'future-facing-foundations', title: 'Future-facing foundations', category: 'Strategy / Digital experience', description: 'A considered foundation for brands ready to move with clarity across marketing, digital and growth.', services: ['Strategy & Marketing Consulting', 'Website Design & Development'], gallery: 3 },
] as const

export const posts = [
  { slug: 'the-value-of-a-distinct-point-of-view', category: 'Perspective', date: '05.10.26', read: '4 min read', title: 'The value of a distinct point of view', excerpt: 'Why the brands that stay with us are the ones that know exactly what they stand for.', content: ['The strongest brands are not trying to be everything to everyone. They make a choice, then make that choice visible.', 'A point of view gives strategy somewhere to go. It shapes the way a brand speaks, moves and makes decisions — from the first idea to the smallest detail.', 'For ambitious brands, clarity is not a constraint. It is the thing that creates momentum.'] },
  { slug: 'building-a-brand-with-staying-power', category: 'Brand', date: '28.09.26', read: '6 min read', title: 'Building a brand with staying power', excerpt: 'A considered approach to creating relevance today and resonance tomorrow.', content: ['A lasting brand is built in the space between a clear idea and the discipline to repeat it well.', 'That means creating a system with enough character to be remembered and enough flexibility to keep moving.', 'The work is not about chasing every new signal. It is about knowing which signals belong to you.'] },
  { slug: 'notes-from-business-bay', category: 'Studio notes', date: '14.09.26', read: '3 min read', title: 'Notes from Business Bay', excerpt: 'A view from our Dubai studio on the pace, ambition and possibility around us.', content: ['Dubai is a place of movement. Ideas arrive from everywhere, and ambition is visible in the pace of the city.', 'For a creative studio, that energy is useful when it is met with focus: a clear thought, a strong image and a reason for every decision.', 'This is the rhythm we bring to the work.'] },
] as const

export const navItems = [
  { label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Services', href: '/services' }, { label: 'Portfolio', href: '/portfolio' }, { label: 'Blog', href: '/blog' }, { label: 'Contact', href: '/contact' },
]
export const contact = { phone: '+971 56 911 4768', email: 'swanmrkting@gmail.com', website: 'www.swanmarketing.ae', address: 'Opal Tower, Business Bay, Dubai' }
export const positioning = 'Strategy, content, growth, talent.'
export const closingStatement = 'A more beautiful business world.'
export type SwanService = typeof services[number]
export type SwanProject = typeof projects[number]
export type SwanPost = typeof posts[number]
